import { SVGProps } from "react";

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M27.6566 32H88.7811C91.0266 32 92.4762 34.3765 91.4484 36.3731L77.5497 63.3731C77.0354 64.3721 76.0059 65 74.8823 65H31.9857C30.5122 65 29.2568 63.9299 29.0236 62.4749L24.6944 35.4749C24.4021 33.6519 25.8103 32 27.6566 32Z"
        stroke-width="6"
        className="dark:stroke-white stroke-black-0"
      />
      <circle cx="41.5" cy="82.5" r="5.5" stroke-width="4" />
      <circle
        cx="74.118"
        cy="82.5"
        r="5.5"
        stroke-width="4"
        className="dark:stroke-white stroke-black-0"
      />
      <path
        d="M2.00001 16.4797L17.1929 22.2131C18.4912 22.703 19.4428 23.8308 19.7073 25.193L28.8239 72.1449C29.189 74.0249 30.8354 75.3824 32.7506 75.3824L84.8882 75.3824"
        stroke-width="4"
        stroke-linecap="round"
        className="dark:stroke-white stroke-black-0"
      />
    </svg>
  );
};
