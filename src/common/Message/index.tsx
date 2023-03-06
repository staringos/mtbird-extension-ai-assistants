import React from "react";
import { Avatar } from "antd";
import { IMessage } from "types/message";
import styles from "./style.module.less";

interface IProps {
  message: IMessage;
  isShare: boolean;
}

const Message = ({ message, isShare }: IProps) => {
  return (
    <div
      id={`m${message.messageId}`}
      className={styles.messageWrapper + " " + styles[message.from]}
    >
      {isShare ? (
        <Avatar
          className={styles.messageAvatar}
          image={
            message.from === "them"
              ? "https://mtbird-cdn.staringos.com/product/images/chatgpt.png"
              : message.avatar
          }
          circle
          size="small"
        />
      ) : (
        <Avatar
          className={styles.messageAvatar}
          src={
            message.from === "them"
              ? "https://mtbird-cdn.staringos.com/product/images/chatgpt.png"
              : message.avatar
          }
          openData={message.from === "them" ? {} : { type: "userAvatarUrl" }}
          circle
          size="small"
        />
      )}
      <div className={styles.messageRight}>
        {!isShare &&
          (message.from === "them" ? (
            <span className={styles.messageNickname}>ChatGPT</span>
          ) : (
            <span className={styles.messageNickname + " " + styles.right}>
              {message.nickName}
            </span>
          ))}
        <div className={styles.messageContentWrapper}>
          <div className={styles.messageContent}>
            <span>{message.content}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
