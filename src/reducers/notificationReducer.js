export const createSuccessAddNotification = (title, author, seconds) => {
    return async dispatch => {
        dispatch ({
            type: 'SET_NOTIFICATION',
            notification: `a new blog ${title} by ${author} added`
        })
        setTimeout(() => dispatch(noNotification()), seconds*1000)
    }
}
export const createVoteNotification = (title, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: `a blog ${title} has recieved a like`
        })
        setTimeout(() => dispatch(noNotification()), seconds*1000)
    }
}
export const createErrorNotification = (seconds) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification:'wrong username or password'
        })
        setTimeout(() => dispatch(noNotification()), seconds*1000)
    }
}
export const createDeleteNotification = (title, author, seconds) => {
    return async dispatch => {
        dispatch ({
            type: 'SET_NOTIFICATION',
            notification: `the blog ${title} by ${author} has been deleted`
        })
        setTimeout(() => dispatch(noNotification()), seconds*1000)
    }
}
export const noNotification = () => {
    return {
        type: 'NO_NOTIFICATION'
    }
}

const notificationReducer = (state = 'NO_NOTIFICATION', action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'NO_NOTIFICATION':
            return 'NO_NOTIFICATION'
        default:
            return state
    }
}

export default notificationReducer