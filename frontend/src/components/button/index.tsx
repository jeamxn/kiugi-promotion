import React from "react";
import { Spinner } from "../loading";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  error?: string;
  success?: string;
}

const Button = ({ className, loading, children, error, success, ...props }: ButtonProps) => {
  const disabled = React.useMemo(() => props.disabled || loading, [props.disabled, loading]);
  return (
    <div className={[className, "flex flex-col items-start justify-start gap-2"].join(" ")}>
      <button
        className={["bg-teal-400 p-3 rounded-lg relative overflow-hidden w-full"].join(" ")}
        {...props}
        disabled={disabled}
      >
        {disabled ? (
          <div className="absolute w-full h-full flex flex-row items-center justify-center -translate-x-3 -translate-y-3 bg-gray-400/70 cursor-not-allowed" />
        ) : null}
        {loading ? (
          <div className="absolute w-full h-full flex flex-row items-center justify-center -translate-x-3 -translate-y-3">
            <Spinner size={24} />
          </div>
        ) : null}
        {children}
      </button>
      {error ? <p className="text-red-500 text-sm pl-2 pb-1">{error}</p> : null}
      {success ? <p className="text-teal-400 text-sm pl-2 pb-1">{success}</p> : null}
    </div>
  );
};

export default Button;
