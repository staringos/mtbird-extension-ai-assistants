import type { RcFile } from "antd/es/upload/interface";

export const getBase64 = (img: RcFile) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
};
