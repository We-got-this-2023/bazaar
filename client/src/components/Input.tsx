import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes, useRef, useState } from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/Warning";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name?: string;
  options?: RegisterOptions;
}

export default function Input({ name, options, ...rest }: FancyInputProps) {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [labelSmall, setLabelSmall] = useState(false);
  const { ref, ...regRest } = name ? register(name, options) : { ref: null };

  const handleFocus = (focus: boolean) =>
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);

  return (
    <div className="mb-2 flex flex-col">
      <div className="relative flex flex-col gap-2">
        <input
          {...rest}
          {...(ref ? regRest : {})}
          ref={(e) => {
            if (!ref) return inputRef;
            ref(e);
            inputRef.current = e;
          }}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className={`rounded-md border px-4 pt-4 pb-2 ring-blue-300 focus:outline-none focus:ring-2 ${
            name && errors[name]
              ? "border-red-500 ring-red-300"
              : "border-gray-300"
          }`}
          placeholder=""
          aria-placeholder={rest.placeholder || ""}
        />
        <label
          className={`pointer-events-none absolute select-none capitalize opacity-60 transition-all duration-300 ease-out ${
            labelSmall
              ? "top-0 pl-2 text-xs opacity-80"
              : "top-1/2 -translate-y-1/2 pl-3 text-base"
          }`}
          htmlFor={rest.placeholder || name}
        >
          {rest.placeholder || name}
        </label>
      </div>
      {name && errors[name] && (
        <div className="flex items-center gap-2 p-1 text-red-500">
          <Warning className="h-5 w-5" />
          <span className="text-sm">
            <ErrorMessage errors={errors} name={name} />
          </span>
        </div>
      )}
    </div>
  );
}
