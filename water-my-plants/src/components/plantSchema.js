import * as yup from 'yup'

export default yup.object().shape({
    nickname: yup.string()
        .required('Plant name is required')
        .min(3,"Please enter a plant name"),
    image: yup.string()
        .required('Plant image is required')
        .min(3,"Please enter a plant image URL"),
    waterInterval: yup.number()
        .typeError('Days must be a number')
        .required('Please enter a number of days')
        .positive('Days must be greater than zero'),
    species:yup.string()
        .required('Please enter a plant species')
        .min(3,"Please enter a plant species")
})