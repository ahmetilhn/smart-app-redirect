type Params = {
  appStoreLink: string;
  playStoreLink: string;
  defaultLink: string;
  userAgent?: string;
  redirectFunction?: (url: string) => void;
};

export default Params;
