interface FormLabelProps {
  name: string;
  label: string;
}

export const FormLabel = ({ name, label }: FormLabelProps) => (
  <label htmlFor={name} className="mb-1 font-semibold">
    {label}
  </label>
);
