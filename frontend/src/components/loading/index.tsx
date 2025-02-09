import React from "react";
import Spinner from "./spinner";

const Loading = ({
  isLoading,
  size = 16,
  children,
}: {
  isLoading?: boolean;
  size?: number;
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute flex flex-row items-center justify-center bg-gray-400/70 cursor-not-allowed w-full h-full">
          <Spinner size={size} />
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Loading;
export { Spinner };
