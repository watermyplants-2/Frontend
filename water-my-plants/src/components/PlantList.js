import React, { useState } from 'react'
import PlantCard from './PlantCard'

//---------------------------------------------
//   Plant List Component
//---------------------------------------------
const PlantList=(props)=>{
    const { plants }=props
//---------------------------------------------
//   Return
//---------------------------------------------
    return(
        <div>
            <h2>My Plants</h2>
            {
                plants.map(plant=>{
                    return(<PlantCard 
                        plant={plant}
                    />)
                })
            }

        </div>
    )

}
 
export default PlantList