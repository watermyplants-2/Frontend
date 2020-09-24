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
                <h3 className="nickname">{nickname}</h3>
                <p className="species">{species}</p>
                <p>Water every {h2o_frequency} days</p>
                <div className='button-wrapper'>
                    <button onClick={ () => setIsOpen( true )}>Edit Plant</button>
                    <PlantEditForm open={ isOpen } onClose={ () => setIsOpen( false )} plant={plant} update={setUpdate}>
                        plant edit form
                    </PlantEditForm>
                </div>
                
                <button onClick={ (event) => deletePlant(event)}>Delete Plant</button>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
    };
};

export default connect( mapStateToProps, { removePlant })( PlantCard );