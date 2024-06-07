import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext.jsx';


const ProtectedRoute = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        <Navigate
            to="/login"
            state={{ pathname: location.pathname }}
            replace
        />
    }
    return children;
};
export default ProtectedRoute;
