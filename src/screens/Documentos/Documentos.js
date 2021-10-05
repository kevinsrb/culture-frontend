import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../../components/Documentos/Column";
import { ObjConstanst } from "../../config/utils/constanst";


export const Documentos = () => {
  let initialState = [
    {
      groupName: "Today",
      tasks: [{ id: 1, title: "Test-1" }, { id: 2, title: "Test-2" }]
    },
    {
      groupName: "Tomorrow",
      tasks: [{ id: 3, title: "Test-3" }, { id: 4, title: "Test-4" }]
    }
  ];

  let documentosState = [
    {
      groupName: "PersonaNatural",
      documentos: []
    },
    {
      groupName: "PersonaJuridica",
      documentos: []
    }
  ]

  useEffect(() => {
    cargarDocumentos()

  }, [])

  const [taskList, setTasks] = useState(initialState);
  const [documentosPersonaNatural, setDocumentosPersonaNatural] = useState(documentosState);

  const cargarDocumentos = async () => {
    console.log('cargar documentos');
    await axios
      .get(`${ObjConstanst.IP_CULTURE}documentos`)
      .then(({ data }) => {
        const personaNatural = data.data.filter(personaNatural => personaNatural.tipo_participante_id == 1);
        const documentosPersonaNaturalMap = personaNatural.map((ds) => {
          return {
            id: ds.id,
            title: ds.nombre,
          };
        });

        const personaJuridica = data.data.filter(personaJuridica => personaJuridica.tipo_participante_id == 2);
        const documentosPersonaJurtidicaMap = personaJuridica.map((ds) => {
          return {
            id: ds.id,
            title: ds.nombre,
          };
        });

        const objPersonaNatural = [
          {
            groupName: "PersonaNatural",
            documentos: documentosPersonaNaturalMap
          },
          {
            groupName: "PersonaJuridica",
            documentos: documentosPersonaJurtidicaMap
          }
        ]

        return setDocumentosPersonaNatural(objPersonaNatural)

      })
      .catch(function (error) {
        //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
      });
    }



  const onDragEnd = (val) => {
    console.log(val)
    // Your version
    // let result = helper.reorder(val.source, val.destination, taskList);
    // setTasks(result);
  
    //console.log(taskList)
    /// A different way!
    const { draggableId, source, destination } = val;

    // const [sourceGroup] = taskList.filter(
    //   column => column.groupName === source.droppableId
    // );

    const [sourceGroup1] = documentosPersonaNatural.filter(
      column => column.groupName === source.droppableId
    );

    console.log('paso')



    // Destination might be `null`: when a task is
    // dropped outside any drop area. In this case the
    // task reamins in the same column so `destination` is same as `source`
    // const [destinationGroup] = destination
    //   ? taskList.filter(column => column.groupName === destination.droppableId)
    //   : { ...sourceGroup };

    const [destinationGroup1] = destination
      ? documentosPersonaNatural.filter(column => column.groupName === destination.droppableId)
      : { ...sourceGroup1 };


    //console.log(destinationGroup1)
    // We save the task we are moving
    // const [movingTask] = sourceGroup.tasks.filter(t => t.id === draggableId);
    const [movingTask1] = sourceGroup1.documentos.filter(t => t.id === draggableId);

    // const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
    const newSourceGroupTasks1 = sourceGroup1.documentos.splice(source.index, 1);
    // const newDestinationGroupTasks = destinationGroup.tasks.splice(
    //   destination.index,
    //   0,
    //   movingTask
    // );

    const newDestinationGroupTasks1 = destinationGroup1.documentos.splice(
      destination.index,
      0,
      movingTask1
    );

    // Mapping over the task lists means that you can easily
    // add new columns
    // const newTaskList = taskList.map(column => {
    //   if (column.groupName === source.groupName) {
    //     return {
    //       groupName: column.groupName,
    //       tasks: newSourceGroupTasks
    //     };
    //   }
    //   if (column.groupName === destination.groupName) {
    //     return {
    //       groupName: column.groupName,
    //       tasks: newDestinationGroupTasks
    //     };
    //   }
    //   return column;
    // });
    // setTasks(newTaskList);

    const newTaskList1 = documentosPersonaNatural.map(column => {
      if (column.groupName === source.groupName) {
        return {
          groupName: column.groupName,
          documentos: newSourceGroupTasks1
        };
      }
      if (column.groupName === destination.groupName) {
        return {
          groupName: column.groupName,
          documentos: newDestinationGroupTasks1
        };
      }
      return column;
    });
    return setDocumentosPersonaNatural(newTaskList1);


  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="wrapper">
        <Segment>
          <Grid columns={2} celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <Column
                  className="column"
                  droppableId="PersonaNatural"
                  list={documentosPersonaNatural[0].documentos}
                  type="TASK"
                />
                <Column
                className="column"
                droppableId="PersonaJuridica"
                list={documentosPersonaNatural[1].documentos}
                type="TASK"
              />
              </Grid.Column>
              <Grid.Column width={13}>
                {/* <Column
                  className="column"
                  droppableId="PersonaJuridica"
                  list={documentosPersonaNatural[1].documentos}
                  type="TASK"
                /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </DragDropContext>
  );
}


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { ObjConstanst } from "../../config/utils/constanst"
// // fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     content: `item ${k + offset}`
//   }));

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };
// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });
// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250
// });

// export const Documentos = () => {

 

//   let documentosState = [
//     [{
//       id: 0,
//       content: '',
//     }]
//   ]

//   let documentosState2 = [
//     [{
//       id: 0,
//       content: '',
//     }]
//   ]
    

//   const [documentosPersonaNatural, setDocumentosPersonaNatural] = useState(documentosState);
//   const [documentosPersonaJuridica, setDocumentosPersonaJuridica] = useState(documentosState2);

//   useEffect(() => {
//     cargarDocumentos()
//   }, [])

//   const cargarDocumentos = async () => {
//     console.log('cargar documentos');
//     await axios
//       .get(`${ObjConstanst.IP_CULTURE}documentos`)
//       .then(({ data }) => {
//         const personaNatural = data.data.filter(personaNatural => personaNatural.tipo_participante_id == 1);
//         const documentosPersonaNaturalMap = personaNatural.map((ds) => {
//           return {
//             id: ds.id,
//             content: ds.nombre,
//           };
          
//         });

//         const personaJuridica = data.data.filter(personaJuridica => personaJuridica.tipo_participante_id == 2);
//         const documentosPersonaJurtidicaMap = personaJuridica.map((ds) => {
//           return {
//             id: ds.id,
//             content: ds.nombre,
//           };
//         });

//          setDocumentosPersonaNatural([documentosPersonaNaturalMap])
//          setDocumentosPersonaJuridica([documentosPersonaJurtidicaMap])
        

//       })
//       .catch(function (error) {
//         //ObjNotificaciones.MSG_ERROR('error', 'Oops...' , error.data.mensaje)
//       });
//   }


//   const [state, setState] = useState([getItems(10), getItems(5, 10)]);



//   function onDragEnd(result) {
//     const { source, destination } = result;

//     // dropped outside the list
//     if (!destination) {
//       return;
//     }
//     const sInd = +source.droppableId;
//     const dInd = +destination.droppableId;

//     if (sInd === dInd) {
//       const items = reorder(documentosPersonaNatural[sInd], source.index, destination.index);
//       const newState = [...documentosPersonaNatural];
//       newState[sInd] = items;
//       setDocumentosPersonaNatural(newState);
//     } else {
//       const result = move(documentosPersonaNatural[sInd], documentosPersonaNatural[dInd], source, destination);
//       const newState = [...documentosPersonaNatural];
//       newState[sInd] = result[sInd];
//       setDocumentosPersonaNatural(newState.filter(group => group.length));

//     }
//   }

//   function onDragEnd1(result) {
//     const { source, destination } = result;

//     // dropped outside the list
//     if (!destination) {
//       return;
//     }
//     const sInd = +source.droppableId;
//     const dInd = +destination.droppableId;

//     if (sInd === dInd) {
//       const items1 = reorder(documentosPersonaJuridica[sInd], source.index, destination.index);
//       const newState1 = [...documentosPersonaJuridica];
//       newState1[sInd] = items1;
//       setDocumentosPersonaJuridica(newState1);
//     } else {
//       const result1 = move(documentosPersonaJuridica[sInd], documentosPersonaJuridica[dInd], source, destination);
//       const newState1 = [...documentosPersonaJuridica];
//       newState1[dInd] = result1[dInd];

//       setDocumentosPersonaJuridica(newState1.filter(group => group.length));
//     }
//   }

//   return (
//     <div>
//       <div style={{ display: "flex" }}>
//         <DragDropContext onDragEnd={onDragEnd}>
//           {documentosPersonaNatural.map((el, ind) => (
//             <Droppable key={ind} droppableId={`${ind.toString()}`}>
//               {(provided, snapshot) => (
//                 <div
//                   ref={provided.innerRef}
//                   style={getListStyle(snapshot.isDraggingOver)}
//                   {...provided.droppableProps}
//                 >
//                   {el.map((item, index) => (
//                     <Draggable
//                       key={item.id}
//                       draggableId={item.id.toString()}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={getItemStyle(
//                             snapshot.isDragging,
//                             provided.draggableProps.style
//                           )}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-around"
//                             }}
//                           >
//                             {item.content}
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </DragDropContext>
//       </div>

//       //----------------------

//       <div style={{ display: "flex" }}>
//         <DragDropContext onDragEnd1={onDragEnd1}>
//           {documentosPersonaJuridica.map((eli, ind) => (
//             <Droppable key={ind} droppableId={`${ind.toString()}`}>
//               {(provided, snapshot) => (
//                 <div
//                   ref={provided.innerRef}
//                   style={getListStyle(snapshot.isDraggingOver)}
//                   {...provided.droppableProps}
//                 >
//                   {eli.map((item1, index1) => (
//                     <Draggable
//                       key={item1.id}
//                       draggableId={item1.id.toString()}
//                       index={index1}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={getItemStyle(
//                             snapshot.isDragging,
//                             provided.draggableProps.style
//                           )}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-around"
//                             }}
//                           >
//                             {item1.content}
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </DragDropContext>
//       </div>
//     </div>

//     //------------------------

    
//   );
// }

