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
  createDrop,
  getTypeMapper
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
  let initItems = [];
  if (props.items && props.items.length >= 1) {
    initItems = props.items;
  }
  console.log('Container', initItems);

  const [items, setItem] = useState(refreshIndex(props.items));

  const addItems = createAddItems(setItem, props);
  const handleMoveCard = createHandleMoveCard(setItem, props);
  const handleRemoveCard = createHandleRemoveCard(setItem, props);

  const typeMapper = getTypeMapper(props);
  const ContainerWrapper = getContainerWrapperComponent(props);
  const accept = getContainerAccept(props);

  const [, connectDropTarget] = useDrop({
    ...createDropSpec({ ...props, addItems }, ref),
    accept,
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDropHere: !!monitor.canDrop()
      };
    }
  });

  connectDropTarget(ref);
  return (
    <ContainerWrapper {...props} ref={ref}>
      {items.map((item, index) => {
        const itemProps = {
          type: typeMapper(item),
          index,
          listId: props.UUID,
          cardTypeMap: props.cardTypeMap
        };
        const CardComponent = getCardComponent(itemProps, item);

        return (
          <CardComponent
            key={item.UUID}
            UUID={item.UUID}
            {...itemProps}
            onRemoveCard={handleRemoveCard}
            onMoveCard={handleMoveCard}
            parentAccept={accept}
            typeMapper={typeMapper}
          />
        );
      })}
    </ContainerWrapper>
  );
};

export default Container;
