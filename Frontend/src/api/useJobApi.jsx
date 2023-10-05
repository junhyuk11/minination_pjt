import Swal from 'sweetalert2';
import useAxiosInstance from './useAxiosInstance.jsx';

const jobPostDecline = async (jobName, applicantName) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/decline`, { jobName, applicantName });
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러-유효하지 않은 토큰');
            return e.response.data;
        }
    }
    return null;
};

const jobPostFire = async (jobName, employeeName) => {
    try {
        const form = { jobName, employeeName };
        console.log(form);
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/fire`, form);
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러-유효하지 않은 토큰');
            return e.response.data;
        }
    }
    return null;
};

const jobPostApprove = async (jobName, applicantName) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/approve`, { jobName, applicantName });
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러-유효하지 않은 토큰');
            return e.response.data;
        }
    }
    return null;
};

const jobPostApply = async jobName => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/apply`, { jobName });
        return response.data;
    } catch (e) {
        if (e.response.data.code === 403) {
            Swal.fire({
                icon: 'warning',
                title: '유효하지 않은 토큰입니다.',
                confirmButtonText: '확인',
            });
        } else if (e.response.data.code === 404) {
            Swal.fire({
                icon: 'warning',
                title: '지원 실패.',
                confirmButtonText: '확인',
            });
        } else if (e.response.data.code === 406) {
            Swal.fire({
                icon: 'warning',
                title: '남은 자리가 없어요.',
                confirmButtonText: '확인',
            });
        } else if (e.response.data.code === 400) {
            Swal.fire({
                icon: 'warning',
                title: '잔여 자리가 없어요.',
                confirmButtonText: '확인',
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: '이미 신청 중이거나 근무 중입니다.',
                confirmButtonText: '확인',
            });
        }
    }
    return null;
};

const jobGetDetail = async jobName => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/detail`, jobName);
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러-유효하지 않은 토큰');
            return e.response.data;
        }
    }
    return null;
};

const jobGetList = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .get(`/job/list`);
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러-유효하지 않은 토큰');
            return e.response.data;
        }
    }
    return null;
};

const jobPostRegister = async (
    name,
    desc,
    pay,
    recruitTotalCount,
    requirement,
) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/register`, {
                name,
                desc,
                pay,
                recruitTotalCount,
                requirement,
            });
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const jobDelete = async jobName => {
    try {
        const requestBody = JSON.stringify({ jobName }); // 객체를 JSON 문자열로 변환
        const jwt = sessionStorage.getItem('accessToken');
        console.log(requestBody);

        const response = await useAxiosInstance
            .authApiClient(jwt)
            .delete(`/job`, {
                data: requestBody, // 요청 본문에 JSON 데이터 추가
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 요청을 보내도록 설정
                },
            });

        return response.data;
    } catch (error) {
        console.log('직업 삭제 실패');
        return error.response.data;
    }
};

export default {
    jobPostDecline,
    jobPostFire,
    jobPostApprove,
    jobPostApply,
    jobGetDetail,
    jobGetList,
    jobPostRegister,
    jobDelete,
};
