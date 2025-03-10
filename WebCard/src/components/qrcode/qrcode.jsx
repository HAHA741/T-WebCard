import { useState, forwardRef, useImperativeHandle } from "react";
import "./qrcode.scss";
const Qrcode = forwardRef((props, ref) => {
  const [data, setData] = useState({
    value: "https://www.baidu.com",
    template: "",
    "background-color": "#ffffff",
    "foreground-color": "#000000",
    "inner-color": "#000000",
    "outer-color": "#000000",

    logo: "",
    width: "120",
    height: "120",
  });

  useImperativeHandle(ref, () => ({
    setCode: (name, value) => {
      setData((preData) => ({ ...preData, [name]: value }));
      console.log(data, "data");
    },
    getData: () => data,
  }));
  return (
    <div className="qrcode_box">
      <widget-qrcode
        value={data.value}
        template={data.template}
        background-color={data["background-color"]}
        foreground-color={data["foreground-color"]}
        inner-color={data["inner-color"]}
        outer-color={data["outer-color"]}
        logo={data.logo}
        width={data.width}
        height={data.height}
      ></widget-qrcode>
    </div>
  );
});

export default Qrcode;
