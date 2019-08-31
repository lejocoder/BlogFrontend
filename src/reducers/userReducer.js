
export const login = () => {
    return async dispatch => {
        dispatch({
            type: "LOGIN"
        })
    }
        
}

const userReducer = (state = [], action) => {
    switch (action.type) {
        default: 
            return state
    }
}

export default userReducer