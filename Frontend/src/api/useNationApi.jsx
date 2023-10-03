import useAxiosInstance from './useAxiosInstance.jsx';

const nationPostPresident = async (nation, president) => {
    const form = { nation, president };
    console.log(form);
    const jwt = sessionStorage.getItem('accessToken');
    const response = await useAxiosInstance
        .authApiClient(jwt)
        .post(`/nation/president`, form);
    return response.data;
};

const nationGetFlaglist = async () => {
    const jwt = sessionStorage.getItem('accessToken');
    const response = await useAxiosInstance
        .authApiClient(jwt)
        .get(`/nation/flags`);
    return response.data;
};

const nationDeleteNation = async () => {
    const jwt = sessionStorage.getItem('accessToken');
    const response = await useAxiosInstance
        .authApiClient(jwt)
        .delete(`/nation`);
    return response.data;
};

const nationPostCreate = async (
    nationName,
    currency,
    payday,
    incomeTax,
    vat,
    flagImgUrl,
) => {
    const form = {
        nationName,
        currency,
        payday,
        incomeTax,
        vat,
        flagImgUrl,
    };
    console.log(form, form.flagImgUrl);
    const jwt = sessionStorage.getItem('accessToken');
    const response = await useAxiosInstance
        .authApiClient(jwt)
        .post(`/nation/create`, form);
    return response.data;
};

const nationPostSearch = async nationName => {
    const form = { nationName };
    const jwt = sessionStorage.getItem('accessToken');
    const response = await useAxiosInstance
        .authApiClient(jwt)
        .post(`/nation/search`, form);
    return response.data;
};

const nationPostJoin = async nationName => {
    console.log(nationName);
    const jwt = sessionStorage.getItem('accessToken');
    const response = await useAxiosInstance
        .authApiClient(jwt)
        .post(`/nation/join`, nationName);
    return response.data;
};

export default {
    nationPostPresident,
    nationGetFlaglist,
    nationDeleteNation,
    nationPostCreate,
    nationPostSearch,
    nationPostJoin,
};
