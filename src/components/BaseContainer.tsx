import clsx from "clsx";
import type { HTMLAttributes } from "react";

type ContainerProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  alignContent?: "start" | "center" | "end" | "between" | "around";
  direction?: "row" | "col";
  fullWidth?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const BaseContainer = ({
  className,
  children,
  size = "lg",
  fullWidth = false, // Se true, ocupa 100% da largura disponível
  alignContent = "start",
  direction = "row",
  ...props
}: ContainerProps) => {
  const sizeClasses = {
    sm: "max-w-screen-sm", // 640px
    md: "max-w-screen-md", // 768px
    lg: "max-w-screen-lg", // 1024px
    xl: "max-w-screen-xl", // 1280px
  };

  const alignClasses = {
    start: "justify-start items-start",
    center: "justify-center items-center",
    end: "justify-end items-end",
    between: "justify-between items-center",
    around: "justify-around items-center",
  };

  return (
    <div
      className={clsx(
        "flex mx-auto w-full",
        direction ? "flex-col" : "container",
        direction === "col" ? "flex-col" : "flex-row",
        fullWidth ? "w-full" : sizeClasses[size],
        alignClasses[alignContent],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
