"use client";

import React from "react";
import Loading from "../loading";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  boxClassName?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>["className"];
  loading?: boolean;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  label,
  onFocus,
  onBlur,
  className,
  boxClassName,
  onChange,
  helper,
  loading,
  value: propsValue,
  setValue: propsSetValue,
  error,
  ...props
}: InputProps) => {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [tempValue, tempSetValue] = React.useState("");
  const [value, setValue] = [propsValue ?? tempValue, propsSetValue ?? tempSetValue];
  const inputRef = React.useRef<HTMLInputElement>(null);
  const disabled = React.useMemo(() => props.disabled || loading, [props.disabled, loading]);
  return (
    <div className={["flex flex-col items-start justify-center gap-2", boxClassName].join(" ")}>
      <div
        className={[
          "rounded-lg border overflow-hidden p-3 transition-all duration-300 relative w-full",
          inputFocus ? "border-blue-600" : error ? "border-red-500" : "border-gray-200 hover:border-gray-400",
          label ? (inputFocus ? "h-16" : "h-12") : "",
          disabled ? "cursor-not-allowed" : "cursor-text",
        ].join(" ")}
        onClick={() => {
          if (disabled) return;
          setInputFocus(true);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {disabled ? (
          <div className="absolute w-full h-full flex flex-row items-center justify-center -translate-x-3 -translate-y-3 bg-gray-400/30 cursor-not-allowed" />
        ) : null}
        {loading ? (
          <div className="absolute w-full h-full flex flex-row items-center justify-center -translate-x-3 -translate-y-3">
            <Loading size={24} />
          </div>
        ) : null}
        {label && (inputFocus || !value) ? (
          <p
            className={[
              "pointer-events-none transition-all duration-300 bg-transparent",
              error ? "text-red-400" : "text-gray-400",
              inputFocus ? "text-xs" : "text-base absolute",
            ].join(" ")}
          >
            {label}
          </p>
        ) : null}
        <input
          ref={inputRef}
          className={[
            "outline-none placeholder:text-gray-400 bg-transparent w-full",
            disabled ? "cursor-not-allowed" : "cursor-text",
            error ? "text-red-500" : "text-black",
            className,
          ].join(" ")}
          onChange={(e) => {
            setValue(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }}
          onFocus={(e) => {
            setInputFocus(true);
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            setInputFocus(false);
            if (onBlur) {
              onBlur(e);
            }
          }}
          value={value}
          disabled={disabled}
          {...props}
        />
      </div>
      {helper ? <p className="text-gray-400 text-sm pl-2 pb-1">{helper}</p> : null}
      {error ? <p className="text-red-500 text-sm pl-2 pb-1">{error}</p> : null}
    </div>
  );
};

export default Input;
