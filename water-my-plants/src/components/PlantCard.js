import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom' 
import shortid from 'shortid'


//---------------------------------------------
//   Plant Card Component
//---------------------------------------------
const PlantCard=(props)=>{
   const { nickname, species, waterInterval, image, id} = props.plant
   const { edit } = props

    //----------------------------//
    //   Styles
    //----------------------------//

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
    .edit, .save {
        text-align:center;
        background-color:gray;
        color:white;
        text-decoration:none;
        width:3rem;
        padding:.4rem;
        cursor:pointer;
    }
`



//---------------------------------------------
//   Return
//---------------------------------------------
    return(
        <StyledDiv key={id}> 
            <div className="plantCard">
                
                <div className="image">
                    <Link >
                     <p class="edit" onClick={edit}>edit</p>
                    </Link>
                </div>
                <h3 className="nickname">{nickname}</h3>
                <p className="species">{species}</p>
                <p>Water every {waterInterval} days</p>
            </div>
        </StyledDiv>
    )

}

export default PlantCard