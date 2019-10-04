import DefaultCard from "../Components/Cards/Card";

import R from "ramda";

export const refreshIndex = list => {
  return list.map((currentValue, index) => ({
    ...currentValue,
    index
  }));
};

export const createAddItems = setState => newItem => {
  setState(oldItems => refreshIndex([...oldItems, newItem]));
};

export const createHandleMoveCard = setState => (dragIndex, hoverIndex) => {
  setState(oldItems => R.move(dragIndex, hoverIndex, oldItems));
};

export const createHandleRemoveCard = setState => item => {
  setState(oldItems => {
    return refreshIndex(R.remove(item.index, 1, oldItems));
  });
  return true;
};

export const createDrop = (props, ref) => (dragObject, monitor) => {
  if (dragObject.listId !== props.uuid) {
    props.addItems(dragObject);
  }

  return {
    move: props.uuid === dragObject.listId,
    listId: props.uuid
  };
};

export const getCardComponent = (props, item) => {
  let cardComponent = DefaultCard;

  if (
    props.cardTypeMap &&
    item.type &&
    props.cardTypeMap[item.type] &&
    props.cardTypeMap[item.type].component
  ) {
    cardComponent = props.cardTypeMap[item.type].component;
  }
  if (props.cardComponent && props.cardComponent.component) {
    cardComponent = props.cardComponent.component;
  }

  return cardComponent;
};

export default {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  createDrop
};
