import React from "react";

const initStyle = {
  display: "flex",
  flexWrap: "wrap",
  margin: "5px",
  border: "solid 1px black",
  padding: "5px",
  width: "300px",
  height: "250px",
  background: "transparent"
};

const DefaultContainerWrapper = (props, ref) => {
  const style = {
    ...initStyle,
    background: props.isOver
      ? props.canDropHere
        ? "yellow"
        : "red"
      : "transparent"
  };
  return (
    <div style={style} ref={ref}>
      {props.children}
    </div>
  );
};

export default React.forwardRef(DefaultContainerWrapper);
