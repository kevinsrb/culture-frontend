import { useState } from "react";
export const useOptionsSelect = () => {
    const [entidades, setEntidades] = useState([
        { id: 1, name: 'MCM' },
        { id: 2, name: 'OE' },
        { id: 3, name: 'PDL y PPC' },
        { id: 4, name: 'SCC' }
    ])

    const [participaciones, setParticipaciones] = useState([
        { id: 1, name: 'Persona natural' },
        { id: 2, name: 'Persona juridica' },
        { id: 3, name: 'Grupo conformado' },
    ])

    const [ciclo, setCiclo] = useState([
        { id: 1, name: 'Circulación' },
        { id: 2, name: 'Creación' },
        { id: 3, name: 'Formación' },
        { id: 4, name: 'Investigación' },
        { id: 5, name: 'Jurados' },
        { id: 6, name: 'Producción' }
    ])

    const [lineasEstrategicas, setLineasEstrategicas] = useState([
        { id: 1, name: 'Agenda cultural' },
        { id: 2, name: 'Apoyos concertados' },
        { id: 3, name: 'Audiciones' },
        { id: 4, name: 'Banco de jurados' },
        { id: 5, name: 'Circulación nacional e internacional' },
        { id: 6, name: 'Economías creativas' },
        { id: 7, name: 'Estímulos' },
        { id: 8, name: 'Ley de espectáculos públicos' },
        { id: 9, name: 'Premios' },
        { id: 10, name: 'Salas abierta' },
    ])

    const [areas, setAreas] = useState([
        { id: 1, name: 'Adquisición de equipos' },
        { id: 2, name: 'Apoyo para la participación' },
        { id: 3, name: 'Áreas integradas' },
        { id: 4, name: 'Arte' },
        { id: 5, name: 'Artes visuales' },
        { id: 6, name: 'Audiovisuales' },
        { id: 7, name: 'Circo' },
        { id: 8, name: 'Colaborativos' },
        { id: 9, name: 'Destino seguro' },
        { id: 10, name: 'Formación y asistencia técnica' },
        { id: 11, name: 'Gestión cultural' },
        { id: 12, name: 'Lectura y bibliotecas' },
        { id: 13, name: 'Literatura' },
        { id: 14, name: 'Música' },
        { id: 15, name: 'Patrimonio' },
        { id: 16, name: 'Producción de productos' },
        { id: 17, name: 'Recreación/deporte' },
        { id: 18, name: 'Teatro y actividades asociadas' },
        { id: 19, name: 'Tecnología' },
        { id: 20, name: 'Unidos por el sector' },
        { id: 21, name: 'Varias áreas' },
    ])

    const [coberturas, setCoberturas] = useState([
        { id: 1, name: 'Área metropolitana' },
        { id: 2, name: 'Municipal' },
        { id: 3, name: 'Nacional' }
    ])

    const [modalidadesEstimulo, setModalidadesEstimulo] = useState([
        { id: 1, name: 'Apoyo' },
        { id: 2, name: 'Pasantía' },
        { id: 3, name: 'Premio' },
        { id: 4, name: 'Estimulo' },
        { id: 5, name: 'Residencia - Salas' }
    ])

    const [tipoModalidades, setTipoModalidades] = useState([
        { id: 1, name: 'Económico'},
        { id: 2, name: 'No Aplica'}
    ])

    return {
        entidades,
        participaciones,
        ciclo,
        lineasEstrategicas,
        areas,
        coberturas,
        modalidadesEstimulo,
        tipoModalidades
    }
}
