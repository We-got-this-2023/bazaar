import { ErrorMessage } from "@hookform/error-message";
import {
  Children,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/Warning";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name: string;
  options?: RegisterOptions;
  initialValue?: string;
  type: string;
  placementClassName?: string;
  placeholder?: string;
}

interface FancySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  errors?: FieldErrors;
  name: string;
  options?: RegisterOptions;
  placeholder?: string;
  children: JSX.Element[];
  initialValue?: string;
  placementClassName?: string;
  type?: string;
}

export function FancyInput({
  name,
  options,
  className: cOverrides,
  type,
  placeholder,
  initialValue,
  placementClassName,
  ...rest
}: FancyInputProps) {
  const form = useFormContext();
  let formState, register, errors, ref: any, regRest: any;
  if (form) {
    formState = form.formState;
    register = form.register;
    errors = formState.errors;
  }
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const [labelSmall, setLabelSmall] = useState(false);
  const [isNumber] = useState(type === "number");
  if (name && register) {
    const reg = register(name, options || {});
    ref = reg.ref;
    regRest = reg;
    regRest.ref = undefined;
  }
  const handleFocus = (focus: boolean) => {
    if (isNumber) return;
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);
  };
  useEffect(() => {
    if (
      initialValue !== undefined &&
      initialValue !== "" &&
      initialValue !== null
    ) {
      if (inputRef.current) {
        inputRef.current.value = initialValue;
        setLabelSmall(true);
      }
    }
  }, []);
  return (
    <div className={`mb-2 flex flex-col ${placementClassName}`}>
      <div className="relative flex flex-col gap-2">
        <input
          {...rest}
          {...(ref ? regRest : {})}
          type={type}
          ref={(e) => {
            if (!ref) {
              inputRef.current = e;
              return inputRef;
            }
            ref(e);
            inputRef.current = e;
          }}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className={`
            rounded-md bg-white-bright p-4 pb-2 shadow-blue-200 transition-all duration-200 
            focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:shadow-[0_0_10px_2px_#bfdbfe] 
            focus:shadow-[0_0_10px_2px_#bfdbfe] focus:outline-none focus:ring-2 
            dark:bg-neutral-800 dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1 
            dark:hover:shadow-[0_0_10px_0px_#bfdbfe] dark:focus:shadow
            ${
              name && errors && errors[name]
                ? "border-1 border-red-500 ring-red-300"
                : "ring-blue-300"
            }
            ${
              isNumber ? "appearance-none pt-2 [-moz-appearance:textfield]" : ""
            }
            ${cOverrides ?? ""}
          `}
          placeholder={isNumber ? placeholder ?? name : ""}
          aria-placeholder={placeholder ?? ""}
        />
        {!isNumber && (
          <label
            className={`
              pointer-events-none absolute top-1/2 -translate-y-1/2 
              select-none pl-3 text-base capitalize opacity-60 
              transition-all duration-300 ease-out 
              ${labelSmall ? "top-2 pl-2 text-xs opacity-80" : ""}`}
            htmlFor={placeholder ?? name}
          >
            {placeholder ?? name}
          </label>
        )}
      </div>
      {name && errors && errors[name] && (
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
  className: cOverrides,
  placeholder,
  children,
  type,
  initialValue,
  ...rest
}: FancySelectProps) {
  const form = useFormContext();
  let formState, register, errors, ref: any, regRest: any;
  if (form) {
    formState = form.formState;
    register = form.register;
    errors = formState.errors;
  }
  if (name && register) {
    const reg = register(name, options || {});
    ref = reg.ref;
    regRest = reg;
    regRest.ref = undefined;
  }
  const inputRef = useRef<HTMLSelectElement | null>(null);
  const setLabelSmall = useState(false)[1];
  const [isCheckbox] = useState(type === "checkbox");
  const handleFocus = (focus: boolean) => {
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);
  };
  useEffect(() => {
    if (
      initialValue !== undefined &&
      initialValue !== "" &&
      initialValue !== null
    ) {
      if (inputRef.current) {
        inputRef.current.value = initialValue;
        setLabelSmall(true);
      }
    }
  }, []);
  return (
    <select
      {...rest}
      {...(ref ? regRest : {})}
      ref={(e) => {
        if (!ref) {
          inputRef.current = e;
          return inputRef;
        }
        ref(e);
        inputRef.current = e;
      }}
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      className={`
        rounded-md bg-white-bright px-4 py-2 shadow-blue-200 
        ring-blue-300 transition-all duration-200 focus-within:shadow-[0_0_10px_2px_#bfdbfe] 
        focus-within:ring-[2px] hover:scale-[101.5%] 
        hover:shadow-[0_0_10px_2px_#bfdbfe] focus:shadow-[0_0_10px_2px_#bfdbfe] 
        focus:outline-none focus:ring-2 dark:bg-neutral-800 
        dark:focus-within:ring-1 dark:hover:shadow-[0_0_10px_0px_#bfdbfe] dark:focus:shadow-[0_0_10px_0px_#bfdbfe]
        ${name && errors && errors[name] ? "border-red-500 ring-red-300" : ""} 
        ${cOverrides ?? ""} 
      `}
      placeholder=""
      aria-placeholder={placeholder ?? ""}
    >
      {Children.map(children, (child: JSX.Element) => {
        if (type !== "checkbox" && child.type)
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
