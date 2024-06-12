type InputType = "text" | "number" | "email" | "password";

interface FormInputProps {
  label: string;
  name: string;
  type?: InputType;
  className?: string;
}

export const FormInput = ({ name, type, label, className }: FormInputProps) => {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type ?? "text"}
        name={name}
        className="border-1 w-full rounded-full border border-black px-4 py-2"
      />
    </div>
  );
};
