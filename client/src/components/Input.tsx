import { ErrorMessage } from "@hookform/error-message";
import React, {
  Children,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  useRef,
  useState,
} from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/Warning";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name: string;
  className?: string;
  options?: RegisterOptions;
  type: string;
  placeholder?: string;
}

interface FancySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  errors?: FieldErrors;
  name: string;
  className?: string;
  options?: RegisterOptions;
  placeholder?: string;
  children: JSX.Element[];
  type?: string;
}

export function FancyInput({
  name,
  options,
  className,
  type,
  placeholder,
  ...rest
}: FancyInputProps) {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  const [labelSmall, setLabelSmall] = useState(false);
  const [isNumber] = useState(type === "number");
  const { ref, ...regRest } = name ? register(name, options) : { ref: null };

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
          } bg-white-bright p-2 shadow-blue-200 ring-blue-200 transition-all duration-200 focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:scale-[101.5%] hover:shadow-[0_0_10px_2px_#bfdbfe] dark:bg-neutral-800 dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1 dark:hover:shadow-[0_0_10px_0px_#bfdbfe] ${className}`}
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

export function FancySelect({
  name,
  options,
  className,
  placeholder,
  children,
  type,
  ...rest
}: FancySelectProps) {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  const { ref, ...regRest } = name ? register(name, options) : { ref: null };

  const inputRef = useRef<HTMLSelectElement | null>(null);

  const [labelSmall, setLabelSmall] = useState(false);
  const [isCheckbox] = useState(type === "checkbox");

  const handleFocus = (focus: boolean) => {
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);
  };
  return (
    <select
      {...rest}
      {...(ref ? regRest : {})}
      ref={(e) => {
        if (!ref) return inputRef;
        ref(e);
        inputRef.current = e;
      }}
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      className={`rounded-md border px-4 pb-2 ring-blue-300 focus:outline-none focus:ring-2 dark:bg-black ${
        name && errors[name] ? "border-red-500 ring-red-300" : "border-gray-300"
      } bg-white-bright p-2 shadow-blue-200 ring-blue-200 transition-all duration-200 focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:scale-[101.5%] hover:shadow-[0_0_10px_2px_#bfdbfe] dark:bg-neutral-800 dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1 dark:hover:shadow-[0_0_10px_0px_#bfdbfe] ${className}`}
      placeholder=""
      aria-placeholder={placeholder ?? ""}
    >
      {Children.map(children, (child: JSX.Element) => {
        if (type !== "checkbox" && child.type !== "option")
          throw new Error('Input.tsx:142 - child.type must be "option"');
        if (isCheckbox && child.type !== "input")
          throw new Error('Input.tsx:143 - child.type must be "input"');
        const { value } = child.props;
        if (isCheckbox) {
          return (
            <input {...child.props} type="checkbox" name={value} key={value} />
          );
        }
        return (
          <option {...child.props} key={value} value={value} children={value} />
        );
      })}
    </select>
  );
}
