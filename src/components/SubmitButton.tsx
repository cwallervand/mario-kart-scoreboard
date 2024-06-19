"use client";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

interface SubmitButtonProps {
  className?: string;
}

export const SubmitButton = ({ className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const clsxClassName = clsx(
    `rounded-full  px-5 py-2 text-white ${className}`,
    {
      "border-green-900/50 bg-green-900/50": pending,
      "border-green-900 bg-green-900": !pending,
    },
  );
  return (
    <button type="submit" disabled={pending} className={clsxClassName}>
      Let&apos;s go!
    </button>
  );
};
