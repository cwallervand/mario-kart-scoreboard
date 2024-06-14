import { Heading } from "~/components/Heading";

interface MainProps {
  children: React.ReactNode;
  heading?: string;
}

export const Main = ({ children, heading }: MainProps) => (
  <main className="flex w-full flex-col items-center">
    {heading && <Heading level={1}>{heading}</Heading>}
    {children}
  </main>
);
