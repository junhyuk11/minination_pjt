import Swal from 'sweetalert2';
import useAxiosInstance from './useAxiosInstance.jsx';

const memberPostLogout = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/member/logout`);
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const memberPostId = async id => {
    try {
        const response = await useAxiosInstance
            .apiClient()
            .post(`/member/id`, { id });
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            console.log('404에러');
            return e.response;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response;
        }
        if (e.response.status === 409) {
            console.log('409에러');
            return e.response;
        }
    }
    return null;
};

const memberDeleteMember = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .delete(`/member`);
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const memberPutPassword = async password => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .put(`/member/id`, { password });
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const memberPostLogin = async (id, password) => {
    try {
        const response = await useAxiosInstance
            .apiClient()
            .post(`/member/login`, { id, password });
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            Swal.fire({
                html: '아이디 또는 비밀번호를 잘못 입력했습니다. <br/>입력하신 내용을 다시 확인해주세요.',
                confirmButtonText: '확인',
            });
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
        if (e.response.status === 400) {
            Swal.fire({
                html: '비밀번호를 다시 확인해주세요.',
                confirmButtonText: '확인',
            });
            return e.response.data;
        }
    }
    return null;
};

const memberPostJoin = async (id, password, name, type) => {
    try {
        const response = await useAxiosInstance
            .apiClient()
            .post(`/member/join`, { id, password, name, type });
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
        if (e.response.status === 409) {
            console.log('409에러');
            return e.response.data;
        }
    }
    return null;
};

const memberPostCheck = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/member/check`);
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            console.log('404에러');
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
        if (e.response.status === 409) {
            console.log('409에러');
            return e.response.data;
        }
    }
    return null;
};

export default {
    memberPostLogout,
    memberPostId,
    memberDeleteMember,
    memberPutPassword,
    memberPostLogin,
    memberPostJoin,
    memberPostCheck,
};
