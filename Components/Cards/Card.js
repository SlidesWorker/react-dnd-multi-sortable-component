import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { createCardHover } from "../../Helper/CardHelper";

import {
  getTypeMapper,
  getCardWrapperComponent
} from "../../Helper/ContainerHelper";

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
  const item = {
    ...props,
    type: props.type
  };

  console.log("Card.render", props.onMoveCard);
  const [, connectDropTarget] = useDrop({
    accept: props.parentAccept,
    ...createDropSpec(props, ref)
  });
  const [{ isDragging }, connectDragSource] = useDrag({
    item,
    ...createDragSpec(props),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const CardWrapper = getCardWrapperComponent(props, item);

  connectDragSource(connectDropTarget(ref));
  // return "test";
  return <CardWrapper {...props} ref={ref} isDragging={isDragging} />;
};

export default Card;
