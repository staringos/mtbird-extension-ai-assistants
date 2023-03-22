import React from "react";
import { Avatar, Tooltip } from "antd";
import { IMessage } from "types/message";
import styles from "./style.module.less";
import { IExtensionContext } from "@mtbird/shared/dist/types";
import { COMPONENT } from "@mtbird/core";

interface IProps {
  message: IMessage;
  isShare: boolean;
  context: IExtensionContext;
  isTyping?: boolean;
}

const Message = ({ context, message, isShare, isTyping }: IProps) => {
  const handleAddComponent = () => {
    context.addComponent({
      type: "component",
      componentName: "Text",
      props: {
        style: {
          ...COMPONENT.COMPONENT_DEFAULT_STYLE,
          height: 100,
          width: 200,
        },
      },
      children: `<p>${message.content}</p>`,
    });
  };

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
            <span className={styles.messageNickname}>ChatGPT </span>
          ) : (
            <span className={styles.messageNickname + " " + styles.right}>
              {message.nickName}
            </span>
          ))}
        <div className={styles.messageContentWrapper}>
          <div className={styles.messageContent}>
            <span>{message.content}</span>
            {isTyping && <div className={styles.cursor}></div>}
          </div>
          {message.from === "them" && (
            <Tooltip placement="top" title="添加为文本组件">
              <i
                className={`mtbird-icon mtbird-plus-circle ${styles.addBtn}`}
                onClick={handleAddComponent}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
