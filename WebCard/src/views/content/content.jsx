import { Form, Input, Button, Collapse, Radio } from "antd";
const { TextArea } = Input;
import Qrcode from "@/components/qrcode/qrcode";
import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "./content.scss";
import QrOptions from "@/components/qrcode/qrOptions";
import ContentOptions from "@/components/contentOptions/contentOptions";

function Content() {
  const qrRef = useRef(null);
  const qrFormRef = useRef(null);
  const conOptionsRef = useRef(null);
  const setCode = (val, name) => {
    qrRef.current?.setCode(name, val);
    setForm(val, name);
  };
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: "网站标题",
    description: "网站描述",
  });

  useEffect(() => {
    let _formData = { ...formData, ...qrRef.current.getData() };
    setFormData(_formData);
  }, []);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData]); // formData 变化时同步表单值
  function generateImg() {
    const element = document.getElementById("generate_card"); // 目标元素
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL("image/png"); // 将 canvas 转换为图片
      const link = document.createElement("a");
      link.href = image;
      link.download = "screenshot.png"; // 设置下载的文件名
      link.click(); // 触发下载
    });
  }
  function setForm(val, name) {
    setFormData((preData) => {
      return {
        ...preData,
        [name]: val,
      };
    });
  }
  //卡片颜色
  const [cardColor, setCardColor] = useState({
    backgroundColor: "#FFFFFF",
    color: "#333",
  });
  function onCardColorChange(color) {
    setCardColor(color);
  }

  const colList = [
    {
      key: "1",
      label: "二维码配置",
      children: (
        <QrOptions
          ref={qrFormRef}
          onQrFormDataChange={handleQrFormDataChange}
          onColorChange={onColorChange}
        />
      ),
    },
    {
      key: "2",
      label: "卡片配置",
      children: (
        <ContentOptions ref={conOptionsRef} onColorChange={onCardColorChange} />
      ),
    },
  ];

  function handleQrFormDataChange(newData) {
    console.log("变化");
    qrRef.current.setCode("template", newData.template);
    // setCode(newData, "template");
  }
  function onColorChange(coloroptions) {
    for (let key in coloroptions) {
      qrRef.current.setCode(key, coloroptions[key]);
    }
  }
  const [temList, setTemList] = useState([
    {
      label: "模板1",
      val: {
        content: ["#FFFFFF", "#333"],
        qrcode: ["#FFFFFF", "#000000", "#000000", "#000000"],
      },
    },
    {
      label: "模板2",
      val: {
        content: ["#1E1E2F", "#FFFFFF"],
        qrcode: ["#F8F9FA", "#0D6EFD", "#0D6EFD", "#0D6EFD"],
      },
    },
    {
      label: "模板3",
      val: {
        content: ["#FAE3D9", "#5D4037"],
        qrcode: ["#FFFFFF", "#D84315", "#D84315", "#D84315"],
      },
    },
    {
      label: "模板4",
      val: {
        content: ["#D4E157", "#33691E"],
        qrcode: ["#FFFFFF", "#8BC34A", "#8BC34A", "#8BC34A"],
      },
    },
  ]);
  function changeTem(val) {
    // debugger;
    qrFormRef.current.setAllColor(val.qrcode);
    let keys = Object.keys(cardColor);
    let _cardColor = { ...cardColor };
    val.content.forEach((con, index) => {
      let key = keys[index];
      _cardColor[key] = con;
    });
    setCardColor(_cardColor);
  }

  return (
    <>
      <div className="content_back">
        <div className="content_box">
          <div className="left_column">
            <Form
              name="cardForm"
              form={form}
              layout="vertical"
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 20 }}
            >
              <Form.Item label="输入网页连接" name="value">
                <Input onChange={(e) => setCode(e.target.value, "value")} />
              </Form.Item>
              <Form.Item label="输入网页标题" name="title">
                <Input onChange={(e) => setForm(e.target.value, "title")} />
              </Form.Item>
              <Form.Item label="输入网页描述" name="description">
                <TextArea
                  onChange={(e) => setForm(e.target.value, "description")}
                  rows="5"
                />
              </Form.Item>
              <Form.Item label="模板" name="title">
                <Radio.Group onChange={(e) => changeTem(e.target.value)}>
                  {temList.map((tem) => (
                    <Radio value={tem.val} key={tem.label}>
                      {tem.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Form>
            <Collapse defaultActiveKey={["1"]} ghost items={colList} />
          </div>
          <div className="right_column">
            <div
              className="card_box"
              id="generate_card"
              style={{ ...cardColor }}
            >
              <div className="left_card">
                <div className="card_title">{formData.title}</div>
                <div className="card_description">{formData.description}</div>
              </div>
              <div className="right_card">
                <Qrcode ref={qrRef} />
              </div>
            </div>
            <div className="btn_line">
              <Button type="primary" onClick={generateImg}>
                保存图片
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
