import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import PlantEditForm from './PlantEditForm';
// import shortid from 'shortid'

 
//---------------------------------------------
//   Plant Card Component
//---------------------------------------------
const PlantCard=(plant)=>{
    const [isOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(false);

   const { nickname, species, h2o_frequency, image_url, id} = plant.plant

   const deletePlant = () => {
    axiosWithAuth()
        .delete(`/plants/${id}`)
        .then(response => {
            console.log("deleted plant ", response)
        })
        .catch( error => {
            console.log('deleted plant error, ', error)
        })
   };

    //----------------------------//
    //   Styles
    //----------------------------//

    const StyledDiv = styled.div`
    .plantCard{
        border: 1px solid white;
    }
    .image {
        /* background-color:red; */
        background-image: url(${image_url});
        margin:auto;
        height:100px;
        width:100%;
        background-size:cover;
        background-repeat:none;
        background-position:center;
    }

    .button-wrapper {
        position: relative;
        z-index: 1;
    }
`
// ---------------------------------------------
//   Return
//---------------------------------------------
    return(
        <StyledDiv key={id}> 
            <div className="plantCard">
                <div className="image"></div>
                <h3 className="nickname">{nickname}</h3>
                <p className="species">{species}</p>
                <p>Water every {h2o_frequency} days</p>
                <div className='button-wrapper'>
                    <button onClick={ () => setIsOpen( true )}>Edit Plant</button>
                    <PlantEditForm open={ isOpen } onClose={ () => setIsOpen( false )} plant={plant.plant} update={setUpdate}>
                        plant edit form
                    </PlantEditForm>
                </div>
                
                <button onClick={ (event) => deletePlant(event)}>Delete Plant</button>
            </div>
        </StyledDiv>
    )

}

export default PlantCard