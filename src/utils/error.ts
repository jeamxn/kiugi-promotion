import { error as e } from "elysia";
import { ElysiaCustomStatusResponse } from "elysia/dist/error";

const err = {
  USER_ALREADY_EXISTS: [409, "이미 존재하는 사용자입니다."],
  USER_NOT_FOUND: [404, "사용자를 찾을 수 없습니다."],
  INVALID_TYPE_USERNAME: [400, "유효하지 않은 사용자 이름(username)입니다."],
  INVALID_TYPE_PASSWORD: [400, "유효하지 않은 비밀번호(password)입니다."],
  INVALID_PASSWORD: [401, "비밀번호가 일치하지 않습니다."],
};

export type ERROR = typeof err;
export type ERROR_KEY = keyof ERROR;

const error = Object.entries(err).reduce(
  (
    acc: {
      [key in ERROR_KEY]: ElysiaCustomStatusResponse<any, any>;
    },
    [key, [num, message]],
  ) => {
    acc[key as ERROR_KEY] = e(num as number, {
      code: key,
      message,
    });
    return acc;
  },
  {} as {
    [key in ERROR_KEY]: ElysiaCustomStatusResponse<any, any>;
  },
);

export default error;
