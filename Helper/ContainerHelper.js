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

export const getComponentConfig = (props, itemType) => {
  if (props.cardTypeMap && itemType && props.cardTypeMap[itemType]) {
    return props.cardTypeMap[itemType];
  }
};

export const getCardComponent = (props, item) => {
  let CardComponent =
    getComponentConfig(props, item.type).CardComponent ||
    DefaultCard;

  if (props.cardComponent) {
    CardComponent = props.cardComponent;
  }

  return CardComponent;
};

export const getContainerWrapperComponent = props => {
  let ContainerWrapperComponent =
    getComponentConfig(props, props.type)
      .ContainerWrapperComponent || DefaultContainerWrapper;

  if (props.containerWrapperComponent) {
    ContainerWrapperComponent = props.containerWrapperComponent;
  }

  return ContainerWrapperComponent;
};

export const getContainerAccept = props => {
  let accept =
    getComponentConfig(props, props.type)
      .accept || [];

  if (props.accept) {
    ContainerWrapperComponent = props.accept;
  }

  return ContainerWrapperComponent;
};

export default {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  getContainerWrapperComponent,
  getContainerAccept,
  createDrop
};
