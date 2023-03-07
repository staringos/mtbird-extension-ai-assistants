import React, { useEffect, useState } from "react";
import { Button, Input, Card, message, Spin, Radio, Space, Upload } from "antd";
import { generateImage } from "services/ai";
import { IExtensionFeatureProps } from "@mtbird/shared";
import { SchemaInput } from "@mtbird/ui";
import styles from "./style.module.less";
import { dataURItoBlob } from "@mtbird/core";
import isNumber from "lodash/isNumber";
import { getBase64 } from "utils";
import PayModal from "common/PayModal";

const mock = [
  {
    url: "https://mtbird-cdn.staringos.com/product/images/illustration/photo-1584282617200-32f377e493ef.jpeg",
    disabled: true,
  },
  {
    url: "https://mtbird-cdn.staringos.com/product/images/illustration/%E6%88%AA%E5%B1%8F2023-03-03%20%E4%B8%8A%E5%8D%8810.47.54.png",
    disabled: true,
  },
];

interface IImage {
  url: string;
}

const AIIllustrator = ({ context }: IExtensionFeatureProps) => {
  const [imageList, setImageList] = useState<IImage[]>(mock);
  const [prompt, setPrompt] = useState<string>(
    "Snow-capped Mount Fuji, small villages by the sea, cherry trees with falling petals and green grass with strong colors. It seems that this will be another typical Japanese animation with a warm style"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("text");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [fileList, setFileList] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const firstComponent = context.currentComponent[0];
    if (firstComponent && firstComponent.componentName === "Image") {
      setWidth(firstComponent.props.style.width || 512);
      setHeight(firstComponent.props.style.height || 512);
    }
  }, [context.currentComponent]);

  const handleClick = async () => {
    if (!prompt || prompt.length <= 0) return message.error("请输入 Prompt");

    let image: string | undefined = undefined;

    if (mode === "image") {
      const imageFile = fileList[0];

      console.log("imageFile.size123:", imageFile.size);

      if (imageFile.size > 1024 * 1024 * 1.5) {
        return message.error(
          "上传文件大小不能超过1.5M，请压缩后上传，压缩图片大小不会影响生成图片效果哦！"
        );
      }
      image = await getBase64(imageFile);
    }

    setIsLoading(true);
    try {
      const res = await generateImage(
        context,
        prompt,
        width,
        height,
        mode,
        image
      );

      setImageList(
        res.data.data.images.map((cur: string) => {
          return {
            url: `data:image/png;base64,${cur}`,
          };
        })
      );
    } catch (e) {
      if (e?.response?.data?.msg === "AI使用次数超出限制，请充值") {
        setIsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async (data: any) => {
    const { url, disabled } = data;

    if (disabled)
      return message.error("默认图片不可添加，请输入 prompt 生成哦～");

    setIsLoading(true);

    try {
      const res = await context.onUpload([dataURItoBlob(url)]);
      const currentFirstComponent = context.currentComponent[0];

      if (currentFirstComponent.componentName === "Image") {
        context.onChangeValue("props.src", res[0]);
      } else {
        context.addComponent({
          type: "component",
          componentName: "Image",
          props: {
            src: res[0],
            style: {
              x: 10,
              y: 10,
              position: "absolute",
              width: 200,
              height: 200,
            },
          },
          children: [],
        });
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (e: any) => {
    setMode(e.target.value);
  };

  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const handlePayClose = () => {
    setIsOpen(false);
  };

  return (
    <Spin spinning={isLoading} tip="小星正在努力生成插画，不要离开哦～">
      <PayModal isOpen={isOpen} onClose={handlePayClose} />
      <div className={styles.aiWrapper}>
        <div className={styles.paramsPanel}>
          <div className={styles.img} />
          <Radio.Group
            onChange={handleModeChange}
            value={mode}
            size="small"
            style={{ marginBottom: "5px" }}
          >
            <Radio.Button size="small" value="text">
              文字生成
            </Radio.Button>
            <Radio.Button size="small" value="image">
              图片生成
            </Radio.Button>
          </Radio.Group>
          <div>
            <p className={styles.secondTitle}>
              跟小星说说，你想生成什么图片（小星是星搭AI插画机器人，生成图片可商用哦！～）
            </p>
            {mode === "text" ? (
              <Input.TextArea
                className={styles.textArea}
                placeholder="请输入 prompt"
                value={prompt}
                onChange={(e: any) => setPrompt(e.target.value)}
              />
            ) : (
              <Upload {...props} maxCount={1}>
                <Button
                  size="small"
                  icon={<i className="mtbird-icon mtbird-upload" />}
                >
                  选择图片
                </Button>
              </Upload>
            )}

            <Space>
              <SchemaInput
                placeholder="宽度"
                value={width}
                onChange={(e: any) => isNumber(new Number(e)) && setWidth(e)}
              />
              <span style={{ color: "var(--color-text-4)" }}>x</span>
              <SchemaInput
                placeholder="高度"
                value={height}
                onChange={(e: any) => isNumber(new Number(e)) && setHeight(e)}
              />
              <Button size="small" type="primary" onClick={handleClick}>
                生成
              </Button>
            </Space>
          </div>
        </div>
        <div className={styles.generatedPanel}>
          {imageList.map((cur: IImage) => {
            return (
              <Card
                className={styles.imageCard}
                cover={
                  <img
                    className={styles.imageCardImage}
                    alt="example"
                    src={cur.url}
                  />
                }
                onClick={() => handleAddImage(cur)}
              />
            );
          })}
        </div>
      </div>
    </Spin>
  );
};

export default AIIllustrator;
