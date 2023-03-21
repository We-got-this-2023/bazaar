import { useState } from "react";
import UserImage from "../components/UserImage";
import { useAuth } from "../contexts/AuthContext";
import { Form } from "../formElements/Form";
import Input from "../formElements/Input";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AccountCard({ user }: { user: User }) {
  const [createdAt] = useState(
    new Date(user.createdAt).toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const { setUserInformation } = useAuth();

  return (
    <div
      className="
      flex flex-col items-center justify-center gap-6 rounded-3xl 
      border-[.5px] border-black bg-neutral-200 p-12 
      shadow-[0_0_5px_1px_#00000050] transition-all duration-200 
      hover:shadow-[0_0_8px_2px_#00000070] 
      dark:border-white dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff80] 
      dark:hover:shadow-[0_0_10px_2px_#ffffff90]
    "
    >
      <h1 className="text-2xl font-bold">My Profile</h1>
      <div className="flex gap-16">
        <div className="flex flex-col">
          <UserImage user={user} className="w-44" />
          <span className="opacity-60">User since {createdAt}</span>
        </div>
        <Form
          onSubmit={setUserInformation}
          className="flex flex-col justify-around"
        >
          <Input name="Name" type="text" initialValue={user.name} />
          <Input name="Email" type="email" initialValue={user.email} />
        </Form>
      </div>
    </div>
  );
}
