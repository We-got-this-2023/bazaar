import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotAllowed = () => {
  return (
    <div>
      <p>
        <strong>We're sorry, you don't have access to this page.</strong>
      </p>
    </div>
  );
};

export default function PrivateRoute({ element }: { element: JSX.Element }) {
  const { userLoggedIn, user } = useAuth();
  if (userLoggedIn) {
    if (user.id === element.props.id) return element;
    return <NotAllowed />;
  }
  return <Navigate to="/login" />;
}
