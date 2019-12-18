import * as R from "ramda";

import DefaultCard from "../Components/Cards/Card";
import DefaultCardWrapper from "../Components/Cards/CardWrapper";
import DefaultContainerWrapper from "../Components/ContainerWrapper";
import DefaultDataContainerComponent from "../Components/DataContainer";

export const refreshIndex = (list, updateItemPosition) => {
  if (list === undefined || list === null) {
    return [];
  }

  return list.map((currentValue, index) => {
    const item = {
      ...currentValue,
      index
    };

    return item;
  });
};

export const createAddItems = (setState, props) => newItem => {
  console.log("add new item to container", newItem, props);
  setState(oldItems => {
    const oldListUUID = newItem.listId;
    const newState = refreshIndex([...oldItems, newItem]);
    if (props.handleItemAdd) {
      props.handleItemAdd(newItem, oldListUUID);
    }
    return newState;
  });
};

export const createHandleMoveCard = (setState, props) => (
  dragIndex,
  hoverIndex
) => {
  setState(oldItems => {
    const updateItemPosition = props.updateItemPosition || false;

    const newState = refreshIndex(
      R.move(dragIndex, hoverIndex, oldItems),
      updateItemPosition
    );

    const item = newState[hoverIndex];
    if (props.handleItemMove) {
      props.handleItemMove(item);
    }
    return newState;
  });
};

export const createHandleRemoveCard = (setState, props) => item => {
  setState(oldItems => {
    console.log("HandleRemoveCard", item.index, oldItems);
    const newState = refreshIndex(R.remove(item.index, 1, oldItems));
    if (props.handleItemRemove) {
      props.handleItemRemove(item);
    }
    return newState;
  });
  return true;
};

export const createDrop = (props, ref) => (dragObject, monitor) => {
  if (dragObject.listId !== props.UUID) {
    props.addItems(dragObject);
  }

  return {
    move: props.UUID === dragObject.listId,
    listId: props.UUID
  };
};

export const getComponentConfig = (props, itemType) => {
  if (hasComponentConfig(props, itemType)) {
    return props.cardTypeMap[itemType];
  }
};

export const hasComponentConfig = (props, itemType) =>
  props.cardTypeMap && itemType && props.cardTypeMap[itemType];

export const getCardComponent = (props, item) => {
  let CardComponent = DefaultCard;
  if (hasComponentConfig(props, item.type)) {
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

export const getCardWrapperComponent = (props, item) => {
  let CardWrapperComponent = DefaultCardWrapper;
  if (hasComponentConfig(props, item.type)) {
    const config = getComponentConfig(props, item.type);

    if (config.CardWrapperComponent) {
      CardWrapperComponent = config.CardWrapperComponent;
    }
  }

  if (props.cardWrapperComponent) {
    CardWrapperComponent = props.cardWrapperComponent;
  }

  return CardWrapperComponent;
};

export const getDataContainerComponent = (props, item) => {
  let DataContainerComponent = DefaultDataContainerComponent;
  if (hasComponentConfig(props, item.type)) {
    const config = getComponentConfig(props, item.type);

    if (config.DataContainerComponent) {
      DataContainerComponent = config.DataContainerComponent;
    }

    // console.log("getDataContainerComponent", config);
  }

  if (props.dataContainerComponent) {
    DataContainerComponent = props.dataContainerComponent;
  }

  return DataContainerComponent;
};

export const getContainerWrapperComponent = props => {
  let ContainerWrapperComponent = DefaultContainerWrapper;
  if (hasComponentConfig(props, props.type)) {
    const config = getComponentConfig(props, props.type);

    if (config.ContainerWrapperComponent) {
      ContainerWrapperComponent = config.ContainerWrapperComponent;
    }
  }

  if (props.cardWrapper) {
    ContainerWrapperComponent = props.containerWrapperComponent;
  }

  return ContainerWrapperComponent;
};

export const getContainerAccept = props => {
  let accept = false;
  if (hasComponentConfig(props, props.type)) {
    const config = getComponentConfig(props, props.type);

    if (config.accept) {
      accept = config.accept;
    }
  }

  if (props.accept) {
    accept = props.accept;
  }

  return accept;
};

const typeMapper = props => props.type;

export const getTypeMapper = props => props.typeMapper || typeMapper;

export default {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  getCardWrapperComponent,
  getContainerWrapperComponent,
  getContainerAccept,
  getDataContainerComponent,
  getTypeMapper,
  createDrop
};
