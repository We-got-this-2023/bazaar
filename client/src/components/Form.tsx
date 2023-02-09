import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  defaultValues?: any;
  children: React.ReactElement[];
  onSubmit: (data: any) => Promise<void>;
}

export function Form({ defaultValues, children, onSubmit }: FormProps) {
  if (!children) return <></>;
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
}
