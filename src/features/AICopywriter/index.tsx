import React, { useState } from "react";
import { Button, Input, Spin, message } from "antd";
import MessageListView from "common/MessageListView";
import { generateKeys } from "@mtbird/core";
import { IExtensionFeatureProps } from "@mtbird/shared";
import { getMessage, sendMessage } from "services/ai";
import { IConversation, IMessage } from "types/message";
import PayModal from "common/PayModal";

import commonStyles from "../AIIllustrator/style.module.less";
import styles from "./style.module.less";

const AICopywriter = ({ context }: IExtensionFeatureProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const conversationId = generateKeys();
  const [conversation, setConversation] = useState<IConversation>({
    id: conversationId,
    messages: [],
  });
  const { onlineUserList } = context;
  const [msg, setMsg] = useState<string>("");
  const [typingMessage, setTypingMessage] = useState<string | undefined>("");

  const handleSend = async () => {
    if (!msg || msg.trim().length === 0)
      return message.error("请输入消息内容!");
    const parentMessageId =
      conversation.messages[conversation.messages.length - 1]?.messageId ||
      undefined;
    const messageMe = {
      content: msg,
      avatar: onlineUserList?.[0]?.avatar as string,
      from: "me",
      nickName: onlineUserList?.[0]?.nickname as string,
      messageId: generateKeys(),
      parentMessageId,
      conversationId,
    } as IMessage;

    try {
      setIsLoading(true);
      setConversation({
        ...conversation,
        messages: [...conversation.messages, messageMe],
      });

      setMsg("");

      const { data } = await sendMessage(
        context,
        msg,
        messageMe.messageId,
        parentMessageId
      );

      if (data.code === 40012) {
        message.error({
          title: "不要发敏感词～",
          icon: "error",
        });

        const newList = [...conversation.messages];
        newList.pop();
        setConversation({
          ...conversation,
          messages: newList,
        });
        return;
      }

      pullingMessage(data.data.id, messageMe);
    } catch (e) {
      if (e.response?.data?.msg === "AI使用次数超出限制，请充值") {
        setIsOpen(true);
      }
    }
    //  finally {
    //   setIsLoading(false);
    // }
  };

  const pullingMessage = async (id: string, messageMe: any) => {
    const { data } = await getMessage(context, id);

    setTypingMessage(data.data.content);
    if (typingMessage && typingMessage.length > 0) setIsLoading(false);

    if (!data.data) {
      setIsLoading(false);
      return message.error({
        title: "小星出错了～",
        icon: "error",
      });
    }

    if (!data.data.isFinish) {
      setTimeout(() => {
        pullingMessage(id, messageMe);
      }, 500);
    } else {
      const msgThem = {
        from: "them",
        content: data.data.content,
        messageId: data.data.id,
        conversationId: data.data.conversationId,
        nickName: "小星",
        avatar:
          "https://mtbird-cdn.staringos.com/product/images/staringai-logo.png",
        parentMessageId: data.data.parentMessageId,
      } as IMessage;

      setConversation({
        ...conversation,
        messages: [...conversation.messages, messageMe, msgThem],
      });
      setTypingMessage(undefined);
      setIsLoading(false);
    }
  };

  return (
    <div className={commonStyles.aiWrapper}>
      <div className={commonStyles.paramsPanel}>
        {/* <img src="https://mtbird-cdn.staringos.com/product/images/logo-copywriter-write.png" /> */}
        <div className={`${commonStyles.img} ${styles.logo}`} />
        <p className={commonStyles.secondTitle}>
          小星文案匠基于 ChatGPT
          模型，能够根据你的需求，生成符合你的文案需求的文案。
        </p>
        <div>
          <Input.TextArea
            placeholder="请输入 prompt"
            value={msg}
            onChange={(e: any) => setMsg(e.target.value)}
          />
          <Button size="small" type="primary" onClick={handleSend}>
            问问ChatGPT
          </Button>
        </div>
      </div>
      <div className={commonStyles.generatedPanel}>
        <MessageListView
          context={context}
          conversation={conversation}
          isShare={false}
          isLoading={isLoading}
          typingMessage={typingMessage}
        />
      </div>

      <PayModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default AICopywriter;
