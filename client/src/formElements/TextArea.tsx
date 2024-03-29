import { ErrorMessage } from "@hookform/error-message";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/WarningIcon";
import { useMisc } from "../contexts/MiscContext";

interface FancyInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: FieldErrors;
  name: string;
  options?: RegisterOptions;
  initialValue?: string;
  placementClassName?: string;
  placeholder?: string;
}

export default function TextArea({
  name,
  options,
  className: cOverrides,
  placeholder,
  initialValue,
  placementClassName,
  ...rest
}: FancyInputProps) {
  const { isSm } = useMisc();
  const form = useFormContext();
  let formState, register, errors, ref: any, regRest: any;
  if (form) {
    formState = form.formState;
    register = form.register;
    errors = formState.errors;
  }
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [labelSmall, setLabelSmall] = useState(false);
  if (name && register) {
    const reg = register(name, options || {});
    ref = reg.ref;
    regRest = reg;
    regRest.ref = undefined;
  }
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
    <div className={`mb-2 flex flex-col ${placementClassName}`}>
      <div className="relative flex flex-col gap-2">
        <div
          className={`
            w-full min-w-fit rounded-md bg-white-bright p-1 shadow-blue-200 transition-all duration-200 
            focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:shadow-[0_0_10px_2px_#bfdbfe] 
            focus:shadow-[0_0_10px_2px_#bfdbfe] focus:outline-none focus:ring-2 
            dark:bg-neutral-800 dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1 
            dark:hover:shadow-[0_0_10px_0px_#bfdbfe] dark:focus:shadow
            ${
              name && errors && errors[name]
                ? "border-1 border-red-500 ring-red-300"
                : "ring-blue-300"
            }
              ${cOverrides ?? ""}
              `}
        >
          <textarea
            rows={1}
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
            className={`relative h-full w-full resize-none bg-transparent p-2 outline-none ${
              isSm ? "text-sm" : ""
            }`}
            placeholder=""
            aria-placeholder={placeholder ?? ""}
            defaultValue={initialValue}
          />
        </div>
        <label
          className={`
          pointer-events-none absolute -translate-y-1/2 
          select-none pl-3 text-base capitalize
              transition-all duration-300 ease-out
              ${
                labelSmall
                  ? (isSm ? "text-[.5rem]" : "text-xs") +
                    " top-2 pl-2 opacity-80"
                  : (isSm ? "text-xs" : "text-base") + " top-6 pl-2 opacity-60"
              }`}
          htmlFor={placeholder ?? name}
        >
          {placeholder ?? name}
        </label>
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
