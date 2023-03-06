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
}

const MessageListView = ({ context, conversation }: IProps) => {
  const curConv = conversation as IConversation;

  return (
    <div className={styles.messageListWrapper}>
      <div className={styles.messageListContainer}>
        {curConv?.messages.map((cur: IMessage, i: number) => {
          return (
            <Message context={context} message={cur} isShare={false} key={i} />
          );
        })}
      </div>
    </div>
  );
};

export default MessageListView;
