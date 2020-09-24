import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { connect } from "react-redux";
import styled from 'styled-components';
import PlantList from './PlantList'
import PlantForm from './PlantForm'
import fakeData from './fakeServerData.json'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Footer from './Footer'
// import fakeData from './fakeData.json'


//----------------------------//
//   Test Values
//----------------------------//
// const userData=fakeData
// const fakePlants=userData.plants
// const testUserId=39

//----------------------------//
//   Initial Values
//----------------------------//
const initialUserPlants=fakeData
// const initialServerPlants=[]

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
const Home = ({ username, id}) => {

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

    //serverPlants
    // const [serverPlants, setServerPlants] = useState(initialServerPlants)

    //plantList
    const [userPlants, setUserPlants] = useState(initialUserPlants)

    const [getUsername] = useStickyState(username, "username");
    const [getId] = useStickyState(id, "id");

    //----------------------------//
    //   Helpers
    //----------------------------//

    //addPlant
    const addPlant=(newPlant)=>{
        console.log(newPlant)
        axiosWithAuth()
            .post('/plants', newPlant)
            .then(response => {
                console.log("add plant ", response)
            })
            .catch( error => {
                console.log('add plant error, ', error)
            })
            
        // console.log("User's new plant",newPlant)
        //replace this with POST request when server is ready

        // nice to have:
        // new plant adds to top of list
    }

    //----------------------------//
    //   Remote Data
    //----------------------------//
    

    //set current userID
    // const userId=testUserId

    // useEffect(()=>{
    //     axios.get('https://water-my-plants-four.herokuapp.com/plants')
    //         .then(res => {
    //             // setServerPlants(res.data)
    //             setUserPlants(res.data.filter( plants => {
    //                 console.log(plants.user_id, id)
    //                 return plants.user_id === getId;
    //             }))
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // },[id])


    //filter serverPlants and set to userPlants
    // const filterPlants=()=>{


    //     // //-------------------------
    //     // const data=serverPlants

    //     // // for matching userID
    //     // const filtered=data.filter(o=>{
    //     //     if(o["user_id"]===userId){
    //     //         return true
    //     //     }else{
    //     //         return false
    //     //     }
    //     // })
    //     // console.log(filtered)
    //     // // for plants with no fields missing or null
    //     // //-------------------------
        
    //     // const data=serverPlants
    //     // const filtered=data.filter(o=>{
    //     //        return (o["user_id"])
    //     //     }
    //     // )
    //     // console.log(filtered)

    // }


    //----------------------------//
    //   Events & Effects
    //----------------------------//

    // const clickTest=()=>{
    //     console.log("Server plants:", serverPlants)
    //     console.log("User plants:", userPlants)
    // }



//---------------------------------------------
//   Return
//---------------------------------------------
    return (
        <StyledDiv>
            
            
            <div className='wrapper'>
                <div className='nav'>
                    Water My Plants
                    <button>Log Out</button>
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
                <div className='calendar box'>Calendar</div>
            </div>        
            <Footer className="footer"/>
        </StyledDiv>

    )
};

const mapStateToProps = state => {
    return {
        username: state.username,
        id: state.id
    };
};

export default connect( mapStateToProps, {})(Home);