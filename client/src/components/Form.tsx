import React, { cloneElement, createElement } from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  defaultValues?: any;
  children: React.ReactElement[];
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
}

export function Form({ defaultValues, children, onSubmit }: FormProps) {
  if (!children) return <></>;
  const { handleSubmit, register } = useForm({ defaultValues });

  const newChildren = React.Children.map(children, (child: JSX.Element) => {
    if (child?.type?.name === "Input") {
      return createElement(child.type, {
        ...{
          ...child.props,
          register,
          key: child.props.name,
        },
      });
    }
    return child;
  });
  console.log(newChildren);

  return <form onSubmit={handleSubmit(onSubmit)}>{newChildren}</form>;
}
