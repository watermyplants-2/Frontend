import React from 'react'
import styled from 'styled-components';



const PlantCard=(plant)=>{
   const { nickname, species, waterInterval, image, id} = plant.plant
   console.log(plant.plant)

    const StyledDiv = styled.div`
    .plantCard{
        border: 1px solid white;
    }
    .image {
        /* background-color:red; */
        background-image: url(${image});
        margin:auto;
        height:50px;
        width:50px;
        background-size:100%;
    }
`
    return(
        <StyledDiv>
            <div className="plantCard">
                <div className="image"></div>
                <h3 classname="nickname">Name: {nickname}</h3>
                <p classname="species">{species}</p>
                <p>Water every {waterInterval} days</p>
            </div>
        </StyledDiv>
    )

}

export default PlantCard