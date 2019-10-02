import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import DefaultCardWrapper from "./CardWrapper";
import { createCardHover } from "../../Helper/CardHelper";

const createDropSpec = (props, ref) => ({
  hover: createCardHover(props, ref)
});

const createDragSpec = props => ({
  end: (item, monitor) => {
    const dropResult = monitor.getDropResult();

    if (dropResult && dropResult.listId !== item.listId) {
      props.onRemoveCard(item);
    }
  }
});

const Card = props => {
  const ref = useRef(null);
  const [, connectDropTarget] = useDrop({
    accept: props.parentAccept,
    ...createDropSpec(props, ref)
  });
  const item = {
    type: props.type,
    ...props
  };
  const [{ isDragging }, connectDragSource] = useDrag({
    item,
    ...createDragSpec(props),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const CardWrapper = props.cardWrapper || DefaultCardWrapper;

  connectDragSource(connectDropTarget(ref));
  return <CardWrapper {...props} ref={ref} isDragging={isDragging} />;
};

export default Card;
