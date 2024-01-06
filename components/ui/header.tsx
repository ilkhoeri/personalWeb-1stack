import { twMerge } from "tailwind-merge";

export type ClassHeaderType = { wrap?: string; title?: string; desc?: string };

interface HeaderProps {
  title: string;
  description: string;
  className?: string;
  classNames?: ClassHeaderType;
}

const Header: React.FC<HeaderProps> = ({ title, description, className, classNames }) => {
  return (
    <div className={twMerge(className, classNames?.wrap)}>
      <h2 className={twMerge("text-2xl font-bold tracking-tight", classNames?.title)}>{title}</h2>
      <p className={twMerge("text-sm text-muted-foreground", classNames?.desc)}>{description}</p>
    </div>
  );
};

export default Header;
