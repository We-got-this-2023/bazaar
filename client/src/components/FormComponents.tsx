import React, { createElement } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

export function Form({
  defaultValues,
  children,
  onSubmit,
}: {
  defaultValues: any;
  children: JSX.Element[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}

export function Input({
  register,
  name,
  ...rest
}: {
  register: UseFormRegister<any>;
  name: string;
  rest: any;
}) {
  return <input {...register(name)} {...rest} />;
}
