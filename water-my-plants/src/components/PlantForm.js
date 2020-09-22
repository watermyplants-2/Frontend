import React from 'react'
// import * as yup from 'yup'
// import schema from './plantSchema'




const PlantForm=()=>{
    return(
        <div>
            <h2>New Plant</h2>
            <form id="plantForm">
                <label>
                    Name:
                    <input type="text" name="nickname" />
                </label>
                <label>
                    Species:
                    <input type="text" name="species" />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" />
                </label>
                <label>
                    Water me every <input name="waterInterval" /> days
                </label>
                <button>Add</button>
            </form>
        </div>
    )

}

export default PlantForm