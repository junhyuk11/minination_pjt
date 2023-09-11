import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    // Admin
    const navigateToFoundation = () => {
        navigate('/admin/foundation');
    };

    const navigateToOffice = () => {
        navigate('/admin/office');
    };

    const navigateToOfficeFix = () => {
        navigate('/admin/officefix');
    };

    // Home
    const navigateToLanding = () => {
        navigate('/');
    };

    // StockExchange
    const navigateToStock = () => {
        navigate('/stockexchange/stock');
    };

    return {
        navigateToFoundation,
        navigateToOffice,
        navigateToOfficeFix,
        navigateToLanding,
        navigateToStock,
    };
};

export default useNavigation;
