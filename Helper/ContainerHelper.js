import DefaultCard from "../Components/Cards/Card";
import DefaultContainerWrapper from "../Components/ContainerWrapper";

import R from "ramda";

export const refreshIndex = list => {
  return list.map((currentValue, index) => ({
    ...currentValue,
    index
  }));
};

export const createAddItems = (setState, props) => newItem => {
  setState(oldItems => refreshIndex([...oldItems, newItem]));
};

export const createHandleMoveCard = (setState, props) => (
  dragIndex,
  hoverIndex
) => {
  setState(oldItems => {
    return R.move(dragIndex, hoverIndex, oldItems);
  });
};

export const createHandleRemoveCard = (setState, props) => item => {
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

export const getCustomComponentFromTypeMap = (props, itemType) => {
  if (props.cardTypeMap && itemType && props.cardTypeMap[itemType]) {
    return props.cardTypeMap[itemType];
  }
};

export const getCardComponent = (props, item) => {
  let cardComponent =
    getCustomComponentFromTypeMap(props, item.type).CardComponent ||
    DefaultCard;

  if (props.cardComponent && props.cardComponent.CardComponent) {
    cardComponent = props.cardComponent.CardComponent;
  }

  return cardComponent;
};

export const getContainerWrapperComponent = props => {
  let ContainerWrapperComponent =
    getCustomComponentFromTypeMap(props, props.type)
      .ContainerWrapperComponent || DefaultContainerWrapper;

  if (props.containerWrapperComponent && props.containerWrapperComponent) {
    ContainerWrapperComponent = props.containerWrapperComponent;
  }

  return ContainerWrapperComponent;
};

export default {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  createDrop
};
