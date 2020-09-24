import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { fetchPlants, appendPlant } from "../store/actions";
import styled from 'styled-components';
import PlantList from './PlantList';
import PlantForm from './PlantForm';
import Calendar from './Calendar';


//----------------------------//
//   Initial Values
//----------------------------//
const initialUserPlants=[]

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
    .errors{
        color:red;  
    };
    .plantCard{
         border: 1px solid white;
     }
     .image {
         
         margin:auto;
         height:100px;
         width:100%;
         background-size:cover;
         background-repeat:none;
         background-position:center;
     }

     .button-wrapper {
         position: relative;
         z-index: 1;
     }
`;


//---------------------------------------------
//   Home Component
//---------------------------------------------
const Home = ({ username, id, fetchPlants, appendPlant }) => {

    function useStickyState(defaultValue, key) {
        const [value, setValue] = React.useState(() => {
          const stickyValue = window.localStorage.getItem(key);
          return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
        });
        React.useEffect(() => {
          window.localStorage.setItem(key, JSON.stringify(value));
        }, [key, value]);
        return [value, setValue];
      }

    //----------------------------//
    //   States
    //----------------------------//

    //plantList
    const [userPlants, setUserPlants] = useState(initialUserPlants)
    console.log(userPlants)
    

    const [getUsername] = useStickyState(username, "username");
    const [getId] = useStickyState(id, "id");

    //----------------------------//
    //   Helpers
    //----------------------------//

    //addPlant
    const addPlant= newPlant => {
        appendPlant( newPlant ); // adds new plant to server

        // nice to have:
        // new plant adds to top of list
    };

    //----------------------------//
    //   Remote Data
    //----------------------------//
    

    const plantObj = { setUserPlants, id, getId } // sort into one object to be passed
    useEffect( () => {
        fetchPlants( plantObj ); // calls and fetches plant data to be displayed and sorted by the logged in user
    }, [ fetchPlants, plantObj ])
    


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
                    <div className='profile box'>
                        <div>
                            <h2>Profile</h2>
                        </div>
                        <div> Hello {getUsername}!</div> 
                    </div> 
                    <div className='addPlant box'>
                        {/* Add Plant */}
                        <PlantForm 
                            addPlant={addPlant}
                            id={getId}
                        />
                    </div>
                </section>
                <div className='plants box'>
                    {/* Plants */}
                    <PlantList 
                        plants={userPlants}
                    />
                </div>
                <div className='calendar box'>
                        <Calendar plants={userPlants}/>
                </div>
            </div>
        </StyledDiv>
    )
};

const mapStateToProps = state => {
    return {
        username: state.username,
        id: state.id
    };
};

export default connect( mapStateToProps, { fetchPlants, appendPlant })(Home);