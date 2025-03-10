import {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
const ContentOptions = forwardRef(({ onColorChange }, ref) => {
  //颜色选择
  const [contentColorList, setColorList] = useState([
    {
      name: "backgroundColor",
      title: "背景色",
      color: "#FFFFFF",
      visible: false,
    },
    {
      name: "color",
      title: "文字颜色",
      color: "#333",
      visible: false,
    },
  ]);
  useImperativeHandle(ref, () => ({}));
  const memoizedContentColorList = useMemo(
    () => contentColorList,
    [contentColorList]
  );
  useEffect(() => {
    if (onColorChange) {
      let coloroptions = contentColorList.reduce((pre, val) => {
        pre[val.name] = val.color;
        return pre;
      }, {});
      onColorChange((prev) => {
        // 如果颜色未变化，就不调用
        if (JSON.stringify(prev) === JSON.stringify(coloroptions)) {
          return prev;
        }
        return coloroptions;
      });
      // onColorChange(coloroptions);
    }
  }, [memoizedContentColorList, onColorChange]);
  function setColor(index, color) {
    setColorList((pre) => {
      const newList = [...pre]; // 创建新数组
      newList[index] = { ...newList[index], color }; // 创建新对象，避免修改原状态
      return newList;
    });
  }
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {contentColorList.map((color, index) => (
          <div key={color.name} className="color_poi">
            <input
              type="color"
              value={color.color}
              onChange={(e) => setColor(index, e.target.value)}
            />
            <div style={{ marginLeft: "5px" }}>{color.title}</div>
          </div>
        ))}
      </div>
    </>
  );
});

export default ContentOptions;
