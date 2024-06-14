import Link from "next/link";
import { ChevronRight } from "~/components/Icons";

interface LinkProps {
  href: string;
  children: string;
  className?: string;
}

export const GoTo = ({ href, children, className }: LinkProps) => {
  return (
    <Link
      href={href}
      className={`text-md py-2 font-bold decoration-wavy decoration-1 underline-offset-4 hover:underline ${className}`}
    >
      <div className="flex items-center">
        <span>{children}</span>
        <span>
          <ChevronRight />
        </span>
      </div>
    </Link>
  );
};
