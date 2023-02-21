import { SVGProps } from "react";

export default function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="0"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="55.4207"
        y="61.0771"
        width="8"
        height="55.0397"
        rx="4"
        transform="rotate(-45 55.4207 61.0771)"
        className="fill-black dark:fill-white"
      />
      <path
        d="M74 37C74 57.4345 57.4345 74 37 74C16.5655 74 0 57.4345 0 37C0 16.5655 16.5655 0 37 0C57.4345 0 74 16.5655 74 37ZM8.29808 37C8.29808 52.8516 21.1484 65.7019 37 65.7019C52.8516 65.7019 65.7019 52.8516 65.7019 37C65.7019 21.1484 52.8516 8.29808 37 8.29808C21.1484 8.29808 8.29808 21.1484 8.29808 37Z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}
