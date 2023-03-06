import React from "react";
import { Card, Typography } from "antd";
import styles from "./style.module.less";

const { Title, Text } = Typography;

interface IProps {
  title: string;
  prices: any[];
  desc: string;
}

const PriceList = ({ title, desc, prices }: IProps) => {
  return (
    <div>
      <Title level={4}>{title}</Title>
      <Text>{desc}</Text>
      <div className={styles.priceList}>
        {prices.map((cur) => {
          return (
            <Card className={styles.priceCard}>
              <Title level={5}>{cur.title}</Title>
              {cur.desc && <p>{cur.desc}</p>}
              <p>
                金额: ¥<span className={styles.price}>{cur.price}</span>
              </p>
              {cur.pre && <p>预计: {`${cur.pre}/${cur.unit}`}</p>}
              <p>调用次数: {cur.count}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PriceList;
