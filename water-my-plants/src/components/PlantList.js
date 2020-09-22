import React, { useState } from 'react'
import PlantCard from './PlantCard'
import fakeData from './fakeData.json'


//----------------------------//
//   Test Values
//----------------------------//
const userData=fakeData
const userPlants=userData.plants

//---------------------------------------------
//   Plant List Component
//---------------------------------------------
const PlantList=()=>{
    return(
        <div>
            <h2>My Plants</h2>
            {
                userPlants.map(plant=>{
                    return(<PlantCard 
                        plant={plant}
                    />)
                })
            }

        </div>
    )

}

export default PlantList