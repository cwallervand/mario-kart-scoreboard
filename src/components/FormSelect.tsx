interface FormSelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = ({ label, name, options }: FormSelectProps) => {
  return (
    <div className="flex w-full flex-row">
      <label htmlFor={name}>{label}</label>
      <select name={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
