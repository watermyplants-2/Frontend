import React, { useState, useEffect }from 'react'
import * as yup from 'yup'
import schema from './plantSchema'


//----------------------------//
//   Initial Values
//----------------------------//

//formValues
const initialFormValues={
    id:"",
    nickname:"",
    species:"",
    image:"",
    waterInterval:0
}

//formErrors
const initialFormErrors={
    id:"",
    nickname:"",
    species:"",
    image:"",
    waterInterval:""
}

//disabled
const initialDisabled=true

//---------------------------------------------
//   Plant Form Component
//---------------------------------------------
const PlantForm=()=>{


    //----------------------------//
    //   States
    //----------------------------//

    //formValues
    const [formValues, setFormValues] = useState(initialFormValues)
    //formErrors
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    //disabled
    const [disabled, setDisabled] = useState(initialDisabled)

    //----------------------------//
    //   Helpers
    //----------------------------//
    
    //change
    const change = (name, value) => {
        validate(name, value)
        setFormValues({...formValues,[name]:value})
    }
    //submit
    const submit = () => {
        const newPlant={
            id:formValues.id,
            nickname:formValues.nickname.trim(),
            species:formValues.species.trim(),
            image:formValues.image.trim(),
            waterInterval:formValues.waterInterval.trim()
        }
        postPlant(newPlant)
    }
    //validate
    const validate = (name,value)=>{
        yup
            .reach(schema,name)
            .validate(value)
            .then(valid => {
                setFormErrors({...formErrors, [name]: ""})
            })
            .catch(err => {
                setFormErrors({...formErrors,[name]: err.errors[0]})
            })
    }

    //----------------------------//
    //   Remote Data
    //----------------------------//

    //postPlants
    const postPlant=(newPlant)=>{
        console.log("Placeholder - new plant created",newPlant)
    }

    //getPlants


    //----------------------------//
    //   Events & Effects
    //----------------------------//

    //Effect: disabled on formValues change
    useEffect(() => {
        schema.isValid(formValues)
          .then(valid => {
            setDisabled(!valid)
          })
      }, [formValues])

    //onChange
    const onChange=evt=>{
        const {name,value} = evt.target
        change(name,value)
    }
    //onSubmit
    const onSubmit=evt=>{
        evt.preventDefault()
        submit()
    }

    return(
        <div>
            <h2>New Plant</h2>
            <form id="plantForm" onSubmit={onSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="nickname" 
                        onChange={onChange}
                    />
                </label>
                <label>
                    Species:
                    <input 
                        type="text" 
                        name="species" 
                        onChange={onChange}
                    />
                </label>
                <label>
                    Image URL:
                    <input 
                        type="text" 
                        name="image" 
                        onChange={onChange}
                    />
                </label>
                <label>
                    Water me every <input 
                    name="waterInterval"
                    type="number"
                    onChange={onChange}
                    /> days
                </label>
                <button disabled={disabled}>Add</button>
                <div className="errors">
                    <p>{formErrors.nickname}</p>
                    <p>{formErrors.species}</p>
                    <p>{formErrors.image}</p>
                    <p>{formErrors.waterInterval}</p>
                </div>
            </form>
        </div>
    )

}

export default PlantForm