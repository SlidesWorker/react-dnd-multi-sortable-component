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
  if (hasComponentConfig(itemType)) {
    return props.cardTypeMap[itemType];
  }
};

export const hasComponentConfig = (props, itemType) => {
  return props.cardTypeMap && itemType && props.cardTypeMap[itemType];
};

export const getCardComponent = (props, item) => {
  let CardComponent = DefaultCard;
  if (hasComponentConfig(props, item)) {
    const config = getComponentConfig(props, item.type);

    if (config.CardComponent) {
      CardComponent = config.CardComponent;
    }
  }

  if (props.cardComponent) {
    CardComponent = props.cardComponent;
  }

  return CardComponent;
};

export const getContainerWrapperComponent = props => {
    let ContainerWrapperComponent = DefaultContainerWrapper;
    if (hasComponentConfig(props, item)) {
      const config = getComponentConfig(props, item.type);

      if (config.ContainerWrapperComponent) {
        ContainerWrapperComponent = config.ContainerWrapperComponent;
      }
    }

    if (props.cardComponent) {
      ContainerWrapperComponent = props.containerWrapperComponent;
    }

    return ContainerWrapperComponent;
};

export const getContainerAccept = props => {
  let accept = DefaultContainerWrapper;
  if (hasComponentConfig(props, item)) {
    const config = getComponentConfig(props, item.type);

    if (config.accept) {
      accept = config.accept;
    }
  }

  if (props.cardComponent) {
    accept = props.accept;
  }

  return accept;

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
