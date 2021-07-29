const showErrors = ({ errors }) => {
    return (
        <div className={'errorList'}>
            {errors.map((err, index) => <div key={index}>{err}</div>)}
        </div>
    )
}
export default showErrors