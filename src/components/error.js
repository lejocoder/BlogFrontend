import React from 'react'
const errorNotification = ({message}) => {
    if (message === '') {
        return null
    }
    else {
        return (
            <div className = "errorMessage">
                {message}
            </div>
        )
    }
}

export default errorNotification