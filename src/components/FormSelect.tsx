import { forwardRef } from "react";
import { FormLabel } from "~/components/FormLabel";

interface FormSelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
  hasEmptyDefaultOption?: boolean;
  className?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      name,
      options,
      defaultValue,
      hasEmptyDefaultOption = false,
      className,
    }: FormSelectProps,
    ref,
  ) => {
    return (
      <div className={`flex w-full flex-col ${className}`}>
        <FormLabel name={name} label={label} />

        <select
          name={name}
          className="w-full rounded-full border border-black/50 px-4 py-2"
          defaultValue={defaultValue}
          ref={ref}
        >
          {hasEmptyDefaultOption && <option value="">--- Select ---</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";
