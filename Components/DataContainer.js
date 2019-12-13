import React, {
  //  useRef,
  useState
  //  useEffect
} from "react";

// import * as R from "ramda";

import {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent
} from "../Helper/ContainerHelper";

const DataContainer = props => {
  let initItems = [];
  if (props.items && props.items.length >= 1) {
    initItems = props.items;
  }

  const [items, setItem] = useState(refreshIndex(initItems));

  /*
  useEffect(() => {
    console.log(
      "useEffect",
      items.map(item => item.UUID),
      props.items.map(item => item.UUID),
      R.equals(items.map(item => item.UUID), props.items.map(item => item.UUID))
    );
    setItem(props.items);
  }, [props.items]); // */
  const CardComponent = getCardComponent(props, props);

  const addItems = createAddItems(setItem, props);
  const handleMoveCard = createHandleMoveCard(setItem, props);
  const handleRemoveCard = createHandleRemoveCard(setItem, props);

  console.log("datacontainer.render", props);

  return (
    <CardComponent
      {...props}
      items={items}
      addItems={addItems}
      handleMoveCard={handleMoveCard}
      handleRemoveCard={handleRemoveCard}
    />
  );
};

export default DataContainer;
