import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import SuccessNotification from './components/Notification'
import ErrorNotification from './components/error'
import LoginForm from './components/loginform'
import Blog from './components/Blog'
//import logo from './logo.svg';
//import './App.css';
function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  //const [resultBlog, setResultBlog] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // this is for whne the user logs after 
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState(false)
  const updateBlogList = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }
  useEffect(() => {
    userService
    .getAllUsers()
    .then(users => setUsers(users) )
  })
  useEffect(() => {    
    console.log('waht')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {
      console.log('truw')      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])
  useEffect(() => {
    updateBlogList()
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(        
        'loggedBlogappUser', JSON.stringify(user)      
      )
      console.log(user)
      blogService.setToken(user.token) // this is to save the token in case we decide to submit more blogs
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      //setErrorMessage('Wrong credentials')
      console.log('wrong credentials')
      setErrorMessage('wrong username or password')
      setUser('')
      setUsername('')
      setPassword('')
    }
  }
  
  const onClickLogout = (event) => {
    window.localStorage.setItem('loggedBlogappUser', '')
    setUser('')
  }
  const handleSubmitBlog = (event) => {
    event.preventDefault() // remember this sshit
    const id = users.filter(myUser => myUser.name === user.name).map(resultUser => resultUser.id) // do a filter then a map to get our id
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      userId: id
    }
    
    blogService
    .makeABlog(newBlog)
    .then(response => {
      setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setAuthor('')
      setTitle('')
      setUrl('')
    })
  }
  

  const resultForm = () => {
    const hideWhenVisible = {display: blogVisible ? 'none' : ''}
    const showWhenVisible = {display: blogVisible ? '' : 'none'}
    //console.log(user.name)
    //console.log(JSON.stringify(users))
    
    const filterBlogs = () => users.filter(myUser => myUser.name === user.name).map( resultUser => resultUser.blogs.map(blog => {
      //const newBlog = blogs.filter(myBlog => myBlog.id === blog.id)
      const newBlog = blogs.reduce(function(accumulator, currentValue) {
        if (currentValue.id === blog.id) {
          return currentValue
        }
        else {
          return accumulator
        }
      })
      return (
        <div>
          <Blog blog = {newBlog} />
        </div>
      )
    }))
    
    
    //console.log('a')
    return (
      <div>
        <SuccessNotification message= {successMessage} />
        <h1>blogs</h1>
        <p>{user.name} logged in</p><button onClick= {() => onClickLogout}>logout</button>
        <br></br>
        <div style = {hideWhenVisible}>
          <button onClick = {() => setBlogVisible(!blogVisible)}>create</button>
        </div>
        
        <div style = {showWhenVisible}>
          <h2>create new</h2>
          <form onSubmit = {() => handleSubmitBlog}>
            <div>
            title:
            <input type= 'text' value = {newTitle} name= 'Title' onChange= {({target}) => setTitle(target.value) }></input>
            </div>
            <div>
            author:
            <input type= 'text' value = {newAuthor} name = 'Author' onChange = {({target}) => setAuthor(target.value)}></input>
            </div>
            <div>
            url:
            <input type= 'text' value = {newUrl} name = 'Url' onChange = {({target}) => setUrl(target.value)}></input>
            </div>
            <button type= 'submit'>create</button>
          </form>
          <button onClick = {() => {setBlogVisible(!blogVisible)}}>cancel</button>

        </div>
        
        <h2>current blogs for {user.name}</h2>
        <div>
          {filterBlogs()}
        </div>
        
        
        
      </div>
    )
  }

  
  const loginForm = () => {
    const hideWhenVisible = {display : loginVisible ? 'none' : ''}
    const showWhenVisible = {display : loginVisible ? '' : 'none'}
    return (
      <div>
        <div style = {hideWhenVisible}>
          <button onClick= {() => setLoginVisible(!loginVisible)}>show login</button>
        </div>
        <ErrorNotification message = {errorMessage}/>
        <div style = {showWhenVisible}>
          <LoginForm 
          handleSubmit = {handleLogin} 
          handleUsernameChange = {({target}) => setUsername(target.value)}
          handlePasswordChange = {({target}) => setPassword(target.value)}
          username = {username}
          password = {password}
          />
          <button onClick= {() => setLoginVisible(!loginVisible)}>cancel login</button>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {user === '' ? loginForm() : resultForm()}
    </div>

    
  );
}

export default App;
