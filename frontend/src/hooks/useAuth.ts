import { ERROR_RESPONSE } from "@common/error";
import { Me } from "@common/responses";
import instance from "@frontend/utils/instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import useError from "./useError";

interface Auth {
  login?: {
    email: string;
    password: string;
  };
}

const useAuth = (props?: Auth) => {
  const enabledQueries = React.useMemo(() => !props?.login, [props]);
  const router = useRouter();
  const { setError } = useError();

  const login = useMutation({
    mutationKey: ["login", props?.login?.email, props?.login?.password],
    mutationFn: async () => {
      const { data } = await instance.post("/auth/login", {
        username: props?.login?.email,
        password: props?.login?.password,
      });
      router.prefetch("/");
      return data;
    },
    onMutate: () => {
      setError("USER_NOT_FOUND", false);
      setError("INVALID_PASSWORD", false);
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: AxiosError<ERROR_RESPONSE>) => {
      if (!error.response) return;
      const { code } = error.response.data;
      setError(code, true);
    },
  });

  const logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const { data } = await instance.post("/auth/logout");
      return data;
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await instance.get<Me>("/auth/me");
      return data;
    },
    enabled: enabledQueries,
    refetchInterval: 1000 * 60,
  });

  return { login, logout, me };
};

export default useAuth;
