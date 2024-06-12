import Link from "next/link";
import { ChevronRight } from "~/components/Icons";

interface LinkProps {
  href: string;
  children: string;
}

export const GoTo = ({ href, children }: LinkProps) => {
  return (
    <Link href={href}>
      <div className="flex items-center">
        <span>{children}</span>
        <span>
          <ChevronRight />
        </span>
      </div>
    </Link>
  );
};
