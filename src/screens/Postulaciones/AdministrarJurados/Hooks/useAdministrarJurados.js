import { useState } from "react";

export const useAdministrarJurados = () => {

    const [openFilter, setOpenFilter] = useState(false);
    const handleChangeFilter = () => {
        setOpenFilter(!openFilter);
    }

    return {
        openFilter,
        handleChangeFilter
    }
}
