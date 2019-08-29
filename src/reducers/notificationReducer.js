export const createSuccessAddNotification = (title, author, seconds) => {
    return async dispatch => {
        dispatch ({
            type: 'SET_NOTIFICATION',
            notification: `a new blog ${title} by ${author} added`
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
        setTimeout(() => dispatch(noNotification()), seconds*2000)
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