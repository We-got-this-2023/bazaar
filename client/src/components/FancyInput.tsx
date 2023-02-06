import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes, useRef, useState } from "react";
import { FieldErrors } from "react-hook-form";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
}

export default function FancyInput({ errors, ...props }: FancyInputProps) {
  let error: JSX.Element =
    props.name && errors ? (
      <ErrorMessage errors={errors} name={props.name} />
    ) : (
      <></>
    );

  const [labelSmall, setLabelSmall] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (focus: boolean) => {
    if (inputRef.current?.value === "") setLabelSmall(focus);
    else setLabelSmall(true);
  };

  return (
    <div className="mb-2 flex flex-col">
      <div className="relative flex flex-col gap-2">
        <input
          {...props}
          ref={inputRef}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className="rounded-md border border-gray-300 px-4 pt-4 pb-1"
          placeholder=""
          aria-placeholder={props.placeholder || ""}
        />
        <label
          className={`absolute select-none opacity-60 transition-all duration-300 ease-out ${
            labelSmall
              ? "top-0 pl-2 text-xs"
              : "top-1/2 -translate-y-1/2 pl-3 text-base"
          }`}
          htmlFor={props.placeholder}
        >
          {props.placeholder}
        </label>
      </div>
      {errors && error.props.errors[error.props.name] && (
        <div className="flex items-center text-sm text-red-500">{error}</div>
      )}
    </div>
  );
}
