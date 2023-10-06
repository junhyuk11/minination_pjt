import useAxiosInstance from './useAxiosInstance.jsx';
import { useNavigation } from '../hooks/useNavigation.jsx';

const lawPutLaw = async (name, currency, payday, incomeTax, vat) => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const form = { name, currency, payday, incomeTax, vat };
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .put(`/law`, form);
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
        if (e.response.data.status === 402) {
            console.log('402에러');
            alert('선생님만 수정 가능합니다');
            useNavigation.navigateToDashboard();
            return e.response.data;
        }
    }
    return null;
};

const lawGetInfo = async () => {
    try {
        const jwt = sessionStorage.getItem('accessToken');
        const response = await useAxiosInstance
            .authApiClient(jwt)
            .get(`/law/info`);
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
    lawPutLaw,
    lawGetInfo,
};
