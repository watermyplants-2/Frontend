import React, { useState, useEffect }from 'react'
import shortid from 'shortid'
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
    image_url:"",
    waterInterval:0
}

//formErrors
const initialFormErrors={
    id:"",
    nickname:"",
    species:"",
    image_url:"",
    waterInterval:""
}
const initialPlantList=[]

//disabled
const initialDisabled=true

//---------------------------------------------
//   Plant Form Component
//---------------------------------------------
const PlantForm=(props)=>{
    const {addPlant} = props

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
            id:shortid.generate(),
            nickname:formValues.nickname.trim(),
            species:formValues.species.trim(),
            image_url:formValues.image_url.trim(),
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
        console.log("New plant created",newPlant)
        addPlant(newPlant)
        
    }

    //addPlant


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
//---------------------------------------------
//   Return
//---------------------------------------------
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
                        name="image_url" 
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
                    <p>{formErrors.image_url}</p>
                    <p>{formErrors.waterInterval}</p>
                </div>
            </form>
        </div>
    )

}

export default PlantForm