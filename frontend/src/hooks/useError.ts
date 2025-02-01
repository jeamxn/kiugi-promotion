"use client";

import { ERROR_KEY, ERROR_MESSAGE, ERROR_MESSAGES } from "@common/error";
import { atom, useAtom } from "jotai";
import React from "react";

type ERROR_STATE = {
  [key in ERROR_KEY]?: ERROR_MESSAGES;
};

const defualtError: ERROR_STATE = Object.fromEntries(
  Object.keys(ERROR_MESSAGE).map((key) => [key as ERROR_KEY, false as boolean]) as [ERROR_KEY, boolean][],
) as ERROR_STATE;

const errorAtom = atom<ERROR_STATE>(defualtError);
const currentErrorAtom = atom<string | undefined>(undefined);

const useError = () => {
  const [error, setErrorMessages] = useAtom(errorAtom);
  const [currentError, setCurrentError] = useAtom(currentErrorAtom);

  const setError = (key: ERROR_KEY, value: boolean) => {
    if (value) {
      setErrorMessages((prev) => {
        return { ...prev, [key]: ERROR_MESSAGE[key][1] };
      });
      setCurrentError(ERROR_MESSAGE[key][1]);
      console.log(ERROR_MESSAGE[key][1]);
    } else {
      setErrorMessages((prev) => {
        return { ...prev, [key]: undefined };
      });
      setCurrentError(undefined);
    }
  };
  const resetError = () => {
    setCurrentError(undefined);
    setErrorMessages(defualtError);
  };

  return { error, setError, resetError, currentError };
};

export default useError;
