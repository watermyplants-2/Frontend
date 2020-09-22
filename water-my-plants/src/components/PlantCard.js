import React from 'react'
import styled from 'styled-components';


//---------------------------------------------
//   Plant Card Component
//---------------------------------------------
const PlantCard=(plant)=>{
   const { nickname, species, waterInterval, image, id} = plant.plant
//    console.log(plant.plant)






    const StyledDiv = styled.div`
    .plantCard{
        border: 1px solid white;
    }
    .image {
        /* background-color:red; */
        background-image: url(${image});
        margin:auto;
        height:100px;
        width:100%;
        background-size:cover;
        background-repeat:none;
        background-position:center;
    }
`
    return(
        <StyledDiv>
            <div className="plantCard">
                <div className="image"></div>
                <h3 className="nickname">{nickname}</h3>
                <p className="species">{species}</p>
                <p>Water every {waterInterval} days</p>
            </div>
        </StyledDiv>
    )

}

export default PlantCard