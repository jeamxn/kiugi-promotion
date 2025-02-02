"use client";

import useAuth from "@frontend/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Icons from "../icons";
import urls, { GroupsPaths } from "./urls";

const Title = () => {
  const pathname = usePathname();
  const url = React.useMemo(() => {
    return urls[pathname as GroupsPaths];
  }, [pathname]);

  const { logout } = useAuth();

  return url && url.header ? (
    <>
      <div className="w-full flex flex-row gap-4 items-center justify-center py-3 px-6 fixed backdrop-blur z-50">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Icons.Logo size={24} fill="#000" />
          <p className="font-bold text-2xl">키우기</p>
        </Link>
        <div className="w-full border-b-2 border-gray-300" />
        {url.header.auth ? <button onClick={() => logout.mutate()}>로그아웃</button> : null}
      </div>
      {url.header.noPadding ? null : <div className="h-14" />}
    </>
  ) : null;
};

export default Title;
