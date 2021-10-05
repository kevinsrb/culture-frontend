import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  const { id, index, title } = props;
  let style = {
    backgroundColor: "red"
  };

  return (
    <Draggable draggableId={id.toString()} index={index} type="TASK">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="container-task">
            <div className="task">
              <span>{title}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
