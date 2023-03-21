export default function Warning(props: React.SVGProps<SVGSVGElement>) {
  const cl = "fill-red-500";
  return (
    <svg
      width="0"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="100" height="100" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.4381 10.5C53.7438 5.83333 47.008 5.83334 44.3137 10.5L2.94826 82.1471C0.253963 86.8137 3.62185 92.6471 9.01045 92.6471H91.7413C97.1299 92.6471 100.498 86.8137 97.8035 82.147L56.4381 10.5ZM51.2419 17.5588C50.857 16.8922 49.8948 16.8922 49.5099 17.5588L11.6595 83.1176C11.2746 83.7843 11.7557 84.6176 12.5255 84.6176H88.2263C88.9961 84.6176 89.4772 83.7843 89.0923 83.1176L51.2419 17.5588Z"
        className={cl}
      />
      <rect x="46" y="35" width="8" height="31" rx="2" className={cl} />
      <rect x="46" y="70" width="8" height="8" rx="1.5" className={cl} />
    </svg>
  );
}
