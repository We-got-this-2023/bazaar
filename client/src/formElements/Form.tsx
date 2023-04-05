import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Warning from "../assets/WarningIcon";

interface FormProps {
  defaultValues?: any;
  children: JSX.Element[] | JSX.Element;
  onSubmit?: (data: any) => Promise<void>;
  onChange?: (data: any) => Promise<void>;
  className?: string;
}

export default function Form({
  defaultValues,
  children,
  onSubmit,
  onChange,
  className,
}: FormProps) {
  if (!children) return null;
  if (onChange && onSubmit)
    throw new Error("Form.tsx:21 Cannot have both onChange and onSubmit");
  if (!onChange && !onSubmit)
    throw new Error("Form.tsx:22 Must have either onChange or onSubmit");

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const [formError, setMainError] = useState<string | undefined>();

  const submit = onSubmit
    ? async (data: any) => {
        try {
          await onSubmit(data);
          setMainError(undefined);
        } catch (error: any) {
          setMainError(error.message);
        }
      }
    : undefined;

  const change = onChange
    ? async (data: any) => {
        try {
          await onChange(data);
          setMainError(undefined);
        } catch (error: any) {
          setMainError(error.message);
        }
      }
    : undefined;

  return (
    <form
      className={className}
      onSubmit={submit ? handleSubmit(submit) : undefined}
      onChange={change ? handleSubmit(change) : undefined}
    >
      {formError && (
        <div className="flex gap-2">
          <Warning className="h-5 w-5" />
          <span className="text-red-500">{formError}</span>
        </div>
      )}
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
}
