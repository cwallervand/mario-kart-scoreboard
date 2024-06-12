import { FormLabel } from "~/components/FormLabel";

interface FormSelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  className?: string;
}

export const FormSelect = ({
  label,
  name,
  options,
  className,
}: FormSelectProps) => {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <FormLabel name={name} label={label} />

      <select
        name={name}
        className="w-full rounded-full border border-black/50 px-4 py-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
