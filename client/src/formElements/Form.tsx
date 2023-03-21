import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Warning from "../assets/WarningIcon";

interface FormProps {
  defaultValues?: any;
  children: JSX.Element[] | JSX.Element;
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}

export function Form({
  defaultValues,
  children,
  onSubmit,
  className,
}: FormProps) {
  if (!children) return null;

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const [formError, setMainError] = useState<string | undefined>();

  const submit = async (data: any) => {
    try {
      await onSubmit(data);
      setMainError(undefined);
    } catch (error: any) {
      setMainError(error.message);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit(submit)}>
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
