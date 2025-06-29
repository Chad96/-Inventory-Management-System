// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

function PrivateRoute({ children }) {
  const location = useLocation();
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;