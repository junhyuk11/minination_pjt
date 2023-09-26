import useAxiosInstance from './useAxiosInstance.jsx';

const shopPostUse = async product => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/shop/use`, { product });
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

const shopPostBuy = async (product, amount) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/shop/buy`, { product, amount });
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

const shopDeleteShop = async product => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .delete(`/shop`, { product });
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

const shopPutShop = async (product, desc, price) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .put(`/shop`, { product, desc, price });
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

const shopGetList = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance.authApiClient(jwt).get(`/shop`);
        console.log("여기까지 들어옴");
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
    shopPostUse,
    shopPostBuy,
    shopDeleteShop,
    shopPutShop,
    shopGetList,
};
