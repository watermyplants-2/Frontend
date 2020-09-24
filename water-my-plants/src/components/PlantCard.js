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
        border: 1px solid #eee;
        display:flex;
        flex-flow:space-between;
        margin-top:1rem;
        button{
            width:3rem;
            height:3rem;
            font-size:2.2rem;
            border:none;
            background-color:white;
            color:#8D9B6A;
            cursor:pointer;
        }
        .text-wrapper{
            text-align:left;
            margin: 1.5rem auto 0 1.5rem;
        }
        .species{
            font-style:italic;
            font-size:1.4rem;
            margin-bottom:.7rem;
        }
        .water{
            font-weight:700;
        }
    }
    .image {
        background-image: url(${image_url});
        height:100px;
        width:60%;
        background-size:cover;
        background-repeat:none;
        background-position:center;
    }

    .button-wrapper {
        position: relative;
        z-index: 1;
        display:flex;
        flex-flow:column;
        margin:1rem;
    }
`
// ---------------------------------------------
//   Return
//---------------------------------------------
    return(
        <StyledDiv key={id}> 
            <div className="plantCard">
                <div className="image"></div>
                <div className="text-wrapper">
                    <h3 className="nickname">{nickname}</h3>
                    <p className="species">{species}</p>
                    <p>Water every <span className="water">{h2o_frequency}</span> days</p>
                </div>
                <div className='button-wrapper'>
                    <button onClick={ () => setIsOpen( true )} className="fa fa-edit"></button>
                    <PlantEditForm open={ isOpen } onClose={ () => setIsOpen( false )} plant={plant.plant} update={setUpdate}>
                        plant edit form
                    </PlantEditForm>
                    <button onClick={ (event) => deletePlant(event)} className="fa fa-trash"></button>
                </div>
                
                
            </div>
        </StyledDiv>
    )

}

export default PlantCard