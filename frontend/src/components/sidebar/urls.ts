interface Url {
  title: string;
  menubar?: boolean;
  header?:
    | false
    | {
        auth?: boolean;
        noPadding?: boolean;
      };
}

export const groups = {
  홈: ["/", "/playground"],
  인증: ["/auth/login", "/auth/signin"],
} as const;

export type GroupsPaths = (typeof groups)[keyof typeof groups][number];
export type Urls = {
  [key in GroupsPaths]: Url;
};

const urls: Urls = {
  "/": {
    title: "Home",
    menubar: true,
    header: {
      auth: true,
    },
  },
  "/playground": {
    title: "채팅 테스트",
    menubar: true,
    header: {
      auth: true,
    },
  },
  "/auth/login": {
    title: "로그인",
    menubar: false,
    header: {
      noPadding: true,
    },
  },
  "/auth/signin": {
    title: "회원가입",
    menubar: false,
    header: {},
  },
};

export default urls;
