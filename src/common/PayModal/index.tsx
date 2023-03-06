import React, { Dispatch, SetStateAction } from "react";
import { Modal, Card, Typography } from "antd";
import styles from "./style.module.less";
import PriceList from "./components/PriceList";

const { Title, Text } = Typography;

interface IProps {
  onClose: (() => void) | any;
  isOpen: boolean;
}

const STARINGAI_PRICES = [
  {
    title: "小星AI插画师",
    desc: "基于 StableDiffusion 模型，经过我们的调优，可以更方便的帮助您生成各种风格的插画",
    prices: [
      {
        title: "免费套餐",
        desc: "新用户赠送",
        price: 0,
        unit: "张",
        count: 10,
      },
      {
        title: "A套餐",
        desc: "入门版套餐",
        price: 9.9,
        unit: "张",
        count: 10,
        pre: 0.99,
      },
      {
        title: "B套餐",
        desc: "专业版套餐",
        price: 59.9,
        unit: "张",
        count: 100,
        pre: 0.599,
      },
      {
        title: "C套餐",
        desc: "团队版套餐",
        price: 98.8,
        unit: "张",
        count: 500,
        pre: 0.1976,
      },
      {
        title: "推广套餐",
        desc: "转发到社交媒体",
        price: 0,
        unit: "张",
        count: 10,
      },
    ],
  },
  {
    title: "小星AI文案匠",
    desc: "基于 gpt-3.5-turbo 模型，经过我们的调优，更方便的为您构思页面文案，一键应用到页面",
    prices: [
      {
        title: "免费套餐",
        desc: "新用户赠送",
        price: 0,
        unit: "条",
        count: 10,
      },
      {
        title: "A套餐",
        desc: "入门版套餐",
        price: 9.9,
        unit: "条",
        count: 100,
        pre: 0.099,
      },
      {
        title: "B套餐",
        desc: "专业版套餐",
        price: 59.9,
        unit: "条",
        count: 1000,
        pre: 0.0599,
      },
      {
        title: "C套餐",
        desc: "团队版套餐",
        price: 98.8,
        unit: "条",
        count: 5000,
        pre: 0.01976,
      },
      {
        title: "推广套餐",
        desc: "转发到社交媒体",
        price: 0,
        unit: "条",
        count: 10,
      },
    ],
  },
];

const PayModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal
      title="您的用量不足，请充值"
      width="80%"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        <Title level={3}>StaringAI价格表</Title>
        {STARINGAI_PRICES.map(({ title, prices, desc }) => {
          return <PriceList desc={desc} title={title} prices={prices} />;
        })}
      </div>
      <p>请微信联系客服充值.</p>
      <img src="/statics/images/ew-qrcode.jpeg" width="150px" />
    </Modal>
  );
};

export default PayModal;
