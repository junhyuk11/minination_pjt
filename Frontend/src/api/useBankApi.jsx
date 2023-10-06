import useAxiosInstance from './useAxiosInstance.jsx';

const bankGetInfo = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .get(`/bank/info`);
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

const bankPostTerminate = async data => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/bank/terminate`, data);
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

const bankPostSubscribe = async data => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/bank/subscribe`, data);
        return response.data;
    } catch (e) {
        if (e.response.status === 409) {
            console.log('409에러');
            return e.response.data;
        }
        if (e.response.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const bankGetBank = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance.authApiClient(jwt).get(`/bank`);
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
    bankGetInfo,
    bankPostTerminate,
    bankPostSubscribe,
    bankGetBank,
};
