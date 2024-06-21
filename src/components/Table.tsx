interface TableHeadProps {
  thNames: string[];
}
export const Thead = ({ thNames }: TableHeadProps) => {
  return (
    <thead>
      <tr className="text-stroke text-stroke-width-1 h-12 align-top font-mario md:text-xl">
        {thNames.map((thName, index) => (
          <Th
            key={`th-${index}-${thName}`}
            className={index === 0 ? "text-left" : "text-right"}
          >
            {thName}
          </Th>
        ))}
      </tr>
    </thead>
  );
};

const Th = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <th className={`underline-wavy decoration-1 ${className}`}>{children}</th>
);

export const Tr = ({ children }: { children: React.ReactNode }) => (
  <tr className="h-9">{children}</tr>
);
