import {
    Segment,
    Modal,
    Button,
    Header,
    Grid,
    Form,
    Input,
    Checkbox,
    Icon,
    Pagination,
    Divider,
    Select,
    Dropdown as DropdownSemantic,
    Breadcrumb,
    GridColumn,
} from "semantic-ui-react";

export const columns = [
    {
        title: "Propuesta",
        width: 80,
        dataIndex: "id_participante",
        key: "id_participante",
        fixed: "left",
    },
    {
        title: "Participante",
        width: 150,
        fixed: "left",
        render: (datos, index) => {
            return `${ datos.primer_nombre } ${ datos.segundo_nombre } ${ datos.primer_apellido } ${ datos.segundo_apellido };`
        },
    },
    {
        title: "Identificación participante",
        width: 100,
        dataIndex: "numero_documento",
        key: "numero_documento",
    },
    {
        title: "Estado",
        width: 100,
        dataIndex: "estado",
        key: "estado",
    },
    {
        title: "Barrio",
        width: 150,
        dataIndex: "barrio",
        key: "barrio",
    },
    {
        title: "Comuna",
        width: 100,
        dataIndex: "comuna",
        key: "comuna",
    },
    {
        title: "Teléfono Fijo",
        width: 150,
        dataIndex: "telefono_fijo",
        key: "telefono_fijo",
    },
    {
        title: "Teléfono Celular",
        width: 169,
        dataIndex: "telefono_celular",
        key: "telefono_celular",
    },
    {
        title: "Pais residencia",
        width: 169,
        dataIndex: "pais_residencia",
        key: "pais_residencia",
    },
    {
        title: "Consultar verficación",
        width: 80,
        key: "acciones",
        fixed: "right",
        render: (datos) => (
            <>
                <Button className="botones-acciones" icon="search" />
            </>
        ),
    },
    {
        title: "Modificar verficación",
        width: 80,
        key: "acciones",
        fixed: "right",
        render: (datos) => (
            <>
                <Button className="botones-acciones" icon="pencil" />
            </>
        ),
    },
];