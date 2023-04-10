import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountCard from "../cards/Account";
import DeliveryForm from "../cards/Shipping";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!id || user.id === Number(id)) setIsOwner(true);
      else setIsOwner(false);
    }
  }, [isLoading, id]);

  return (
    <div className="relative top-24 mb-[14rem] flex flex-col items-center gap-4">
      {isOwner && (
        <>
          <AccountCard user={user} />
          <DeliveryForm user={user} />
        </>
      )}
    </div>
  );
}
