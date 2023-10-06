import useAxiosInstance from './useAxiosInstance.jsx';

const stockGetStock = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .get(`/stock`);
        return response.data;
    } catch (e) {
        if (e.response.data.status === 404) {
            console.log('404');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
    }
    return null;
};

const stockPostSell = async data => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/stock/sell`, data);
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
        if (e.response.status === 406) {
            console.log('406러');
            return e.response.data;
        }
    }
    return null;
};

const stockPostBuy = async data => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/stock/buy`, data);
        return response.data;
    } catch (e) {
        if (e.response.status === 406) {
            console.log('406에러');
            return e.response.data;
        }
        if (e.response.data.status === 403) {
            console.log('403에러');
            return e.response.data;
        }
        if (e.response.data.status === 406) {
            console.log('406러');
            return e.response.data;
        }
    }
    return null;
};

const stockGetList = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .get(`/stock/list`);
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
    stockGetStock,
    stockPostSell,
    stockPostBuy,
    stockGetList,
};
