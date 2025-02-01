"use client";

export const Input = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password";
}) => {
  return (
    <div>
      <div className="pt-2 pb-1 text-sm">
        * <label>{label}</label>
      </div>
      <input
        className="py-2 px-4 w-full rounded border border-black"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
