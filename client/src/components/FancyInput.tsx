import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes, useRef, useState } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  register?: UseFormRegister<any>;
  name?: string;
  registerOptions?: RegisterOptions;
}

export default function FancyInput({
  errors,
  register,
  name,
  registerOptions,
  ...rest
}: FancyInputProps) {
  if (register && (!name || registerOptions))
    throw new Error("FancyInput.tsx:17: Name is required when using register.");

  let error: JSX.Element =
    name && errors ? <ErrorMessage errors={errors} name={name} /> : <></>;

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
          {...rest}
          ref={inputRef}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className="rounded-md border border-gray-300 px-4 pt-4 pb-1"
          placeholder=""
          {...(register &&
            registerOptions &&
            name &&
            register(name, registerOptions))}
          aria-placeholder={rest.placeholder || ""}
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
      {errors && error.props.errors[error.props.name] && (
        <div className="flex items-center text-sm text-red-500">{error}</div>
      )}
    </div>
  );
}
