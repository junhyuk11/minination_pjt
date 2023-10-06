import useAxiosInstance from './useAxiosInstance.jsx';

const nationPostPresident = async (nation, president) => {
    try {
        const form = { nation, president };
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/nation/president`, form);
        return response.data;
    } catch (error) {
        console.log('대통령 이름 확인 실패');
        return error.response.data;
    }
};

const nationGetFlaglist = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .get(`/nation/flags`);
        return response.data;
    } catch (error) {
        console.log('국기 불러오기 실패');
        return error.response.data;
    }
};
// 국가 삭제 미구현
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
    try {
        const form = {
            nationName,
            currency,
            payday,
            incomeTax,
            vat,
            flagImgUrl,
        };
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/nation/create`, form);
        return response.data;
    } catch (error) {
        console.log('국가 생성 실패');
        return error.response.data;
    }
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
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .post(`/nation/join`, { nationName });
        return response.data;
    } catch (error) {
        console.log('국가가입 api요청 실패', error);
        return error.response.data;
    }
};

export default {
    nationPostPresident,
    nationGetFlaglist,
    nationDeleteNation,
    nationPostCreate,
    nationPostSearch,
    nationPostJoin,
};
