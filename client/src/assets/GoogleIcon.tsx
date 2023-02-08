import { SVGProps } from "react";

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="100" height="100" rx="7" fill="white" />
      <g filter="url(#filter0_d_41_4444)">
        <path
          d="M86 50.8636C86 48.1691 85.7597 45.5782 85.3135 43.0909H49.7551V57.8073H70.0742C69.1818 62.54 66.5046 66.5473 62.4889 69.2418V78.8109H74.7421C81.8813 72.1782 86 62.4364 86 50.8636Z"
          fill="#4285F4"
        />
        <path
          d="M49.7551 88C59.949 88 68.4954 84.6145 74.7421 78.8109L62.4889 69.2418C59.1252 71.5218 54.8349 72.9036 49.7551 72.9036C39.9388 72.9036 31.5983 66.2364 28.6122 57.2545H16.0501V67.0655C22.2625 79.4673 34.9963 88 49.7551 88Z"
          fill="#34A853"
        />
        <path
          d="M28.6122 57.22C27.8571 54.94 27.4109 52.5218 27.4109 50C27.4109 47.4782 27.8571 45.06 28.6122 42.78V32.9691H16.0501C13.4759 38.0818 12 43.8509 12 50C12 56.1491 13.4759 61.9182 16.0501 67.0309L25.8321 59.3618L28.6122 57.22Z"
          fill="#FBBC05"
        />
        <path
          d="M49.7551 27.1309C55.3154 27.1309 60.2579 29.0655 64.205 32.7964L75.0167 21.9145C68.461 15.7655 59.949 12 49.7551 12C34.9963 12 22.2625 20.5327 16.0501 32.9691L28.6122 42.78C31.5983 33.7982 39.9388 27.1309 49.7551 27.1309Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_41_4444"
          x="12"
          y="12"
          width="82"
          height="84"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_41_4444"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_41_4444"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
