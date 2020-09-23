import React, {useState, useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import PlantList from './PlantList'
import PlantForm from './PlantForm'
import fakeData from './fakeData.json'


//----------------------------//
//   Test Values
//----------------------------//
const userData=fakeData
const fakePlants=userData.plants
// const testUserId=39

//----------------------------//
//   Initial Values
//----------------------------//
const initialUserPlants=fakePlants
const initialServerPlants=[]

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

    //serverPlants
    const [serverPlants, setServerPlants] = useState(initialServerPlants)

    //plantList
    const [userPlants, setUserPlants] = useState(initialUserPlants)

    //----------------------------//
    //   Helpers
    //----------------------------//

    //addPlant
    const addPlant=(newPlant)=>{
        setUserPlants([...userPlants,newPlant])
        console.log("User's new plant",newPlant)
        //replace this with GET request when server is ready

        // nice to have:
        // new plant adds to top of list
    }

    //----------------------------//
    //   Remote Data
    //----------------------------//
    

    //set current userID
    // const userId=testUserId

    //getPlants using axios
    const getPlants=()=>{
        axios.get('https://water-my-plants-four.herokuapp.com/plants')
            .then(res => {
                console.log("GET request sent")
                console.log(res.data)
                setServerPlants(res.data)
                setUserPlants(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


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

    const clickTest=()=>{
        console.log("Server plants:", serverPlants)
        console.log("User plants:", userPlants)
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
                            addPlant={addPlant}
                        />
                    </div>
                </section>
                <div className='plants box'>


                    <button onClick={getPlants}>Server Plants</button>
                    <button onClick={clickTest}>Log</button>



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

export default Home;