import Link from "next/link";
import { ChevronRight } from "~/components/Icons";

interface LinkProps {
  href: string;
  children: string;
}

export const GoTo = ({ href, children }: LinkProps) => {
  return (
    <Link
      href={href}
      className="decoration-wavy decoration-1 underline-offset-4 hover:underline"
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
