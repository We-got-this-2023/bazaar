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
  className?: string;
  options?: RegisterOptions;
  initialValue?: string;
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
  initialValue?: string;
  type?: string;
}

export function FancyInput({
  name,
  options,
  className: cOverrides,
  type,
  placeholder,
  initialValue,
  ...rest
}: FancyInputProps) {
  const form = useFormContext();
  let formState, register, errors;
  if (form) {
    formState = form.formState;
    register = form.register;
    errors = formState.errors;
  }

  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  const [labelSmall, setLabelSmall] = useState(false);
  const [isNumber] = useState(type === "number");
  const { ref, ...regRest } =
    name && register ? register(name, options) : { ref: null };

  const handleFocus = (focus: boolean) => {
    if (isNumber) return;
    inputRef.current?.value === "" ? setLabelSmall(focus) : setLabelSmall(true);
  };

  useEffect(() => {
    if (initialValue) {
      console.log(initialValue);
      if (inputRef.current) {
        inputRef.current.value = initialValue;
        setLabelSmall(true);
      }
    }
  }, []);

  const classes = {
    error:
      name && errors && errors[name]
        ? "border-red-500 ring-red-300 border-1"
        : "ring-blue-300",
    main: "rounded-md p-4 pb-2 dark:bg-neutral-800 bg-white-bright shadow-blue-200 transition-all duration-200",
    labelMain:
      "pointer-events-none absolute select-none capitalize opacity-60 transition-all duration-300 ease-out top-1/2 -translate-y-1/2 pl-3 text-base",
    labelSmall: labelSmall ? "top-2 pl-2 text-xs opacity-80" : "",
    number: isNumber ? "appearance-none pt-2 [-moz-appearance:textfield]" : "",
    pseudo:
      "focus:outline-none focus:ring-2 focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:shadow-[0_0_10px_2px_#bfdbfe] dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1 dark:hover:shadow-[0_0_10px_0px_#bfdbfe]",
    overrides: cOverrides ?? "",
  };

  const classString = [
    classes.error,
    classes.main,
    classes.number,
    classes.pseudo,
    classes.overrides,
  ].join(" ");
  const labelClassString = [classes.labelMain, classes.labelSmall].join(" ");

  return (
    <div className="mb-2 flex flex-col">
      <div className="relative flex flex-col gap-2">
        <input
          {...rest}
          {...(ref ? regRest : {})}
          type={type}
          ref={(e) => {
            if (!ref) return inputRef;
            ref(e);
            inputRef.current = e;
          }}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className={classString}
          placeholder={isNumber ? placeholder ?? name : ""}
          aria-placeholder={placeholder ?? ""}
        />
        {!isNumber && (
          <label className={labelClassString} htmlFor={placeholder ?? name}>
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

  const classes = {
    error: name && errors[name] ? "border-red-500 ring-red-300" : "",
    main: "shadow-blue-200 rounded-md px-4 py-2 dark:bg-black bg-white-bright ring-blue-300 transition-all duration-200",
    pseudo:
      "focus:outline-none focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:scale-[101.5%] hover:shadow-[0_0_10px_2px_#bfdbfe] dark:focus-within:shadow-[0_0_5px_#bfdbfe] focus:ring-2 dark:focus-within:ring-1 dark:hover:shadow-[0_0_10px_0px_#bfdbfe]",
    override: cOverrides ?? "",
  };

  const classString = [
    classes.main,
    classes.error,
    classes.pseudo,
    classes.override,
  ].join(" ");

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
      className={classString}
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
