import { argv } from "process";

export const parseUserNameFromArgs = () => {
  const [first, ..._rest] = argv.slice(2);
  let userName = null;
  if (/^--username=/.test(first)) {
    console.log("args", first);
    const [_key, value] = first.split("=");
    userName = value;
  }

  return userName;
};
