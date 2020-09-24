import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';

const StyledDiv = styled.div`
    .fc { /* the calendar root */
        max-width: 700px;
        margin: 0 auto;
        padding: 2%;
    }
`;

const Calendar = ({ plants }) => {
    console.log(plants)
    const event = plant => {
        return {
        title: plant.nickname,
        start: new Date().toJSON().slice(0,10).replace(/-/g,'-') // starts event on day of plant creation
    }
    }

    const allEvents = plants.map( plant => {
        return event(plant)
    })
    console.log(allEvents)
    return (
        <StyledDiv>
            <FullCalendar 
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={allEvents}
            />
        </StyledDiv>
    )
};

export default Calendar;