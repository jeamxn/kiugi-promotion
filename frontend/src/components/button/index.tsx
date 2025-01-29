import React from "react";
import Loading from "../loading";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  textClassName?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>["className"];
}

const Button = ({ className, loading, textClassName, ...props }: ButtonProps) => {
  const disabled = React.useMemo(() => props.disabled || loading, [props.disabled, loading]);
  return (
    <button
      className={["bg-blue-600 p-3 rounded-lg relative overflow-hidden", className].join(" ")}
      {...props}
      disabled={disabled}
    >
      {disabled ? (
        <div className="absolute w-full h-full flex flex-row items-center justify-center -translate-x-3 -translate-y-3 bg-gray-400/70 cursor-not-allowed" />
      ) : null}
      {loading ? (
        <div className="absolute w-full h-full flex flex-row items-center justify-center -translate-x-3 -translate-y-3">
          <Loading size={24} />
        </div>
      ) : null}
      <p className={["text-white", textClassName].join(" ")}>로그인하기</p>
    </button>
  );
};

export default Button;
