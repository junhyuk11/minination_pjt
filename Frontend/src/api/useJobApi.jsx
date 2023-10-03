import useAxiosInstance from './useAxiosInstance.jsx';
import Swal from 'sweetalert2';

const jobPostDecline = async (job_name, applicant_id) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/decline`, { job_name, applicant_id });
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

const jobPostFire = async (job_name, applicant_id) => {
    try {
        const form = { job_name, applicant_id };
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
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const jobPostApprove = async (job_name, applicant_id) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/approve`, { job_name, applicant_id });
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

const jobPostApply = async job_name => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/apply`, { job_name });
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
        } else if (e.response.data.code === 400) {
            Swal.fire({
                icon: 'warning',
                title: '잔여 자리가 없습니다.',
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

const jobGetDetail = async job_name => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/job/detail`, job_name);
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
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const jobPostRegister = async (
    name,
    desc,
    pay,
    recruit_total_count,
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
                recruit_total_count,
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

export default {
    jobPostDecline,
    jobPostFire,
    jobPostApprove,
    jobPostApply,
    jobGetDetail,
    jobGetList,
    jobPostRegister,
};
