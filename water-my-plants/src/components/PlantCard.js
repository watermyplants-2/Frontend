import React from 'react'
import styled from 'styled-components';


const StyledDiv = styled.div`
    .plantCard{
        border: 1px solid white;
    }

`
const PlantCard=(plant)=>{
    const { nickname } = plant
    return(
        <StyledDiv>
            <div className="plantCard">
                <h3>Name: {nickname}</h3>
                <p>Species: {plant.species}</p>
            </div>
        </StyledDiv>
    )

}

export default PlantCard