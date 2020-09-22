import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    .nav {
        grid-area: nav;
    };
    .plants {
        grid-area: plants;
        height: 300px;
    };
    .sidebar {
        grid-area: sidebar
    }
    .calendar {
        grid-area: calendar;
        height: 300px;
    };
    .wrapper {
        display: grid;
        grid-gap: 1em;
        grid-template-areas:
        "nav"
        "sidebar"
        "plants"
        "calendar"
    };

    @media only screen and ( min-width: 800px ) {
        .wrapper {
            grid-template-columns: 20% auto;
            grid-template-areas:
                "nav nav"
                "sidebar plants"
                "sidebar calendar"
        };
    };

    .addPlant {
        height: 250px;
    };
    .profile {
        height: 375px;
    };
    .box {
        background-color: #444;
        color: #fff;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        text-align: center;
    };
`;



const Home = () => {
    return (
        <StyledDiv>
            
            
            <div className='wrapper'>
                <div className='nav box'>
                    Nav Bar
                    <button>log out</button>
                </div>
                <section className="sidebar">
                    <div className='profile box'>Profile</div> 
                    <div className='addPlant box'>Add Plant</div>
                </section>
                <div className='plants box'>Plants</div>
                <div className='calendar box'>Calendar</div>
            </div>
        </StyledDiv>
    )
};

export default Home;