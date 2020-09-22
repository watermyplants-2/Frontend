import React from 'react'
import styled from 'styled-components';



const PlantCard=(plant)=>{
    // console.log(plant)
   const { nickname, species, h20Interval, image } = plant.plant
    // console.log(plant.plant.nickname)

    const StyledDiv = styled.div`
    .plantCard{
        border: 1px solid white;
    }
    .image {
        background-color:red;
        margin:auto;
        height:20px;
        width:20px;
    }
`
    return(
        <StyledDiv>
            <div className="plantCard">
                <div className="image"></div>
                <h3 classname="nickname">Name: {nickname}</h3>
                <p classname="species">{species}</p>
            </div>
        </StyledDiv>
    )

}

export default PlantCard