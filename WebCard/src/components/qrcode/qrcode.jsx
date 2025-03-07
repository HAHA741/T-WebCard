import { useState, forwardRef, useImperativeHandle } from "react";
const Qrcode = forwardRef((props, ref) => {
  const [data, setData] = useState({
    value: "https://www.baidu.com",
    template: "",
    "background-color": "#ffffff",
    "foreground-color": "#000000;",
    "inner-color": "#000000",
    "outer-color": "#000000",
    "background-image": "",
    "foreground-image": "",
    logo: "",
    width: "100",
    height: "100",
  });

  useImperativeHandle(ref, () => ({
    setCode: (name, value) => {
      setData((preData) => ({ ...preData, [name]: value }));
      console.log(data, "data");
    },
    getData: () => data,
  }));
  return (
    <widget-qrcode
      value={data.value}
      template={data.template}
      background-color={data["background-color"]}
      foreground-color={data["foreground-color"]}
      inner-color={data["inner-color"]}
      outer-color={data["outer-color"]}
      background-image={data["background-image"]}
      foreground-image={data["foreground-image"]}
      logo={data.logo}
      width={data.width}
      height={data.height}
    ></widget-qrcode>
  );
});

export default Qrcode;
