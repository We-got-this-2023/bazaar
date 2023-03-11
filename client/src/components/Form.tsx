import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Warning from "../assets/Warning";

interface FormProps {
  defaultValues?: any;
  children: React.ReactElement[];
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}

export function Form({
  defaultValues,
  children,
  onSubmit: sendForm,
  className,
}: FormProps) {
  if (!children) return <></>;
  const methods = useForm({ defaultValues });
  const { handleSubmit: testSyntax } = methods;
  const [formError, setMainError] = useState();
  const submit = async (data: any) => {
    try {
      await sendForm(data);
      setMainError(undefined);
    } catch (error: any) {
      setMainError(error.message);
    }
  };

  return (
    <form className={className || ""} onSubmit={testSyntax(submit)}>
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
