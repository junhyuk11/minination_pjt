package com.ssafy.mini.domain.job.service;

import com.ssafy.mini.domain.apply.entity.Apply;
import com.ssafy.mini.domain.apply.repository.ApplyRepository;
import com.ssafy.mini.domain.job.dto.request.*;
import com.ssafy.mini.domain.job.dto.response.JobDetailResponseDTO;
import com.ssafy.mini.domain.job.dto.response.JobListResponseDTO;
import com.ssafy.mini.domain.job.entity.Job;
import com.ssafy.mini.domain.job.repository.JobRepository;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.member.service.MemberService;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{
    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private final ApplyRepository applyRepository;
    private final JobRepository jobRepository;

    @Override
    public void register(String memberId, JobRegisterRequest jobRegisterRequest) {
        // 선생님만 등록 가능
        if (!memberService.getMemberType(memberId).equals("TC"))
            throw new MNException(ErrorCode.NO_AUTHORITY);

        // 급여가 0원 이하일 수 없음
        if(jobRegisterRequest.getPay() <= 0)
            throw new MNException(ErrorCode.INVALID_JOB_PAY);

        if(jobRegisterRequest.getRecruitTotalCount() <= 0)
            throw new MNException(ErrorCode.INVALID_JOB_TOTAL);

        // 직업 이름 중복 확인
        jobRepository.findByJobName(jobRegisterRequest.getName())
                .ifPresent(job -> {
                    throw new MNException(ErrorCode.DUPLICATED_JOB_NAME);
                });

        Job job = Job.builder()
                .jobName(jobRegisterRequest.getName())
                .jobDesc(jobRegisterRequest.getDesc())
                .jobPay(jobRegisterRequest.getPay())
                .jobReq(jobRegisterRequest.getRequirement())
                .jobTotalCnt(jobRegisterRequest.getRecruitTotalCount())
                .jobLeftCnt(jobRegisterRequest.getRecruitTotalCount())
                .nation(memberService.getNationByMemberId(memberId))
                .build();

        jobRepository.save(job);

    }

    @Override
    public void apply(String memberId, JobApplyRequest jobApplyRequest) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        String jobName = jobApplyRequest.getJobName();

        // 회원이 가입한 국가가 없을 경우
        if(memberService.getNationByMemberId(memberId) == null)
            throw new MNException(ErrorCode.NO_NATION);

        // 직업 이름이 존재하지 않을 경우
        Job job = jobRepository.findByJobName(jobName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_JOB));

        // 직업에 지원한 인원이 모두 모였을 경우
        if(job.getJobLeftCnt() == 0)
            throw new MNException(ErrorCode.NO_LEFT_JOB);

        // 해당 직업에서 이미 근무하고 있는 경우
        if(member.getJobSeq() != null)
            if(member.getJobSeq().getJobSeq().equals(job.getJobSeq()))
                throw new MNException(ErrorCode.ALREADY_JOINED_JOB);

        // 해당 직업에 이미 지원한 경우
        if(applyRepository.findByJobAndMember(job, member).isPresent())
            throw new MNException(ErrorCode.ALREADY_APPLIED_JOB);

        // apply table에 저장
        applyRepository.save(Apply.builder()
                .job(job)
                .member(member)
                .build());

    }

    @Override
    public void approve(String memberId, JobApproveRequest jobApproveRequest) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        Job job = jobRepository.findByJobName(jobApproveRequest.getJobName())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_JOB));

        // 해당 지원에 해당하는 국가의 선생님만 승인 가능
        if(!member.getMemType().getExpression().equals("TC") || !member.getIsoSeq().equals(job.getNation())) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
        }

        // 직업에 지원한 인원이 모두 모였을 경우
        if(job.getJobLeftCnt() == 0)
            throw new MNException(ErrorCode.NO_LEFT_JOB);

        Member applicant = memberRepository.findByMemName(jobApproveRequest.getApplicantName())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));


        Apply apply = applyRepository.findByJobAndMember(job, applicant)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_APPLY));

        // 해당 지원자가 이미 직업을 가지고 있었을 경우 이전 직업에서 해고
        if (applicant.getJobSeq() != null) {
            fire(memberId, JobFireRequest.builder()
                    .employeeName(applicant.getMemName())
                    .jobName(applicant.getJobSeq().getJobName())
                    .build());
        }

        // member에 직업 정보 저장
        applicant.setJobSeq(job);

        // 해당 직업의 잔여 인원 수 감소
        job.setJobLeftCnt((byte) (job.getJobLeftCnt() - 1));

        memberRepository.save(applicant);
        jobRepository.save(job);
        // apply table에서 해당 지원자의 모든 지원 삭제
        applyRepository.deleteAllByMember(applicant);

    }

    @Override
    public List<JobListResponseDTO> getJobList(String memberId){

        List<JobListResponseDTO> jobListResponseDTOList = new ArrayList<>();

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        List<Job> jobList = jobRepository.findAllByNation(member.getIsoSeq());
        for(Job j : jobList){

            List<Apply> applyList = applyRepository.findAllByJob(j);
            List<String> employeeList = memberRepository.findMemNameByJobSeq(j);

            int status = 0;
            if(applyRepository.findByJobAndMember(j, member).isPresent())
                status = 1;
            else if(member.getJobSeq() != null)
                if(member.getJobSeq().equals(j))
                    status = 2;

            jobListResponseDTOList.add(JobListResponseDTO.builder()
                    .name(j.getJobName())
                    .desc(j.getJobDesc())
                    .pay(j.getJobPay())
                    .recruitTotalCount(j.getJobTotalCnt())
                    .applyCount(applyList.size())
                    .requirement(j.getJobReq())
                    .employees(employeeList)
                    .status(status)
                    .build());
        }

        return jobListResponseDTOList;
    }

    @Override
    public void decline(String memberId, JobDeclineRequest jobDeclineRequest) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        Job job = jobRepository.findByJobName(jobDeclineRequest.getJobName())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_JOB));

        // 해당 지원에 해당하는 국가의 선생님만 거절 가능
        if(!member.getMemType().getExpression().equals("TC") || !member.getIsoSeq().equals(job.getNation())) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
        }

        Member applicant = memberRepository.findByMemName(jobDeclineRequest.getApplicantName())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        Apply apply = applyRepository.findByJobAndMember(job, applicant)
                .orElseThrow(()  -> new MNException(ErrorCode.NO_SUCH_APPLY));

        // apply table에서 해당 지원 삭제
        applyRepository.delete(apply);
    }

    @Override
    public void fire(String memberId, JobFireRequest jobFireRequest) {
        Member teacher = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        Member employee = memberRepository.findByMemName(jobFireRequest.getEmployeeName())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        if(!teacher.getMemType().getExpression().equals("TC"))
            throw new MNException(ErrorCode.NO_AUTHORITY);

        if(teacher.getIsoSeq() != employee.getIsoSeq())
            throw new MNException(ErrorCode.NATION_NOT_MATCH);

        Job job = jobRepository.findByJobName(jobFireRequest.getJobName())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_JOB));

        // 해당 직업에서 근무하고 있지 않은 경우
        if(employee.getJobSeq() == null)
            throw new MNException(ErrorCode.NOT_PROPER_EMPLOYEE);
        else if(!employee.getJobSeq().equals(job))
            throw new MNException(ErrorCode.NOT_PROPER_EMPLOYEE);

        // 해당 직업의 잔여 인원 수 증가
        job.setJobLeftCnt((byte) (job.getJobLeftCnt() + 1));
        jobRepository.save(job);

        // member에 직업 정보 삭제
        employee.setJobSeq(null);
        memberRepository.save(employee);

    }

    @Override
    public JobDetailResponseDTO getJobDetail(String memberId, String jobName) {
        // 선생님만 조회 가능
        if(!memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER))
                .getMemType().getExpression().equals("TC"))
            throw new MNException(ErrorCode.NO_AUTHORITY);

        Job job = jobRepository.findByJobName(jobName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_JOB));

        List<String> applicants = applyRepository.findMemNameByJob(job);
        List<String> employees = memberRepository.findMemNameByJobSeq(job);

        return JobDetailResponseDTO.builder()
                .applicatCount(applicants.size())
                .recruitTotalCount(job.getJobTotalCnt())
                .employeeCount(employees.size())
                .recruitLeftCount(job.getJobLeftCnt())
                .applicants(applicants)
                .employees(employees)
                .build();
    }

    @Override
    public void delete(String memberId, JobDeleteRequest jobDeleteRequest) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        String jobName = jobDeleteRequest.getJobName();
        Job job = jobRepository.findByJobName(jobName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_JOB));

        // 선생님만 자기 국가의 직업 삭제 가능
        if(!member.getMemType().getExpression().equals("TC") || !member.getIsoSeq().equals(job.getNation())) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
        }

        // 해당 직업 지원자 모두 거절
        List<Apply> applicantList = applyRepository.findAllByJob(job);
        for(Apply a : applicantList){
            JobDeclineRequest jobDeclineRequest = JobDeclineRequest.builder()
                    .applicantName(a.getMember().getMemName())
                    .jobName(jobName)
                    .build();
            decline(memberId, jobDeclineRequest);
        }

        // 해당 직업 근무자 모두 해고
        List<Member> employeeList = memberRepository.findAllByJobSeq(job);
        for(Member m : employeeList){
            JobFireRequest jobFireRequest = JobFireRequest.builder()
                    .employeeName(m.getMemName())
                    .jobName(jobName)
                    .build();
            fire(memberId, jobFireRequest);
        }

        // 해당 직업 삭제
        jobRepository.delete(job);
    }

}
