import type { ComponentPropsWithoutRef } from "react";
import { FormLabel } from "~/components/FormLabel";

type InputType = "text" | "number" | "email" | "password";

interface FormInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  name: string;
  type?: InputType;
  className?: string;
}

export const FormInput = ({
  name,
  type,
  label,
  className,
  ...rest
}: FormInputProps) => {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <FormLabel name={name} label={label} />
      <input
        type={type ?? "text"}
        name={name}
        className="w-full rounded-full border border-black/50 px-4 py-2"
        {...rest}
      />
    </div>
  );
};
