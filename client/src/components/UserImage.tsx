import DefaultImage from "../assets/DefaultImage";

export default function UserImage({ user }: { user: any }) {
  if (user.image) return <img src={user.image} alt={user.name} />;
  return <DefaultImage />;
}
