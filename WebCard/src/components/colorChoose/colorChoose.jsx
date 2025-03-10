import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { Form, Input, Button, Collapse, Radio } from "antd";
import "./colorChoose.scss";

const ColorChoose = forwardRef(({ onColorChange, style }, ref) => {
  const [color, setColor] = useState("rgba(0,0,0,0.5)");
  function changeColor(color) {
    setColor(color.hex);
  }
  useEffect(() => {
    if (onColorChange) {
      onColorChange(color);
    }
  }, [color, onColorChange]);

  return (
    <>
      <div className="picker_box" style={style}>
        <ChromePicker
          disableAlpha={true}
          color={color}
          onChangeComplete={(e) => changeColor(e)}
        />
      </div>
    </>
  );
});
export default ColorChoose;
