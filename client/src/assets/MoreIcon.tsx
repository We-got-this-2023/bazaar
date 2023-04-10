export default function MoreIcon({ className }: { className?: string }) {
  return (
    <svg
      width="0"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ""}`}
    >
      <rect
        x="2"
        y="22"
        width="95"
        height="12"
        rx="3"
        className="fill-black dark:fill-white"
      />
      <rect
        x="2"
        y="44"
        width="73"
        height="11"
        rx="3"
        className="fill-black dark:fill-white"
      />
      <rect
        x="2"
        y="65"
        width="95"
        height="12"
        rx="3"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}
