import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userData } from "../api/authAPI";
import AccountCard from "../components/AccountCard";
import DeliveryForm from "../components/DeliveryForm";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const { userLoggedIn, user, isAuth, setUser } = useAuth();

  const userInfo = async () => {
    const userEmail = localStorage.getItem("email");
    const { data } = await userData(userEmail);
    setUser(data);
  };
  useEffect(() => {
    if (isAuth()) {
      userInfo();
    }
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="relative top-24 flex h-full flex-col items-center gap-4">
      {isAuth() && (
        <>
          <AccountCard user={user} />
          <DeliveryForm user={user} />
        </>
      )}
    </div>
  );
}
