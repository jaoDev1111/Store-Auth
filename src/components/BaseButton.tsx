import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "icon";
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button
 * Renderiza um botão estilizado com variantes e tamanhos pré-definidos.
 */
export const BaseButton = ({
  children,
  className = "",
  disabled = false,
  size = "sm",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "text-sm cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Variantes
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400":
            variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
            variant === "destructive",
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-400":
            variant === "outline",
          "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400":
            variant === "ghost",

          // Tamanhos
          "px-3 py-1 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
          "size-8": size === "icon",

          // Disabled
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
