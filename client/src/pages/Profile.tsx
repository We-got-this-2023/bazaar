import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountCard from "../cards/Account";
import DeliveryForm from "../cards/Shipping";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const { userLoggedIn, user } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      if (!id || user.id === id) setIsOwner(true);
      else setIsOwner(false);
    }
  }, [userLoggedIn, id]);

  return (
    <div className="relative top-24 flex h-full flex-col items-center gap-4">
      {isOwner && (
        <>
          <AccountCard user={user} />
          <DeliveryForm user={user} />
        </>
      )}
    </div>
  );
}
