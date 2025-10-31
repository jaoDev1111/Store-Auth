interface BaseInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const BaseInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: BaseInputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </>
  );
};
