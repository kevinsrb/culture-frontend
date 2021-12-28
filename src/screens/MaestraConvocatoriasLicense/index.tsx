import React, { useState } from 'react';


import MaestraConvocatorias from './Componant/MaestraConvocatorias';
import MaestraConvocatoriasCategory from './Componant/MaestraConvocatoriasCategory';
import MaestraConvocatoriasArea from './MaestraConvocatoriasArea/ConvocatoriasArea';
import GestionarActividadesCronograma from './GestionarActividadesCronograma/GestionarActividades';
import Documentos_administrativos from './MainDocumentosAdministrativos/DocumentosAdministrativos';
import MaestraEntidad from './MaestraConvocatoriasEntidad/MaestraEntidad';
import LineaEstrategica from './MaestraConvocatoriasLineaEstrategica/ConvocatoriasLineaEstrategica';
import ConvocatoriasLineaYCategoria from './MaestraConvocatoriasLineaYCategoria/ConvocatoriasLineaYCategoria';
import ConvocatoriasCiclos from './MaestraConvocatoriasLineaCiclos/ConvocatoriasCiclos';

export default function Index(){
    
    const [pageShow, setShowPage] = useState<any>(1);
    const [selectMaestr, setSelectMaestr] = useState<any>('');

    return(
        <div>
            {pageShow == 1?
                <MaestraConvocatorias setShowPage={setShowPage} setSelectMaestr={setSelectMaestr} />:
                (selectMaestr == 'area')?
                <MaestraConvocatoriasArea />
                :
                (selectMaestr == 'actividades_cronograma')?
                <GestionarActividadesCronograma />:
                (selectMaestr == 'documentos_administrativos')?
                <Documentos_administrativos />
                :
                (selectMaestr == 'entidad')?
                <MaestraEntidad />
                :
                (selectMaestr == 'linea_estrategica')?
                <LineaEstrategica />
                :
                (selectMaestr == 'linea_categoria')?
                <ConvocatoriasLineaYCategoria />
                :
                (selectMaestr == 'ciclos')?
                <ConvocatoriasCiclos />
                :
                <MaestraConvocatoriasCategory />
                
            }
        </div>
    )
}