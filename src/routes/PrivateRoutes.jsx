import { Navigate } from "react-router-dom";

const PrivateRoutes = ( { isAuth, children } ) => {
    return isAuth ? children : <Navigate to="/" />;
}
export default PrivateRoutes