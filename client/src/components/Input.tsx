import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name?: string;
  register?: UseFormRegister<any>;
}

export default function Input({
  errors,
  name,
  register,
  ...rest
}: FancyInputProps) {
  let error: JSX.Element =
    name && errors ? <ErrorMessage errors={errors} name={name} /> : <></>;

  const [labelSmall, setLabelSmall] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (focus: boolean) =>
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);

  return (
    <div className="mb-2 flex flex-col">
      <div className="relative flex flex-col gap-2">
        <input
          ref={inputRef}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className="rounded-md border border-gray-300 px-4 pt-4 pb-1"
          placeholder=""
          aria-placeholder={rest.placeholder || ""}
          {...(register && name ? register(name) : "")}
          {...rest}
        />
        <label
          className={`absolute select-none capitalize opacity-60 transition-all duration-300 ease-out ${
            labelSmall
              ? "top-0 pl-2 text-xs opacity-100"
              : "top-1/2 -translate-y-1/2 pl-3 text-base"
          }`}
          htmlFor={rest.placeholder || name}
        >
          {rest.placeholder || name}
        </label>
      </div>
      {errors && error?.props?.errors[error.props.name] && (
        <div className="flex items-center text-sm text-red-500">{error}</div>
      )}
    </div>
  );
}
