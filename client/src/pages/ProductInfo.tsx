import { useParams } from "react-router-dom";

export default function ProductInfo() {
  const { id } = useParams();
  return (
    <div className="navbar">
      <div className="home">Product: {id}</div>
    </div>
  );
}
