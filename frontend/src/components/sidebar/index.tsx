"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Title from "./title";
import urls, { groups, GroupsPaths } from "./urls";

const Sidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const url = React.useMemo(() => {
    return urls[pathname as GroupsPaths];
  }, [pathname]);

  return (
    <div className="w-full h-full ">
      <Title />
      <div className="w-full h-full flex flex-row items-start justify-start gap-4 px-6">
        {url.menubar ? (
          <div className="flex flex-col gap-4 w-44">
            {Object.entries(groups).map(([key, value]) => {
              return (
                <div key={key} className="flex flex-col gap-2">
                  <p className="font-medium text-gray-400 text-sm whitespace-nowrap">{key}</p>
                  <div className="flex flex-col gap-2">
                    {value.map((v) => {
                      const _this = urls[v];
                      return (
                        <Link key={`${key}-${v}`} href={v} prefetch>
                          <p
                            className={[
                              "font-medium whitespace-nowrap transition-colors duration-300",
                              v === pathname ? "text-teal-400" : "text-black",
                            ].join(" ")}
                          >
                            {_this.title}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
