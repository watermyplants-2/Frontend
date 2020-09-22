import React, { useState } from 'react'
import PlantCard from './PlantCard'
import fakeData from './fakeData.json'



const userData=fakeData
const userPlants=userData.plants

const PlantList=()=>{

    return(
        <div>
            <h2>Plant List</h2>
            <p>List of plants goes here</p>
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