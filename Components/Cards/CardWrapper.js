import React from "react";

const initStyle = {
  border: "solid 1px red",
  padding: "5px",
  width: "100%",
  // height: "20px",
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
      {props.UUID}
    </div>
  );
};

export default React.forwardRef(DefaultCardWrapper);
