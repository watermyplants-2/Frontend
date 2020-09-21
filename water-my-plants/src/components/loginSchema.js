import * as yup from 'yup'

export default yup.object().shape({
    username: yup.string()
        .required('Username is required'),
    password: yup.string()
        .min(8, 'Password is too short, 8 characters minimum')
        .required('Password is required')
})