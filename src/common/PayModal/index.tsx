import React from "react";
import { Modal } from "antd";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const PayModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal
      title="您的用量不足，请充值"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
    >
      <p>请微信联系客服充值.</p>
      <img src="/statics/images/ew-qrcode.jpeg" width="150px" />
    </Modal>
  );
};

export default PayModal;
