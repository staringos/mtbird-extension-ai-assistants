import React, { useState } from "react";
import { Button, Input, Radio } from "antd";
import commonStyles from "../AIIllustrator/style.module.less";

const AICopywriter = () => {
  const [imageList, setImageList] = useState<string[]>([]);
  return (
    <div className={commonStyles.aiWrapper}>
      <div className={commonStyles.paramsPanel}>
        <img src="https://mtbird-cdn.staringos.com/product/images/logo-copywriter-write.png" />
        <div>
          <Input.TextArea placeholder="请输入 prompt" />
          <Button size="small" type="primary">
            生成
          </Button>
        </div>
      </div>
      <div className={commonStyles.generatedPanel}>
        {/* {imageList.map((cur) => {
          return <Card cover={<img alt="example" src={cur} />} />;
        })} */}
      </div>
    </div>
  );
};

export default AICopywriter;
