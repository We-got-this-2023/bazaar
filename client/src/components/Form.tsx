import React, { createElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  defaultValues?: any;
  children: React.ReactElement[];
  onSubmit: (data: any) => Promise<void>;
}

export function Form({ defaultValues, children, onSubmit }: FormProps) {
  if (!children) return <></>;
  const methods = useForm({ defaultValues });
  const { handleSubmit, register } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        {React.Children.map(children, (child: JSX.Element) => {
          if (child?.type?.name === "Input")
            return createElement(child.type, {
              register,
              key: child.props.name,
              ...child.props,
            });
          return child;
        })}
      </FormProvider>
    </form>
  );
}
