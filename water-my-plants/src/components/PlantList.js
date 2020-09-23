import React from 'react'
import PlantCard from './PlantCard'

//---------------------------------------------
//   Plant List Component
//---------------------------------------------
const PlantList=(props)=>{
    const { plants, edit }=props
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
                        edit={edit}
                    />)
                })
            }

        </div>
    )

}
 
export default PlantList