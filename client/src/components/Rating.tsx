export default function Rating({ rating }: { rating?: number }) {
  if (rating) {
    return (
      <div className="flex gap-1">
        {(() => {
          let state: "full" | "half" | "empty";
          const stars = [];
          for (let i = 0; i < 5; i++) {
            if (rating >= i + 0.2 && rating <= i + 0.8) state = "half";
            else if (rating >= i + 0.8) state = "full";
            else state = "empty";
            stars.push(<Star key={i} state={state} />);
          }
          return stars;
        })()}
      </div>
    );
  } else {
    return (
      <div className="flex gap-1">
        {(() => {
          const stars = [];
          for (let i = 1; i < 6; i++)
            stars.push(<Star key={i} state="empty" />);
          return stars;
        })()}
      </div>
    );
  }
}

function Star({ state }: { state: "empty" | "full" | "half" }) {
  return (
    <svg
      className="w-8"
      viewBox="0 0 96 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M77.3893 90.4509L48 69.0983V0L59.2257 34.5491H95.5529L66.1636 55.9017L77.3893 90.4509Z"
        fill={state === "full" ? "#F7EF42" : "#C0C0C0"}
      />
      <path
        d="M18.6107 90.4509L48 69.0983V0L36.7743 34.5491H0.447144L29.8364 55.9017L18.6107 90.4509Z"
        fill={state === "empty" ? "#C0C0C0" : "#F7EF42"}
      />
    </svg>
  );
}
