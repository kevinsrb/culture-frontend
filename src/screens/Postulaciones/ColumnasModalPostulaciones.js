import { Checkbox, Button } from "semantic-ui-react";
import { useGestionarDocumentosPostulaciones } from "./GestionarDocumentos/Hooks/useGestionarDocumentosPostulaciones";

export const columnasDocumentaciontecnicaModal = [
  {
    title: "Nombre documentos",
    width: 30,
    dataIndex: "descripcion",
    key: "descripcion",
  },
  {
    title: "Tipo de documento",
    width: 30,
    dataIndex: "tipo_documento",
    key: "tipo_documento",
  },
  {
    title: "Acciones",
    width: 30,
    render: (datos) => (
      <>
        {datos.subsanable ?
          (
            <Button
              content="Seleccionar archivo"
              className="btn button_archivo"
            // onClick={() => fileInputRef.current.click()}
            />
          )
          :
          (
            null
          )
        }
      </>
    ),
  },
];

export const columnasDocumentacionadministrativaModal = [
  {
    title: "Nombre documentos",
    width: 30,
    dataIndex: "descripcion",
    key: "descripcion",
  },
  {
    title: "Tipo de documento",
    width: 30,
    dataIndex: "tipo_documento",
    key: "tipo_documento",
  },
  {
    title: "Acciones",
    width: 30,
    render: (datos) => (
      <>
        {datos.subsanable ?
          (
            <Button
              content="Seleccionar archivo"
              className="btn button_archivo"
            // onClick={() => fileInputRef.current.click()}
            />
          )
          :
          (
            null
          )
        }
      </>
    ),
  },
];