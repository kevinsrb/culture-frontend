import { Checkbox } from "semantic-ui-react";
import { useGestionarDocumentosPostulaciones } from "./GestionarDocumentos/Hooks/useGestionarDocumentosPostulaciones";

export const columnasDocumentaciontecnicaModal = [
  {
    title: "Nombre documentos",
    width: 30,
    dataIndex: "url_participante",
    key: "url_participante",
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
    dataIndex: "estado",
    key: "estado",
    render: (datos) => (
      <>
        <Checkbox
          // className="font-color-4B4B4B"
          radio
          label="Subsanar"
          name="Subsanar"
        //   value={datos.publicosi}
        //   checked={datos.publicosi}
        //   onChange={(e, r) => handletoggleChange(datos, index, e, r)}
        />

        <Checkbox
          // className="font-color-4B4B4B"
          radio
          label="Rechazado"
          name="Rechazado"
        //   value={datos.publicono}
        //   checked={datos.publicono}
        //   onChange={(e, r) => handletoggleChange(datos, index, e, r)}
        />
      </>
    ),
  },
];

export const columnasDocumentacionadministrativaModal = [
    {
      title: "Nombre documentos",
      width: 30,
      dataIndex: "url_participante",
      key: "url_participante",
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
      dataIndex: "estado",
      key: "estado",
      render: (datos) => (
        <>
          <Checkbox
            // className="font-color-4B4B4B"
            radio
            label="Subsanar"
            name="Subsanar"
          //   value={datos.publicosi}
          //   checked={datos.publicosi}
          //   onChange={(e, r) => handletoggleChange(datos, index, e, r)}
          />
  
          <Checkbox
            // className="font-color-4B4B4B"
            radio
            label="Rechazado"
            name="Rechazado"
          //   value={datos.publicono}
          //   checked={datos.publicono}
          //   onChange={(e, r) => handletoggleChange(datos, index, e, r)}
          />
        </>
      ),
    },
  ];