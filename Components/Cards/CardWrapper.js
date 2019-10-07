import React from "react";

const initStyle = {
  border: "dashed 1px black",
  padding: "5px",
  width: "80px",
  height: "20px",
  marginBottom: "5px",
  cursor: "move",
  flexGrow: 1
};

const DefaultCardWrapper = (props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        ...initStyle,
        opacity: props.isDragging ? 0.2 : 1
      }}
    >
      {props.text}
    </div>
  );
};

export default React.forwardRef(DefaultCardWrapper);
