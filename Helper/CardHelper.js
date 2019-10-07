export const createCardHover = (props, ref) => {
  return (dragObject, monitor) => {
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

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Get pixels to the top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // console.log("hover", dragIndex, hoverIndex, hoverClientY, hoverMiddleY);

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (
      dragIndex < hoverIndex &&
      hoverClientY < hoverMiddleY &&
      hoverClientX < hoverMiddleX
    ) {
      return;
    }
    // Dragging upwards
    if (
      dragIndex > hoverIndex &&
      hoverClientY > hoverMiddleY &&
      hoverClientX > hoverMiddleX
    ) {
      return;
    }

    // Time to actually perform the action
    props.onMoveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  };
};

export default { createCardHover };
