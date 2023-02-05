import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

export default function InputWithError({
  name,
  errors,
  children: input,
}: {
  name: string;
  errors: FieldErrors<FormData>;
  children: JSX.Element;
}) {
  const error = <ErrorMessage errors={errors} name={name} />;

  return (
    <div className="flex flex-col gap-2">
      {input}
      {error.props.errors[error.props.name] && (
        <div className="flex items-center text-red-500">{error}</div>
      )}
    </div>
  );
}
