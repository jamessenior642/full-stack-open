/* eslint-disable react/prop-types */
const Notification = ({ message, success }) => {
    if (message === null) {
      return null
    }
    const type = success ? 'notification' : 'notification error'
  
    return (
      <div className={type}>
        {message}
      </div>
    )
}

export default Notification