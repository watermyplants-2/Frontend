import React, { useState } from 'react'
import { removePlant } from "../store/actions";
import { connect } from "react-redux";
import PlantEditForm from './PlantEditForm';
import './PlantCard.css';

 
//---------------------------------------------
//   Plant Card Component
//---------------------------------------------

const PlantCard=({ plant, removePlant })=>{
    const [isOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(false);

   const { nickname, species, h2o_frequency, image_url, id} = plant

   const deletePlant = () => {
       removePlant(id)
   };

// ---------------------------------------------
//   Return
//---------------------------------------------

    return(
        <div key={id}> 
            <div className="plantCard">
                <div style={{backgroundImage: `url(${image_url})`}} className='image'></div>
                <div className="text-wrapper">
                    <h3 className="nickname">{nickname}</h3>
                    <p className="species">{species}</p>
                    <p>Water every <span className="water">{h2o_frequency}</span> days</p>
                </div>
                <div className='buttons-wrapper'>
                    <div className='button-wrapper'>
                        <button className="fa fa-edit" onClick={ () => setIsOpen( true )}></button>
                        <PlantEditForm open={ isOpen } onClose={ () => setIsOpen( false )} plant={plant} update={setUpdate}>
                            plant edit form
                        </PlantEditForm>
                    </div>
                    
                    <button className="fa fa-trash" onClick={ (event) => deletePlant(event)}></button>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
    };
};

export default connect( mapStateToProps, { removePlant })( PlantCard );