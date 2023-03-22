import React from "react";
import Message from "../Message";
import styles from "./style.module.less";
import { IConversation } from "@/types/message";
import { IMessage } from "types/message";
import { IExtensionContext } from "@mtbird/shared";

interface IProps {
  conversation: IConversation;
  isShare: boolean;
  context: IExtensionContext;
  typingMessage?: string;
  isLoading?: boolean;
}

const MessageListView = ({
  context,
  conversation,
  typingMessage,
  isLoading,
}: IProps) => {
  const curConv = conversation as IConversation;

  return (
    <div className={styles.messageListWrapper}>
      <div className={styles.messageListContainer}>
        {curConv?.messages.map((cur: IMessage, i: number) => {
          return (
            <Message context={context} message={cur} isShare={false} key={i} />
          );
        })}

        {isLoading && (
          <Message
            context={context}
            message={{
              content: "思考中，请稍等...",
              avatar: "",
              from: "them",
              nickName: "ChatGPT",
              messageId: "Loading",
              parentMessageId: "",
              conversationId: "",
            }}
            isShare={false}
            isTyping
          />
        )}

        {typingMessage && (
          <Message
            context={context}
            message={{
              content: typingMessage,
              avatar: "",
              from: "them",
              nickName: "ChatGPT",
              messageId: "Loading",
              parentMessageId: "",
              conversationId: "",
            }}
            isShare={false}
            isTyping
          />
        )}
      </div>
    </div>
  );
};

export default MessageListView;
