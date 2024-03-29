export default ({ isSmall = false }: { isSmall?: boolean }) => {
  return (
    <div className="flex items-center">
      <svg
        width="0"
        className="w-14"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M63.5834 9.80396C50.0678 15.858 28.3495 34.2531 34.4802 56.1902C34.4802 56.1902 27.3914 55.5488 28.7254 44.5167C9.37432 64.2718 20.2211 100 51.4227 100C82.6243 100 90.7468 67.7354 81.4428 51.3155C56.0942 69.0848 60.0779 23.6923 63.5834 9.80396ZM56.1243 30.116C47.7205 33.8989 35.1014 51.4474 38.9133 65.1547C38.9133 65.1547 28.3743 63.9525 29.2038 57.0591C17.1715 69.4031 31.0126 98.549 50.4133 98.549C69.8139 98.549 79.5904 73.7702 73.8054 63.5103C58.044 74.6134 53.9446 38.7942 56.1243 30.116Z"
          className="fill-brick-red"
        />
        <path
          d="M81.1232 27.7839C88.9248 19.4233 86.1716 7.32037 73.8692 0C79.7031 12.108 77.416 15.343 70.54 21.7904C66.2978 25.7682 73.2209 36.2523 81.1232 27.7839Z"
          className="fill-black transition-all duration-200 dark:fill-neutral-800"
        />
        <path
          d="M29.5849 15C28.3822 21.378 21.073 23.8688 15.7085 33.25C10.344 42.6312 19.3251 54.9571 19.3251 54.9571C19.3251 54.9571 15.4496 42.7302 24.1248 37.75C32.8 32.7698 33.5133 21.7114 29.5849 15Z"
          className="fill-black transition-all duration-200 dark:fill-neutral-800"
        />
        <path
          d="M39.8456 74.2534C48.3938 88.506 53.5664 77.0422 48.4825 56.5C66.4412 78.4278 64.55 92.5 52.1366 92.5C39.7232 92.5 36.1441 79.6508 39.8456 74.2534Z"
          className="fill-black transition-all duration-200 dark:fill-neutral-800"
        />
      </svg>
      {!isSmall && (
        <span className="relative transition-all duration-200 after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto after:h-2 after:w-0 after:rounded-lg after:bg-black after:transition-all after:duration-200 after:content-[''] group-hover:after:w-full dark:after:bg-white max-sm:hidden">
          Bazaar
        </span>
      )}
    </div>
  );
};
