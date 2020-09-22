import * as yup from 'yup'

export default yup.object().shape({
    nickname: yup.string()
        .required('Plant name is required'),
    image: yup.string()
        .required('Plant image is required'),
    waterInterval: yup.number()
        .typeError('Days must be a number')
        .required('Please enter a number of days')
        .positive('Days must be greater than zero'),
    species:yup.string()
})