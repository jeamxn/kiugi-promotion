"use client";

import { Button, Input } from "@frontend/components";
import useError from "@frontend/hooks/useError";
import instance from "@frontend/utils/instance";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import Terms from "./terms";

const Signin = () => {
  const { error, currentError } = useError();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [terms, setTerms] = React.useState<boolean[]>(Array(3).fill(false));
  const [optionalTerms, setOptionalTerms] = React.useState<boolean[]>(Array(1).fill(false));
  const [success, setSuccess] = React.useState(false);

  const signin = useMutation({
    mutationKey: ["signin", email, password, optionalTerms],
    mutationFn: async () => {
      const { data } = await instance.post("/auth/signin", {
        username: email,
        password: password,
      });
      return data;
    },
    onSuccess: () => {
      setSuccess(true);
    },
  });

  React.useEffect(() => {
    console.log("currentError", currentError);
  }, [currentError]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-8 pt-4 w-full max-w-[500px]">
        <div className="flex flex-col gap-4">
          <p className="font-medium px-2">필수 입력 정보</p>
          <div className="flex flex-col gap-2 min-h-48 -mb-4">
            <Input
              type="text"
              label="이메일"
              boxClassName="w-full"
              value={email}
              setValue={setEmail}
              error={error.USER_NOT_FOUND}
              disabled={signin.isPending}
            />
            <Input
              type="password"
              label="비밀번호"
              boxClassName="w-full"
              value={password}
              setValue={setPassword}
              error={error.INVALID_PASSWORD}
              disabled={signin.isPending}
            />
            <Input
              type="password"
              label="비밀번호 확인"
              boxClassName="w-full"
              value={passwordConfirm}
              setValue={setPasswordConfirm}
              error={password !== passwordConfirm ? "비밀번호를 확인해주세요." : undefined}
              disabled={signin.isPending}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="font-medium px-2">필수 약관 동의하기</p>
          {["이용약관", "개인정보 처리방침"].map((title, index) => (
            <Terms
              key={index}
              title={title}
              checked={terms[index]}
              setChecked={(checked: boolean) => {
                setTerms((prev) => prev.map((_, i) => (i === index ? checked : prev[i])));
              }}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="font-medium px-2">선택 약관 동의하기</p>
          {["마케팅 정보 수신 동의 (선택)"].map((title, index) => (
            <Terms
              key={index}
              title={title}
              checked={optionalTerms[index]}
              setChecked={(checked: boolean) => {
                setOptionalTerms((prev) => prev.map((_, i) => (i === index ? checked : prev[i])));
              }}
            />
          ))}
        </div>
        <Button
          className="w-full"
          disabled={!email || !password}
          onClick={() => {
            setTerms((prev) => prev.map(() => true));
            signin.mutate();
          }}
          loading={signin.isPending}
          success={success ? "회원가입이 완료되었습니다." : undefined}
          error={currentError}
        >
          <p className="text-white">필수 약관 동의하고 회원가입하기</p>
        </Button>
      </div>
    </div>
  );
};

export default Signin;
