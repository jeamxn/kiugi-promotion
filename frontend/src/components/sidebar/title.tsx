"use client";

import useAuth from "@frontend/hooks/useAuth";
import { usePathname } from "next/navigation";
import React from "react";
import urls from "./urls";

const Title = () => {
  const pathname = usePathname();
  const url = React.useMemo(() => {
    return urls[pathname];
  }, [pathname]);

  const { logout, me } = useAuth();

  return url && url.header ? (
    <div className="w-full flex flex-row gap-4 items-center justify-center py-3 px-6 fixed backdrop-blur z-50">
      <p className="font-medium text-2xl">{url.title}</p>
      <div className="w-full border-b-2 border-gray-300" />
      {url.header.auth ? <button onClick={() => logout.mutate()}>로그아웃 {me?.username}</button> : null}
    </div>
  ) : null;
};

export default Title;
