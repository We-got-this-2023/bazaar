import { ErrorMessage } from "@hookform/error-message";
import {
  Children,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/WarningIcon";
import { useMisc } from "../contexts/MiscContext";

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
export default function FancySelect({
  name,
  options,
  className: cOverrides,
  placementClassName,
  placeholder,
  children,
  type,
  initialValue,
  ...rest
}: FancySelectProps) {
  const { isSm } = useMisc();
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
    if (initialValue) setLabelSmall(true);
  }, []);
  return (
    <div className={`mb-2 flex flex-col ${placementClassName}`}>
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
          ${isSm ? "text-sm" : ""}
          ${cOverrides ?? ""} 
        `}
        placeholder=""
        aria-placeholder={placeholder ?? ""}
        defaultValue={initialValue ?? ""}
      >
        {Children.map(children, (child: JSX.Element) => {
          if (!isCheckbox && child.type !== "option")
            throw new Error('Select.tsx:96 - child.type must be "option"');
          if (isCheckbox && child.type !== "input")
            throw new Error('Select.tsx:98 - child.type must be "input"');
          const { value } = child.props;
          if (isCheckbox) {
            return (
              <input
                {...child.props}
                type="checkbox"
                name={value}
                key={value}
              />
            );
          }
          return (
            <option
              {...child.props}
              key={value}
              value={value}
              children={value}
            />
          );
        })}
      </select>
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
