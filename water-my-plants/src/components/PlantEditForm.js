import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const StyledDiv = styled.div`
    .modal-styles {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FFF;
        padding: 50px;
        z-index: 1000;
        color: black;
    };

    .overlay-styles {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(141, 170, 106, .7);
        z-index: 1000;
    }

    
`;

const initialState = {
    nickname: '',
    species: '',
    h2o_frequency: null
};

const PlantEditForm = ({ open, onClose, plant, update }) => {
    const [formState, setFormState] = useState(initialState);
    if (!open) return null; // returns nothing/null if 'open' isn't true/is open

    const submit = event => {
        event.preventDefault();

        const editedPlant = {
            user_id: plant.user_id,
            nickname: formState.nickname,
            species: formState.species,
            h2o_frequency: parseInt(formState.h2o_frequency)
        };

        axiosWithAuth()
            .put(`/plants/${plant.id}`, editedPlant)
            .then(response => {
                update(true);
                console.log("edited plant ", response)
            })
            .catch( error => {
                console.log('edited plant error, ', error)
            })

        console.log(editedPlant);
        update(false)
    };

    console.log(plant)
    return(
        <StyledDiv >
            <div className='overlay-styles'/>
            <div className='modal-styles'>
                <h2>Edit Plant Form</h2>
                <form onSubmit={ submit }>
                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input 
                            type='text'
                            id='name'
                            name='nickname'
                            value={formState.nickname}
                            placeholder={plant.nickname}
                            onChange={ e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='species'>Species: </label>
                        <input 
                            type='text'
                            id='species'
                            name='species'
                            value={formState.species}
                            placeholder={plant.species}
                            onChange={ e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='water'>Water me every: </label>
                        <input 
                            type='number'
                            id='water'
                            name='h2o_frequency'
                            value={formState.h2o_frequency}
                            placeholder={plant.h2o_frequency}
                            onChange={ e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                        days
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </StyledDiv>
    )
};

export default PlantEditForm;