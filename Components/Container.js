import React from "react";

import R from "ramda";
import { DropTarget } from "react-dnd";

import Card from "./Card";

const initStyle = {
  margin: "5px",
  border: "solid 1px black",
  padding: "5px",
  width: "100px",
  height: "100px",
  background: "transparent"
};

const canDrop = (item, monitor) => {
  return true;
};

const refreshIndex = list => {
  return list.map((currentValue, index) => ({
    ...currentValue,
    index
  }));
};

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: refreshIndex(props.items)
    };
  }

  addItems(newItem) {
    this.setState(oldState => ({
      items: refreshIndex([...oldState.items, newItem])
    }));
  }

  handleMoveCard = (dragIndex, hoverIndex) => {
    this.setState(oldState => ({
      items: R.move(dragIndex, hoverIndex, oldState.items)
    }));
  };

  handleRemoveCard = item => {
    this.setState(oldState => {
      return {
        items: refreshIndex(R.remove(item.index, 1, oldState.items))
      };
    });
    return true;
  };

  render() {
    const { drop, isOver, canDropHere, connectDropTarget } = this.props;
    const style = {
      ...initStyle,
      background: isOver ? (canDropHere ? "yellow" : "red") : "transparent"
    };

    return connectDropTarget(
      <div style={style}>
        {this.state.items.map((item, index) => {
          const itemProps = {
            ...item,
            key: item.text,
            listId: this.props.listId
          };
          return (
            <Card
              {...itemProps}
              onRemoveCard={this.handleRemoveCard}
              onMoveCard={this.handleMoveCard}
              parentAccept={this.props.accept}
            >
              {item.text}
            </Card>
          );
        })}
      </div>
    );
  }
}

const containerTargetSpec = {
  canDrop,
  drop: (props, monitor, component) => {
    const sourceObj = monitor.getItem();

    if (props.listId !== sourceObj.listId) {
      component.addItems(sourceObj);
    }

    return {
      move: props.listId === sourceObj.listId,
      listId: props.listId
    };
  }
};

export default props => {
  const WrappedComponent = DropTarget(
    props.accept,
    containerTargetSpec,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: !!monitor.isOver(),
      canDropHere: !!monitor.canDrop()
    })
  )(Container);

  return <WrappedComponent {...props} />;
};
