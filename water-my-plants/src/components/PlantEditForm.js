import React from 'react';
import styled from 'styled-components';

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

const PlantEditForm = ({ open, onClose }) => {
    if (!open) return null; // returns nothing/null if 'open' isn't true/is open
    return(
        <StyledDiv >
            <div className='overlay-styles'/>
            <div className='modal-styles'>
                <h2>Edit Plant Form</h2>
                <form>
                    <div>
                        <label>Name: </label>
                        <input 
                            type='text'
                        />
                    </div>
                    <div>
                        <label>Species: </label>
                        <input 
                            type='text'
                        />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </StyledDiv>
    )
};

export default PlantEditForm;