import React, {useState} from 'react';
import styled from 'styled-components';
import PlantList from './PlantList'
import PlantForm from './PlantForm'
import fakeData from './fakeData.json'


//----------------------------//
//   Test Values
//----------------------------//
const userData=fakeData
const fakePlants=userData.plants


//----------------------------//
//   Initial Values
//----------------------------//
const initialUserPlants=fakePlants

//----------------------------//
//   Styles
//----------------------------//

const StyledDiv = styled.div`
    .nav {
        grid-area: nav;
    };
    .plants {
        grid-area: plants;
        height: 300px;
        overflow:scroll;
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
        display:none;
    };
    .box {
        background-color: #444;
        color: #fff;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        text-align: center;
    };
    .errors{
        color:red;  
    };
`;


//---------------------------------------------
//   Home Component
//---------------------------------------------
const Home = () => {

    //----------------------------//
    //   States
    //----------------------------//

    //plantList
    const [userPlants, setUserPlants] = useState(initialUserPlants)

    //----------------------------//
    //   Helpers
    //----------------------------//

    //getPlants
    const getPlants=(newPlant)=>{
        setUserPlants([...userPlants,newPlant])
        console.log("User's new plant",newPlant)
        //replace this with GET request when server is ready

        // nice to have:
        // new plant adds to top of list
    }

    const edit =()=>{
        console.log("Placeholder - edit button")
    }

//---------------------------------------------
//   Return
//---------------------------------------------
    return (
        <StyledDiv>
            
            
            <div className='wrapper'>
                <div className='nav box'>
                    Nav Bar
                    <button>log out</button>
                </div>
                <section className="sidebar">
                    <div className='profile box'>Profile</div> 
                    <div className='addPlant box'>
                        {/* Add Plant */}
                        <PlantForm 
                            getPlants={getPlants}
                        />
                    </div>
                </section>
                <div className='plants box'>
                    {/* Plants */}
                    <PlantList 
                        plants={userPlants}
                        edit={edit}
                    />
                </div>
                <div className='calendar box'>Calendar</div>
            </div>
        </StyledDiv>
    )
};

export default Home;