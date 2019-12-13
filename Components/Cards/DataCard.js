import React, {
  //  useRef,
  useState
  //  useEffect
} from "react";

// import * as R from "ramda";

// import Card from "./Cards/Card";
import {
  refreshIndex,
  createAddItems,
  createHandleMoveCard,
  createHandleRemoveCard,
  getCardComponent
  //  getCardComponent,
  //  getContainerWrapperComponent,
  //  getContainerAccept,
  //  createDrop,
  //  getTypeMapper
} from "../Helper/ContainerHelper";

const DataCard = props => {
  // const ref = useRef(null);
  console.log("DataCard", props);

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

  // const addItems = createAddItems(setItem, props);
  // const handleMoveCard = createHandleMoveCard(setItem, props);
  // const handleRemoveCard = createHandleRemoveCard(setItem, props);

  return <CardComponent {...props} />;
};

export default DataCard;
