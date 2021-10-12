import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Segment, Header, Accordion, Icon, Table, Button, Checkbox } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "../../components/Documentos/Column";
import { ObjConstanst } from "../../config/utils/constanst";

const TaskList = styled.div`
  padding: 8px;
`;

const Container = styled.div`
  border: 0.8px solid #cbd6e2;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f5fafc;
  color: #8796a5;
`;

const ContainerTabla = styled.div`
  color: #8796a5;
`;

export const Documentos = () => {
  let initialState = {
    task: {
      "task-1": {
        id: "task-1",
        content: "Carta invitación",
        sustentable: false,
        obligatorio: false,
        source: "column-1",
      },
      "task-2": {
        id: "task-2",
        content: "Cédula de ciudadanía",
        sustentable: false,
        obligatorio: false,
        source: "column-1",
      },
      "task-3": { id: "task-3", content: "Cronograma", sustentable: false, obligatorio: false, source: "column-1" },
      "task-4": {
        id: "task-4",
        content: "Declaración de residencia",
        sustentable: false,
        obligatorio: false,
        source: "column-1",
      },
      "task-5": {
        id: "task-5",
        content: "RUT",
        sustentable: false,
        obligatorio: false,
        source: "column-2",
      },
      "task-6": {
        id: "task-6",
        content: "Declaración de residencia",
        sustentable: false,
        obligatorio: false,
        source: "column-3",
      },
    },
    colummns: {
      "column-1": {
        id: "column-1",
        title: "Todos los documentos",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
      },
      "column-2": {
        id: "column-2",
        title: "Documentos persona natural",
        taskIds: ['task-5'],
      },
      "column-3": {
        id: "column-3",
        title: "Documentos propuesta",
        taskIds: ['task-6'],
      },
      "column-4": {
        id: "column-4",
        title: "Documentos Seleccionados",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  };

  // useEffect(() => {
  //   cargarDocumentos();
  // }, []);

  const [taskList, setTasks] = useState(initialState);
  const [activeaccordion, setActiveAccordion] = React.useState(0);

  const handleClickAccordion = (e, Titulo) => {
    console.log(Titulo, activeaccordion);
    let { index } = Titulo;
    let newIndex = activeaccordion === index ? -1 : index;
    return setActiveAccordion(newIndex);
  };

  const onDragEnd = (data) => {
    const { destination, source, draggableId } = data;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = taskList.colummns[source.droppableId];
    const finish = taskList.colummns[destination.droppableId];

    if (start.id === "column-4") return;

    if (start === finish) {
      const column = taskList.colummns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newState = {
        ...taskList,
        colummns: {
          ...taskList.colummns,
          [newColumn.id]: newColumn,
        },
      };

      return setTasks(newState);
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...taskList,
      colummns: {
        ...taskList.colummns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    return setTasks(newState);
  };

  const eliminarDocumento = (data) => {
    let source = taskList.colummns[data.tarea.source];
    let sourcetaskIds = source.taskIds;
    sourcetaskIds.push(data.tarea.id);
    source.taskIds = sourcetaskIds;
    let change = taskList.colummns["column-4"];
    let changetaskIdsFilter = change.taskIds.filter((id) => id !== data.tarea.id);
    change.taskIds = changetaskIdsFilter;

    const newState = {
      ...taskList,
      colummns: {
        ...taskList.colummns,
        [data.tarea.source]: source,
        "column-4": change,
      },
    };
    return setTasks(newState);
  };

  const guardardocumentacionadministrativa = () => {
    console.log(taskList.colummns['column-4'])
    if (taskList.colummns['column-4'].taskIds.length === 0) {
      return console.error('NO PUEDO GUARDAR')
    }

    let documentos = taskList.colummns['column-4'].taskIds.map(data => {
      return {
        descripcion_del_documento: data.content,
        sustentable: data.sustentable,
        obligatorio: data.obligatorio,
      }
    })
    console.log(documentos);
  }

  return (
    <div style={{ padding: '2%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header style={{ paddingLeft: '2%' }} as="h3">Asociar documentacion administrativa</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              {taskList.columnOrder.map((data, index) => {
                const column = taskList.colummns[data];
                if (column.id === "column-4") return;
                const tasks = column.taskIds.map((task) => taskList.task[task]);

                return (
                  <Segment className="no-margin">
                    <Accordion>
                      <Accordion.Title active={activeaccordion === index} index={index} onClick={handleClickAccordion}>
                        <Icon name="dropdown" />
                        {column.title}
                      </Accordion.Title>
                      <Accordion.Content active={activeaccordion === index}>
                        <Droppable droppableId={column.id}>
                          {(provided) => (
                            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                              {tasks.map((data, index) => (
                                <Draggable key={data.id} draggableId={data.id} index={index}>
                                  {(provided) => (
                                    <Container
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Icon name="hdd" />
                                      {data.content}
                                    </Container>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </TaskList>
                          )}
                        </Droppable>
                      </Accordion.Content>
                    </Accordion>
                  </Segment>
                );
              })}
            </Grid.Column>
            <Grid.Column width={11}>
              {taskList.columnOrder.map((data, index) => {
                const column = taskList.colummns[data];
                if (column.id !== "column-4") return;
                const tasks = column.taskIds.map((task) => taskList.task[task]);

                return (
                  <Table striped singleLine>
                    <Table.Header>
                      <Table.HeaderCell>{column.title}</Table.HeaderCell>
                      <Table.HeaderCell>¿Sustentable?</Table.HeaderCell>
                      <Table.HeaderCell>¿Obligatorio?</Table.HeaderCell>
                      <Table.HeaderCell>Accion</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                      {tasks.length > 0 ? (
                        tasks.map((tarea, i) => (
                          <Table.Row key={i}>
                            <Table.Cell>
                              <Droppable droppableId={column.id}>
                                {(provided) => (
                                  <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                                    <Draggable key={tarea.id} draggableId={tarea.id} index={index}>
                                      {(provided) => (
                                        <ContainerTabla
                                          style={{
                                            border: "none !important",
                                            borderRadius: "0px !important",
                                            backgroundColor: "transparent !important",
                                          }}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Icon name="hdd" />
                                          {tarea.content}
                                        </ContainerTabla>
                                      )}
                                    </Draggable>
                                    {provided.placeholder}
                                  </TaskList>
                                )}
                              </Droppable>
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox checked={tarea.sustentable} onChange={() => console.log("aca")} />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox checked={tarea.obligatorio} onChange={() => console.log("aca")} />
                            </Table.Cell>
                            <Table.Cell>
                              <Button
                                className="botones-acciones boton-borrar-adminconvocatorias"
                                icon="trash alternate outline"
                                onClick={(e) => eliminarDocumento({ e, tarea })}
                              />
                            </Table.Cell>
                          </Table.Row>
                        ))
                      ) : (
                        <Droppable droppableId={column.id}>
                          {(provided) => (
                            <TaskList {...provided.droppableProps} ref={provided.innerRef} style={{ width: "100%" }}>
                              {tasks.map((data, index) => (
                                <Draggable key={data.id} draggableId={data.id} index={index}>
                                  {(provided) => (
                                    <Container
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Icon name="hdd" />
                                      {data.content}
                                    </Container>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </TaskList>
                          )}
                        </Droppable>
                      )}
                    </Table.Body>
                    <Table.Footer>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell colSpan="2" className="end-text-table-documentos">
                        <Button
                          className="botones-redondos"
                          color="blue"
                          onClick={() => guardardocumentacionadministrativa()}
                        >
                          Guardar y continuar
                        </Button>
                      </Table.Cell>
                    </Table.Footer>
                  </Table>
                );
              })}
              {/* <Segment>
              <Header as="h5">Documentos Seleccionados</Header>
              <Droppable droppableId="column-4">
                {(provided) => (
                  <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                    {taskList.colummns["column-4"].taskIds.map((data, index) => (
                      <Draggable key={data.id} draggableId={data.id} index={index}>
                        {(provided) => (
                          <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {data.content}
                          </Container>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </Segment> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DragDropContext>
    </div>
  );
};
