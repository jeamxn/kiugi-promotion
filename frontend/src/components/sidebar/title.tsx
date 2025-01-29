"use client";

import { usePathname } from "next/navigation";
import React from "react";
import urls from "./urls";

const Title = () => {
  const pathname = usePathname();
  const url = React.useMemo(() => {
    return urls[pathname];
  }, [pathname]);
  return url ? (
    <div className="w-full flex flex-row gap-4 items-center justify-center py-3 px-6 fixed backdrop-blur z-50">
      <p className="font-medium text-2xl">{url.title}</p>
      <div className="w-full border-b-2 border-gray-300" />
    </div>
  ) : null;
};

export default Title;
