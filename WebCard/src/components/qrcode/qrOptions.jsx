import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Input, Button, Collapse, Radio } from "antd";
import { ChromePicker } from "react-color";
const QrOptions = forwardRef(({ onQrFormDataChange }, ref) => {
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
  }));
  // 当 qrFormData 变化时，通知父组件
  useEffect(() => {
    if (onQrFormDataChange) {
      onQrFormDataChange(qrFormData);
    }
  }, [qrFormData, onQrFormDataChange]);
  return (
    <>
      <Form
        form={qrForm}
        name="qrForm1"
        layout="vertical"
        labelCol={{ span: 15 }}
        wrapperCol={{ span: 20 }}
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
        <Form.Item label="颜色"></Form.Item>
        <ChromePicker />
      </Form>
    </>
  );
});

export default QrOptions;
