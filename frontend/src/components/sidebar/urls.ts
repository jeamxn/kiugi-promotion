interface Url {
  title: string;
  menubar?: boolean;
  header?:
    | false
    | {
        auth?: boolean;
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
  "/login": {
    title: "로그인",
    menubar: false,
    header: {},
  },
};

export default urls;
