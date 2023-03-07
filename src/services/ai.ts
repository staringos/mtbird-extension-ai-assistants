import { IExtensionContext } from "@mtbird/shared";

export const sendMessage = (
  context: IExtensionContext,
  msg: string,
  messageId: string,
  parentMessageId?: string
) => {
  return context.request.get(`${process.env.API_URL}/ai/generator/chat`, {
    params: {
      parentMessageId,
      msg: `${msg} | Please don't add any note nor explanation to the response.`,
      messageId,
      teamId: context.storage.getItem("TSK"),
    },
    headers: {
      Authorization: "Bears " + context.storage.getItem("AUTH_TOKEN"),
    },
  });
};

export const fetchAndUpload = (context: IExtensionContext, url: string) => {
  return context.request.post(
    `${process.env.API_URL}/upload/fetch`,
    {
      url,
    },
    {
      headers: {
        Authorization: "Bears " + context.storage.getItem("AUTH_TOKEN"),
      },
    }
  );
};

export const generateImage = (
  context: IExtensionContext,
  prompt?: string,
  width: number,
  height: number,
  mode: string,
  image?: string
) => {
  const data = {
    width,
    height,
  } as Record<string, any>;

  if (mode === "image") {
    data.image = image;
  } else {
    data.prompt = prompt;
  }

  return context.request.post(
    `${process.env.API_URL}/ai/generator/image/${
      mode === "text" ? "txt2Img" : "img2Img"
    }?teamId=${context.storage.getItem("TSK")}`,
    data,
    {
      headers: {
        Authorization: "Bears " + context.storage.getItem("AUTH_TOKEN"),
      },
      timeout: 10 * 60 * 1000,
    }
  );
};
