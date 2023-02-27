import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div>
      <h1>{isOwner && <span>My </span>}Profile</h1>
      <p>id: {id}</p>
    </div>
  );
}
