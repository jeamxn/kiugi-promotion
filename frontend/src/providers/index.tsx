"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Provider;
