"use client";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  const className = clsx("rounded-full  px-5 py-2 text-white", {
    "border-green-900/50 bg-green-900/50": pending,
    "border-green-900 bg-green-900": !pending,
  });
  return (
    <button type="submit" disabled={pending} className={className}>
      Let&apos;s go!
    </button>
  );
};
