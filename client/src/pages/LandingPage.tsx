import Carousel from "../components/Carousel";

export default function LandingPage() {
  const images = ["/electronics.jpg", "/glassware.jpg", "/clothing.jpg"];

  return (
    <>
      <h1>Landing Page</h1>
      <Carousel images={images} />;
    </>
  );
}
