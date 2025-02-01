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

const urls: {
  [key: string]: Url;
} = {
  "/": {
    title: "Home",
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
