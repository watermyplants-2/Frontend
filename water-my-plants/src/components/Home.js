import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { fetchPlants, appendPlant } from "../store/actions";
import styled from 'styled-components';
import PlantList from './PlantList';
import PlantForm from './PlantForm';


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
        background-color:#DAB692;
        color:#8F5B34;
        text-align:center;

        button{
            padding:2rem 5rem 2rem 5rem;
            margin-left:5rem;
            background-color:#DAB692;
            font-weight:500;
            color:#8F5B34;
            border-radius:0;
            border-top:none;
            border-bottom:none;
            border-left:1px solid #8F5B34;
            border-right:1px solid #8F5B34;
            
        } 
    };
    
    .plants {
        grid-area: plants;
        height: 500px;
        overflow:scroll;
    };
    .sidebar {
        grid-area: sidebar
    }
    .calendar {
        grid-area: calendar;
        height: 200px;
    };
    .wrapper {
        display: grid;
        grid-gap: 1em;
        /* grid-template-columns:minmax(25rem, 100rem) */
        grid-template-areas:
        "nav"
        "sidebar"
        "plants"
        "calendar"
        "footer"
    };

    @media only screen and ( min-width: 800px ) {
        .wrapper {
            grid-template-columns: min-content auto;
            grid-template-areas:
                "nav nav"
                "sidebar plants"
                "sidebar calendar"
                "footer footer"
        };
    };

    .addPlant {
        height: 400px;
        padding:3rem;
        h2{
            margin-bottom:1.5rem;
        }
        input{
            margin-bottom:1rem;
        }
        button{
            background-color:#8D9B6A;
            color:white;
            border:none;
            cursor:pointer;
            margin-top:2rem;
        }
        label{
            display:block;
        }

    };
    .profile {
        height: 375px;
        
        h2{
            margin-bottom:1rem;
        }

        .avatar{
            background-color:#8D9B6A;
            color:#ffffff;
            font-size:8rem;
            height:10rem;
            width:10rem;
            text-align:center;
            margin-top:2rem;
            padding-top:.6rem;
            border-radius:200px;
        }
    };

    .box {
        background-color: #ffffff;
        color: #8D9B6A;
        border-radius: 5px;
        border: 1px solid #eeeeee;
        padding: 10px;
        margin: 10px;
        text-align: center;
        filter: drop-shadow(2px 2px 2px #eeeeee);
        
    };
    .footer{
        grid-area:footer;
    }
    .errors{
        color:red;  
    };
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
                <div className='nav'>
                    Nav Bar
                    <button>log out</button>
                </div>
                <section className="sidebar">
                    <div className='profile box'>
                        <div>
                            <h2>Profile</h2>

                        </div>
                        <div> Hello {getUsername}!</div> 
                        <div className="profile-pic">
                                <p className="avatar fa fa-user"></p>
                        </div>
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
                <div className='calendar box'>Calendar</div>
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