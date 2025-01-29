interface Url {
  title: string;
  menubar?: boolean;
}

const urls: {
  [key: string]: Url;
} = {
  "/": {
    title: "Home",
    menubar: true,
  },
  "/login": {
    title: "로그인",
    menubar: false,
  },
};

export default urls;
