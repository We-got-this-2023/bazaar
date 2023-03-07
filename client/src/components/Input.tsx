import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes, useRef, useState } from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/Warning";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name: string;
  className?: string;
  options?: RegisterOptions;
  type: string;
  placeholder?: string;
  choices?: string[];
}

export default function Input({
  name,
  options,
  className,
  type,
  placeholder,
  choices,
  ...rest
}: FancyInputProps) {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [labelSmall, setLabelSmall] = useState(false);
  const [isNumber] = useState(type === "number");
  const [isSelect] = useState(type === "select");
  const { ref, ...regRest } = name ? register(name, options) : { ref: null };

  if (isSelect) {
    if (!choices) throw new Error('Input.tsx:26 "choices" is required');
  } else if (choices)
    throw new Error('Input.tsx:27 "choices" is not supported for this type');

  const handleFocus = (focus: boolean) => {
    if (isNumber) return;
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);
  };

  return (
    <div className="mb-2 flex flex-col">
      <div className="relative flex flex-col gap-2">
        <input
          {...rest}
          type={type}
          {...(ref ? regRest : {})}
          ref={(e) => {
            if (!ref) return inputRef;
            ref(e);
            inputRef.current = e;
          }}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className={`rounded-md border px-4 ${
            isNumber
              ? "appearance-none pt-2 [-moz-appearance:textfield]"
              : "pt-4"
          } pb-2 ring-blue-300 focus:outline-none focus:ring-2 dark:bg-black ${
            name && errors[name]
              ? "border-red-500 ring-red-300"
              : "border-gray-300"
          }${className}`}
          placeholder={isNumber ? placeholder ?? name : ""}
          aria-placeholder={placeholder ?? ""}
        />
        {!isNumber && (
          <label
            className={`pointer-events-none absolute select-none capitalize opacity-60 transition-all duration-300 ease-out ${
              labelSmall
                ? "top-0 pl-2 text-xs opacity-80"
                : "top-1/2 -translate-y-1/2 pl-3 text-base"
            }`}
            htmlFor={placeholder ?? name}
          >
            {placeholder ?? name}
          </label>
        )}
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
