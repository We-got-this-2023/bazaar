import { useAuth } from "../contexts/AuthContext";

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
  const { userLoggedIn, user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (userLoggedIn)
    if (user.id === element.props.validId) return element;
    else return <NotAllowed />;
}
