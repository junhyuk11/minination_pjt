import useAxiosInstance from './useAxiosInstance.jsx';

const memberPostLogout = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/member/logout`);
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

const memberPostId = async id => {
    try {
        const response = await useAxiosInstance
            .apiClient()
            .post(`/member/id`, { id });
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

const memberDeleteMember = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .delete(`/member`);
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

const memberPutPassword = async password => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .put(`/member/id`, { password });
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

const memberPostLogin = async (id, password) => {
    try {
        console.log('여기');
        const response = await useAxiosInstance
            .apiClient()
            .post(`/member/login`, { id, password });
        return response.data;
    } catch (e) {
        console.log(e);
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
    memberPostLogout,
    memberPostId,
    memberDeleteMember,
    memberPutPassword,
    memberPostLogin,
    memberPostJoin,
};
