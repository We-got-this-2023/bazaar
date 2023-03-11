import { useState } from "react";
import UserImage from "../components/UserImage";
import { FancyInput as Input } from "./Input";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AccountCard({ user }: { user: User }) {
  console.log(user);
  function getDate() {
    const date = new Date(user.createdAt).toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date;
  }
  const [date, setDate] = useState(getDate());
  console.log(date);
  return (
    <div>
      <h1>Account</h1>
      <div className="flex">
        <div className="col flex">
          <UserImage user={user} />
          <span>User since {date}</span>
        </div>
        <div className="col flex">
          <Input name="Name" type="text" />
          <Input name="Email" type="email" />
          <Input name="Age" type="number" />
        </div>
      </div>
    </div>
  );
}
