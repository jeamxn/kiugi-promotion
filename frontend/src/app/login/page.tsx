"use client";

import { ERROR_RESPONSE } from "@backend/utils/error";
import { Button, Input } from "@frontend/components";
import instance from "@frontend/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [USER_NOT_FOUND, setUSER_NOT_FOUND] = React.useState(false);
  const [INVALID_PASSWORD, setINVALID_PASSWORD] = React.useState(false);

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login", email, password],
    mutationFn: async () => {
      const { data } = await instance.post("/auth/login", { username: email, password });
      router.prefetch("/");
      return data;
    },
    onMutate: () => {
      setUSER_NOT_FOUND(false);
      setINVALID_PASSWORD(false);
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: AxiosError<ERROR_RESPONSE>) => {
      if (!error.response) return;
      const { code } = error.response.data;
      switch (code) {
        case "USER_NOT_FOUND":
          setUSER_NOT_FOUND(true);
          break;
        case "INVALID_PASSWORD":
          setINVALID_PASSWORD(true);
          break;
      }
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
          <Input
            type="text"
            label="이메일"
            boxClassName="w-full"
            value={email}
            setValue={setEmail}
            error={USER_NOT_FOUND ? "가입되지 않은 이메일입니다." : undefined}
            disabled={isPending}
          />
          <Input
            type="password"
            label="비밀번호"
            boxClassName="w-full"
            value={password}
            setValue={setPassword}
            error={INVALID_PASSWORD ? "잘못된 비밀번호입니다." : undefined}
            disabled={isPending}
          />
          <Button
            disabled={!email || !password}
            onClick={() => {
              login();
            }}
            loading={isPending}
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
