import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { BaseButton } from "./BaseButton";

import { EyeIcon, EyeOffIcon } from "lucide-react";

type BaseInputProps = {
  className?: string;
  label?: string;
  labelFor: string;
  type?: string;
  placeholder?: string;
  value: string;
  requiredLabel?: boolean;
  onChange: (value: string) => void;
  onTogglePassword?: () => void;
  passwordToggleVisible?: boolean; // habilita o toggle de senha
  isPasswordVisible?: boolean; // indica se o password está visível
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const BaseInput = ({
  className = "",
  label,
  requiredLabel = false,
  type = "text",
  placeholder,
  value,
  passwordToggleVisible,
  isPasswordVisible = false,
  labelFor,
  onChange,
  onTogglePassword,
  ...props
}: BaseInputProps) => {
  return (
    <div className="flex flex-col gap-3 relative w-full">
      {label && (
        <label
          htmlFor={labelFor}
          className="mt-3 text-xs md:text-sm font-semibold text-zinc-500"
        >
          {label}{" "}
          <span className="text-red-500 text-sm font-bold">
            {requiredLabel && "*"}
          </span>
        </label>
      )}

      {/* Campo de input */}
      <input
        className={clsx(
          "py-1 px-3 md:py-2 md:px-4 border border-zinc-300 rounded-md w-full placeholder:text-zinc-400 focus:outline-0 focus:border-blue-500 placeholder:text-sm md:placeholder:text-base",
          className
        )}
        required
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        {...props}
      />

      {passwordToggleVisible && (
        <BaseButton
          type="button"
          size="icon"
          variant="ghost"
          onClick={onTogglePassword}
          className="absolute right-2 top-[77%] md:top-[75%] -translate-y-1/2 text-zinc-400 hover:text-zinc-500 focus:outline-none"
        >
          {isPasswordVisible ? (
            <EyeIcon className="h-5 md:h-22" strokeWidth={1} />
          ) : (
            <EyeOffIcon className="h-5 md:h-22" strokeWidth={1} />
          )}
        </BaseButton>
      )}
    </div>
  );
};
