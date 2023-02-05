import { SVGProps } from "react";

export default function DefaultImage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_99_1746)">
        <mask
          id="mask0_99_1746"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="10"
          y="10"
          width="100"
          height="100"
        >
          <circle cx="60" cy="60" r="50" fill="black" />
        </mask>
        <g mask="url(#mask0_99_1746)">
          <circle cx="60" cy="60" r="50" fill="white" />
          <circle cx="59.9998" cy="45.5263" r="17.1053" fill="#D9D9D9" />
          <path
            d="M36.3159 75.2632C36.3159 69.7403 40.7931 65.2632 46.3159 65.2632H73.6843C79.2072 65.2632 83.6843 69.7403 83.6843 75.2632V115.263H36.3159V75.2632Z"
            fill="#D9D9D9"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_99_1746"
          x="0"
          y="0"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_99_1746"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_99_1746"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
