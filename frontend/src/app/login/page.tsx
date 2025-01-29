"use client";

import { Button, Input } from "@frontend/components";
import instance from "@frontend/utils/instance";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { mutate } = useMutation({
    mutationKey: ["login", email, password],
    mutationFn: async () => {
      const { data } = await instance.post("/auth/login", { username: email, password });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex flex-col w-full items-center justify-center h-full">
      <div className="max-w-96 w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-medium">내 사업체 키우기의 시작</p>
          <p className="text-5xl font-bold">KIUGI</p>
        </div>
        <div className="flex flex-col gap-2 h-64">
          <Input type="text" label="이메일" boxClassName="w-full" value={email} setValue={setEmail} />
          <Input type="password" label="비밀번호" boxClassName="w-full" value={password} setValue={setPassword} />
          <Button
            disabled={!email || !password}
            onClick={() => {
              mutate();
            }}
          />
          <div className="flex flex-row gap-1 items-center justify-end">
            <Link href="">
              <p className="text-sm text-gray-400 hover:text-gray-600 transition-colors">회원가입</p>
            </Link>
            <p className="text-sm text-gray-400 hover:text-gray-600 transition-colors">·</p>
            <Link href="">
              <p className="text-sm text-gray-400 hover:text-gray-600 transition-colors">비밀번호 찾기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
