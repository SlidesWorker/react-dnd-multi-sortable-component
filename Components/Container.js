import React, { useRef, useState } from "react";

import { useDrop } from "react-dnd";

import DefaultContainerWrapper from "./ContainerWrapper";
import {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  getContainerWrapperComponent,
  getContainerAccept,
  createDrop
} from "../Helper/ContainerHelper";

const canDrop = (item, monitor) => {
  return true;
};

const createDropSpec = (props, ref) => ({
  canDrop,
  drop: createDrop(props, ref)
});

const Container = props => {
  const ref = useRef(null);
  const [items, setItem] = useState(refreshIndex(props.items));

  const addItems = createAddItems(setItem, props);
  const handleMoveCard = createHandleMoveCard(setItem, props);
  const handleRemoveCard = createHandleRemoveCard(setItem, props);

  const [, connectDropTarget] = useDrop({
    ...createDropSpec({ ...props, addItems }, ref),
    accept: props.accept,
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDropHere: !!monitor.canDrop()
      };
    }
  });

  const ContainerWrapper = getContainerWrapperComponent(props);
  const accept = getContainerAccept(props);

  connectDropTarget(ref);
  return (
    <ContainerWrapper {...props} ref={ref}>
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

export default Container;
