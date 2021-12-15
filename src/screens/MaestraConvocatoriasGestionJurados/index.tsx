import React, { useState } from 'react';


import MaestraConvocatorias from './Componant/MaestraConvocatorias';
import MaestraConvocatoriasCategory from './Componant/MaestraConvocatoriasCategory';
export default function Index(){
    
    const [pageShow, setShowPage] = useState<any>(1);
    return(
        <div>
            {pageShow == 1?
                <MaestraConvocatorias setShowPage={setShowPage} />:
                <MaestraConvocatoriasCategory />
            }
        </div>
    )
}