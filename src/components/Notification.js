import React from 'react'
import { connect } from 'react-redux'
/*
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
*/
const successNotification = (props) => {
    return (
        <div className = "successfulBlogAdd">
            {props.notification}
        </div>
    )
      
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        type: state.type
    }
}
const connectedNotification = connect(mapStateToProps)(successNotification)
//export default successNotificatoion
export default connectedNotification