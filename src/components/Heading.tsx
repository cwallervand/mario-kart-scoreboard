import clsx from "clsx";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  level: HeadingLevel;
  children: React.ReactNode;
};

const getHeadingTag = (level: number) => {
  switch (level) {
    case 1:
      return "h1";
    case 2:
      return "h2";
    case 3:
      return "h3";
    case 4:
      return "h4";
    case 5:
      return "h5";
    case 6:
      return "h6";
    default:
      return "h1";
  }
};

export const Heading = ({ level, children }: HeadingProps) => {
  const classes = clsx("text-stroke text-stroke underline-wavy font-mario", {
    "text-3xl mb-10 text-stroke-width-2 decoration-2 hidden md:block":
      level === 1,
    "text-2xl mb-8 text-stroke-width-1 decoration-1": level === 2,
    "text-xl": level === 3,
    "text-lg": level === 4,
    "text-base": level === 5,
    "text-sm": level === 6,
  });
  const headingTag = getHeadingTag(level);
  const HeadingComponent = headingTag;

  return <HeadingComponent className={classes}>{children}</HeadingComponent>;
};
