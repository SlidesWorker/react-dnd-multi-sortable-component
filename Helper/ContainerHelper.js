import * as R from 'ramda';

import DefaultCard from "../Components/Cards/Card";
import DefaultContainerWrapper from "../Components/ContainerWrapper";

export const refreshIndex = (list, updateItemPosition) => {
  if (list === undefined || list === null) {
    return [];
  }

  return list.map((currentValue, index) => {

    const item = {
      ...currentValue,
      index
    };

    if (updateItemPosition) {
      updateItemPosition(item);
    }
    return item;
  });
};

export const createAddItems = (setState, props) => newItem => {
  setState(oldItems => {
    const newState = refreshIndex([...oldItems, newItem]);
    if (props.handleItemAdd) {
      props.handleItemAdd(newItem);
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

    let newState = refreshIndex(R.move(dragIndex, hoverIndex, oldItems), updateItemPosition);

    const item = newState[hoverIndex];
    if (props.handleItemMove) {
      props.handleItemMove(item);
    }
    return newState;
  });
};

export const createHandleRemoveCard = (setState, props) => item => {
  setState(oldItems => {
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

export const hasComponentConfig = (props, itemType) => {
  return props.cardTypeMap && itemType && props.cardTypeMap[itemType];
};

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

  console.log('getCardComponent', CardComponent);

  return CardComponent;
};

export const getContainerWrapperComponent = (props) => {
    let ContainerWrapperComponent = DefaultContainerWrapper;
    if (hasComponentConfig(props, props.type)) {
      const config = getComponentConfig(props, props.type);

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
  let accept = false;
  if (hasComponentConfig(props, props.type)) {
    const config = getComponentConfig(props, props.type);

    if (config.accept) {
      accept = config.accept;
    }
  }

  if (props.cardComponent) {
    accept = props.accept;
  }

  return accept;

};

const typeMapper = props => {
  return props.type;
}

export const getTypeMapper = props => {
  return props.typeMapper || typeMapper;
}

export default {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent,
  getContainerWrapperComponent,
  getContainerAccept,
  getTypeMapper,
  createDrop
};
