"use client";

import { Button, Input } from "@frontend/components";
import useAuth from "@frontend/hooks/useAuth";
import useError from "@frontend/hooks/useError";
import Link from "next/link";
import React from "react";

const Login = () => {
  const { error } = useError();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = useAuth({
    login: {
      email,
      password,
    },
  });

  return (
    <div className="flex flex-col w-full items-center justify-center h-full">
      <div className="max-w-[500px] w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-medium">내 사업체 키우기의 시작</p>
          <p className="text-5xl font-bold">KIUGI</p>
        </div>
        <div className="flex flex-col gap-2 h-64">
          <Input
            type="text"
            label="이메일"
            boxClassName="w-full"
            value={email}
            setValue={setEmail}
            error={error.USER_NOT_FOUND}
            disabled={login.isPending}
          />
          <Input
            type="password"
            label="비밀번호"
            boxClassName="w-full"
            value={password}
            setValue={setPassword}
            error={error.INVALID_PASSWORD}
            disabled={login.isPending}
          />
          <Button
            disabled={!email || !password}
            onClick={() => {
              login.mutate();
            }}
            loading={login.isPending}
          >
            <p className="text-white">로그인하기</p>
          </Button>
          <div className="flex flex-row gap-1 items-center justify-end">
            <Link href="/auth/signin" prefetch>
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
