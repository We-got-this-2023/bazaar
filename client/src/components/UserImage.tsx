import DefaultImage from "../assets/DefaultImage";

export default function UserImage({
  user,
  className,
}: {
  user: any;
  className?: string;
}) {
  console.log(user);
  if (user.photoURL)
    return <img src={user.photoURL} alt={user.name} className={className} />;
  return <DefaultImage className={className} />;
}
