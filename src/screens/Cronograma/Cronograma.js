import React from 'react'
import { Segment} from "semantic-ui-react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export const Cronograma = () => {
    return (
        <div>
            <Segment>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    weekends={true}
                    droppable={true}
                />
            </Segment>
        </div>
    )
}
