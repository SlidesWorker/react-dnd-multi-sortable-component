import React from "react";

const initStyle = {
  margin: "5px",
  border: "solid 1px black",
  padding: "5px",
  width: "100px",
  height: "100px",
  background: "transparent"
};

const DefaultContainerCardWrapper = (props, ref) => {
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

export default React.forwardRef(DefaultContainerCardWrapper);
