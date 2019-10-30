import React, { useRef, useState } from "react";

import { useDrop, useDrag } from "react-dnd";

import {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  getContainerWrapperComponent,
  getContainerAccept,
  createDrop
} from "../../Helper/ContainerHelper";
import { createCardHover } from "../../Helper/CardHelper";

const canDrop = (item, monitor) => {
  return true;
};

const createDropCardSpec = (props, ref) => ({
  canDrop,
  drop: createDrop(props, ref)
});

const createDropContainerSpec = (props, ref) => ({
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

const ContainerCard = props => {
  const ref = useRef(null);
  const [items, setItem] = useState(refreshIndex(props.items));

  // create Handle function
  const addItems = createAddItems(setItem, props);
  const handleMoveCard = createHandleMoveCard(setItem, props);
  const handleRemoveCard = createHandleRemoveCard(setItem, props);

  // drop Card target
  const [containerWrapperProps, connectDropCardTarget] = useDrop({
    ...createDropCardSpec({ ...props, addItems }, ref),
    accept: [props.accept],
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDropHere: !!monitor.canDrop()
      };
    }
  });

  // drop container target
  const [, connectDropContainerTarget] = useDrop({
    ...createDropContainerSpec({ ...props }, ref),
    accept: [props.parentAccept]
  });

  const item = {
    type: props.type,
    ...props
  };

  // drag source
  const [{ isDragging }, connectDragSource] = useDrag({
    item,
    ...createDragSpec(props),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // default wrapper

    const ContainerWrapper = getContainerWrapperComponent(props);
    const accept = getContainerAccept(props);

  // connect hooks
  connectDropContainerTarget(connectDragSource(connectDropCardTarget(ref)));

  // render
  return (
    <ContainerWrapper
      {...props}
      {...containerWrapperProps}
      ref={ref}
      isDragging={isDragging}
    >
      {items.map((item, index) => {
        const itemProps = {
          ...item,
          index,
          listId: props.UUID,
          cardTypeMap: props.cardTypeMap
        };
        const CardComponent = getCardComponent(props, item);

        return (
          <CardComponent
            key={item.UUID}
            {...itemProps}
            onRemoveCard={handleRemoveCard}
            onMoveCard={handleMoveCard}
            parentAccept={props.accept}
          />
        );
      })}
    </ContainerWrapper>
  );
};

export default ContainerCard;
