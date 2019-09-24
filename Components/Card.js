import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const initStyle = {
  border: "dashed 1px black",
  padding: "5px",
  width: "80px",
  height: "20px",
  marginBottom: "5px",
  cursor: "move"
};

const createDropSpec = (props, ref) => ({
  hover: (dragObject, monitor) => {
    if (!ref.current) {
      return;
    }

    const dragIndex = dragObject.index;
    const dragListId = dragObject.listId;

    const hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    if (props.listId !== dragListId) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = ref.current.getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onMoveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
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

  connectDragSource(connectDropTarget(ref));
  return (
    <div
      ref={ref}
      style={{
        ...initStyle,
        opacity: isDragging ? 0.2 : 1
      }}
    >
      {props.text}
    </div>
  );
};

export default Card;
