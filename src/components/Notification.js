import React from 'react'

const successNotification = ({message}) => {
    if (message === "") {
        return null
    }
    return (
        <div className= "successfulBlogAdd">
            {message}
        </div>

    )
}

export default successNotification