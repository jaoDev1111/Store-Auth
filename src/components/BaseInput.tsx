import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type BaseInputProps = {
  className?: string;
  label?: string;
  labelFor: string;
  type?: string;
  placeholder?: string;
  value: string;
  requiredLabel?: boolean;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const BaseInput = ({
  className = "",
  label,
  requiredLabel = false,
  type = "text",
  placeholder,
  value,
  labelFor,
  onChange,
  ...props
}: BaseInputProps) => {
  return (
    <>
      <label htmlFor={labelFor} className="mt-3 text-sm font-semibold">
        {label}{" "}
        <span className="text-red-500 text-sm font-bold">
          {requiredLabel && "*"}
        </span>
      </label>
      <input
        className={clsx(
          "py-2 px-4 border border-zinc-300 rounded-md w-full placeholder:text-zinc-400 focus:outline-0 focus:border-blue-500",
          className
        )}
        required
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        {...props}
      />
    </>
  );
};
