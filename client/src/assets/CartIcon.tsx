import { SVGProps } from "react";

export default ({
  number,
  ...props
}: SVGProps<SVGSVGElement> & { number?: number }) => {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M27.582 32.979C27.2045 30.7696 28.9721 28.7798 31.2106 28.8942L88.5134 31.8221C90.6311 31.9303 92.1669 33.8817 91.7743 35.9655L87.1522 60.4983C86.845 62.1289 85.435 63.3197 83.7759 63.3497L35.9343 64.2142C34.205 64.2455 32.7122 63.009 32.421 61.3042L27.582 32.979Z"
          strokeWidth="5"
          className="stroke-black dark:stroke-white"
        />
        <circle
          cx="46.344"
          cy="88.0643"
          r="4.79864"
          strokeWidth="4"
          className="stroke-black dark:stroke-white"
        />
        <circle
          cx="76.6764"
          cy="88.0643"
          r="4.79864"
          strokeWidth="4"
          className="stroke-black dark:stroke-white"
        />
        <path
          d="M4.29263 13.8223L19.8461 18.0329C21.337 18.4365 22.4623 19.6624 22.737 21.1823L32.0659 72.7841C32.4073 74.6729 34.0423 76.0529 35.9616 76.0723L84.0478 76.5587"
          strokeWidth="5"
          strokeLinecap="round"
          className="stroke-black dark:stroke-white"
        />
      </svg>
      {number && number > 0 && (
        <span className="absolute left-8 top-[1.2rem] bg-transparent font-logo text-black dark:text-white">
          {number > 9 ? "9+" : number}
        </span>
      )}
    </>
  );
};
