export default yup.object().shape({
    nickname: yup.string()
        .required('Plant name is required'),
})