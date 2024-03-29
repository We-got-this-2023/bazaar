import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import Warning from "../assets/WarningIcon";
import { useMisc } from "../contexts/MiscContext";

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name: string;
  options?: RegisterOptions;
  setFileNamesOutlet?: Function;
  placementClassName?: string;
  initialValue?: File | FileList | string;
}

export default function FancyInput({
  name,
  options,
  className: cOverrides,
  setFileNamesOutlet,
  initialValue,
  ...rest
}: FancyInputProps) {
  if (initialValue && typeof initialValue === "string")
    throw new Error("initialValue must be a File.");
  const { isSm } = useMisc();
  const form = useFormContext();
  let formState, register, errors, ref: any, regRest: any;
  const [files, setFiles] = useState<FileList>([] as unknown as FileList);
  if (form) {
    formState = form.formState;
    register = form.register;
    errors = formState.errors;
  }
  const inputRef = useRef<HTMLInputElement | null>(null);
  if (name && register) {
    const reg = register(name, options || {});
    ref = reg.ref;
    regRest = reg;
    regRest.ref = undefined;
  }

  useEffect(() => {
    if (setFileNamesOutlet) {
      const fileNames = (
        <>
          {(() => {
            for (let i = 0; i < files.length; i++) {
              return files.item(i)?.name;
            }
          })()}
        </>
      );
      setFileNamesOutlet(fileNames);
    }
  }, [files]);

  useEffect(() => {
    inputRef.current!.onchange = () => {
      setFiles((inputRef.current!.files || []) as FileList);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      if (initialValue instanceof File) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(initialValue);
        inputRef.current.files = dataTransfer.files;
      } else if (initialValue instanceof FileList) {
        const dataTransfer = new DataTransfer();
        for (let file in initialValue) {
          dataTransfer.items.add(initialValue[file]);
        }
      }
    }
  }, [initialValue]);

  return (
    <div className="relative flex flex-col items-center gap-2">
      <button
        type="button"
        className={`
          h-fit w-fit rounded-md bg-white-bright p-2 font-display capitalize shadow-blue-200 transition-all
          duration-200 focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px]
          hover:shadow-[0_0_10px_2px_#bfdbfe] focus:shadow-[0_0_10px_2px_#bfdbfe] focus:outline-none focus:ring-2
          dark:bg-neutral-800 dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1
          dark:hover:shadow-[0_0_10px_0px_#bfdbfe] dark:focus:shadow ${
            isSm ? "text-sm" : ""
          }
        ${cOverrides || ""}`}
        onClick={() => inputRef.current?.click()}
      >
        {name}
      </button>
      <input
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
        type="file"
        name={name}
        id={name}
        className="hidden"
      />
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
