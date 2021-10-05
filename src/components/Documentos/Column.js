import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import {  Accordion, Icon, Container } from "semantic-ui-react";

function Column(props) {
  const { droppableId, list, type } = props;

  console.log({list})

  let style = {
    backgroundColor: "white",
    height: "300px"
  };

  console.log("type = ", droppableId, list.map(v => v.id));


  const [state, setstate] = useState({ activeIndex: 0 })

  const handleClick = (e, titleProps) => {
    
    const { index } = titleProps
    const { activeIndex } = state
    const newIndex = activeIndex === index ? -1 : index

    console.log(titleProps)
    console.log(activeIndex)

    setstate({ activeIndex: newIndex })
  }

  const { activeIndex } = state;

  return (
    <Droppable droppableId={droppableId}  type={type} >
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={style}>
          <Accordion styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
            <strong>{droppableId}</strong>
            </Accordion.Title>
            <Container textAlign='right'>
              <Icon name='dropdown' />
            </Container>
            {list.map((val, index) => {
              return (
                <Accordion.Content active={activeIndex === 0}>
                  <Task id={val.id} key={val.id.toString()} index={index} title={val.title} />
                </Accordion.Content>
              );
            })}
          
          </Accordion>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
