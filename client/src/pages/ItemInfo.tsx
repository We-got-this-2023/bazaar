import { useParams } from "react-router-dom";

export default function ItemInfo() {
  const { id } = useParams();
  return (
    <div className="navbar">
      <div className="home">Item: {id}</div>
    </div>
  );
}
