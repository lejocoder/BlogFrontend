//login form 
import React from 'react'

const LoginForm = ({
  handleSubmit, 
  handleUsernameChange,
  handlePasswordChange,
  username, 
  password
}) => {
  return (
    <div>
      <h1>Log in to the application</h1>
      <form onSubmit = {handleSubmit}>
        <div>
          username
          <input 
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = { handleUsernameChange }
          />
        </div>
        <div>
          password
          <input 
            type = 'password'
            value = {password}
            name = 'Password'
            onChange = { handlePasswordChange }
          />
        </div>
        <button type= "submit">save</button>
      </form>
    </div>
    
  )
}

export default LoginForm