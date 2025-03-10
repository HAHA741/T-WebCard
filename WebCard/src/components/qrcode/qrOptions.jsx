import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Input, Button, Collapse, Radio } from "antd";
import ColorChoose from "@/components/colorChoose/colorChoose";
import "./qrcode.scss";

const QrOptions = forwardRef(({ onQrFormDataChange, onColorChange }, ref) => {
  const [qrForm] = Form.useForm();
  const [qrFormData, setQrForm] = useState({ template: "default" });
  useEffect(() => {
    console.log(qrFormData, "qrFormData");
    qrForm.setFieldsValue(qrFormData);
  }, [qrFormData]);
  const [temList, setTemList] = useState([
    { label: "默认", val: "default" },
    { label: "液态", val: "water" },
    { label: "菱形", val: "diamond" },
    { label: "六边形", val: "hexagon" },
    { label: "星星", val: "star" },
    { label: "方块", val: "rect" },
    { label: "条形", val: "bar" },
    { label: "心形", val: "heart" },
    { label: "闪烁", val: "glitter" },
  ]);
  useImperativeHandle(ref, () => ({
    getQrFormData: () => qrFormData,
    setAllColor: setAllColor,
  }));
  // 当 qrFormData 变化时，通知父组件
  useEffect(() => {
    if (onQrFormDataChange) {
      onQrFormDataChange(qrFormData);
    }
  }, [qrFormData, onQrFormDataChange]);

  //颜色选择
  const [colorList, setColorList] = useState([
    {
      name: "background-color",
      title: "背景色",
      color: "#FFFFFF",
      visible: false,
    },
    {
      name: "foreground-color",
      title: "前景色",
      color: "#000000",
      visible: false,
    },
    {
      name: "inner-color",
      title: "定位内框",
      color: "#000000",
      visible: false,
    },
    {
      name: "outer-color",
      title: "定位外框",
      color: "#000000",
      visible: false,
    },
  ]);
  useEffect(() => {
    if (onColorChange) {
      let coloroptions = colorList.reduce((pre, val) => {
        pre[val.name] = val.color;
        return pre;
      }, {});
      onColorChange(coloroptions);
    }
  }, [colorList, onColorChange]);
  function setColor(index, color) {
    console.log(index, color);
    setColorList((pre) => {
      const newList = [...pre]; // 创建新数组
      newList[index] = { ...newList[index], color }; // 创建新对象，避免修改原状态
      return newList;
    });
  }
  function setAllColor(list) {
    list.forEach((val, index) => {
      let _color = val;
      setColor(index, _color);
    });
    console.log(colorList);
  }
  return (
    <>
      <Form
        form={qrForm}
        name="qrForm1"
        layout="vertical"
        labelCol={{ span: 15 }}
        wrapperCol={{ span: 50 }}
      >
        <Form.Item label="风格" name="template">
          <Radio.Group
            onChange={(e) =>
              setQrForm((pre) => ({ ...pre, template: e.target.value }))
            }
          >
            {temList.map((tem) => (
              <Radio value={tem.val} key={tem.label}>
                {tem.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="颜色">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {colorList.map((color, index) => (
              <div key={color.name} className="color_poi">
                <input
                  type="color"
                  value={color.color}
                  onChange={(e) => setColor(index, e.target.value)}
                />
                <div style={{ marginLeft: "10px" }}>{color.title}</div>
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
    </>
  );
});

export default QrOptions;
