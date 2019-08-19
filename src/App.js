import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import SuccessNotification from './components/Notification'
import ErrorNotification from './components/error'
import LoginForm from './components/loginform'
import ResultForm from './components/resultform'
import Blog from './components/Blog'
import useField from './hooks/index'
//import logo from './logo.svg';
//import './App.css';
function App() {
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const usernameHook = useField('text')
  const passwordHook = useField('text')
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
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
    //console.log('waht')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {
      //console.log('truw')      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])
  
  useEffect(() => {
    updateBlogList()
  }, [])
  
  //updateBlogList()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameHook.value
      const password = passwordHook.value // used cause for some reason it acting bitchy
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(        
        'loggedBlogappUser', JSON.stringify(user)      
      )
      //console.log(user)
      blogService.setToken(user.token) // this is to save the token in case we decide to submit more blogs
      setUser(user)
      //setUsername('')
      //setPassword('')
      usernameHook.reset()
      passwordHook.reset()
      
    }
    catch (exception) {
      //setErrorMessage('Wrong credentials')
      console.log('wrong credentials')
      setErrorMessage('wrong username or password')
      setUser('')
      //setUsername('')
      //setPassword('')
      usernameHook.reset()
      passwordHook.reset()
      
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
        updateBlogList()
      })
  }
  
  const handleLikes = (event) => {
    event.preventDefault()
    event.cancelBubble = true // alias to Event.stopPropogation
    const idToCheck = event.target.value //stops bubbling
    if(event.stopPropagation) event.stopPropagation()
    const blogToUpdate = blogs.reduce(function(accumulator, currentValue) {
      if (currentValue.id === idToCheck)
      { 
        accumulator = currentValue
        return accumulator
      }
      else {
        return accumulator
      }
    })
    //console.log(event.target.value)
    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id
    }
    // newBlog just needs likes to be updated i think basd on backend implementation
    console.log(JSON.stringify(newBlog))
    console.log(idToCheck)
    blogService
      .addALike(idToCheck, newBlog)
      .then(response => {
        setSuccessMessage(`a blog ${blogToUpdate.title} has recieved a like`)
        updateBlogList()
      })
  }
  const handleDelete = (event) => {
    event.preventDefault()
    event.cancelBubble = true // alias to Event.stopPropogation
    if(event.stopPropagation) event.stopPropagation()
    //console.log(event.target.value)
    //console.log(event.target.value)
    const resultBlog = blogs.reduce((accumulator, currentValue) => {
      if (currentValue.id === event.target.value) {
        accumulator = currentValue 
        return accumulator
      }
      else {
        return accumulator
      }
    })
    const confirm = window.confirm(`remove blog ${resultBlog.title} by ${resultBlog.author}`)
    if (confirm) {
      blogService
        .deleteABlog(event.target.value)
        .then(response => {
          setSuccessMessage(`the blog ${resultBlog.title} by ${resultBlog.author} has been deleted  `)
          updateBlogList()
        })
    }
  }
 
  const resultForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    
    const allBlogs= () => blogs.map(newBlog => {
      //console.log(user)
      //console.log(blogsUserCanDelete)
      return (
        <div key= {newBlog.id}>
          <Blog blog = {newBlog} username = {user.username} likeHandler = {handleLikes} deleteHandler = {handleDelete}/>
        </div>
      )
    })
    return (
      <div>
        <SuccessNotification message= {successMessage} />
        <h1>blogs</h1>
        <p>{user.name} logged in</p><button onClick= {onClickLogout}>logout</button>
        <br></br>
        <div style = {hideWhenVisible}>
          <button onClick = {() => setBlogVisible(!blogVisible)}>create</button>
        </div>
        
        <div style = {showWhenVisible}>
          <h2>create new</h2>
          <ResultForm
            handleSubmit = {handleSubmitBlog}
            titleChange = {({ target }) => setTitle(target.value) }
            authorChange = {({ target }) => setAuthor(target.value)}
            urlChange = {({ target }) => setUrl(target.value)}
            title = {newTitle}
            author = {newAuthor}
            url = {newUrl}
          />
          <button onClick = {() => {setBlogVisible(!blogVisible)}}>cancel</button>

        </div>
        
        
        <h3>all blogs</h3>
        <div>
          {allBlogs()}
        </div>
        
        
        
      </div>
    )
  }

  const loginForm = () => {
    const hideWhenVisible = { display : loginVisible ? 'none' : '' }
    const showWhenVisible = { display : loginVisible ? '' : 'none' }
    return (
      <div>
        <div style = {hideWhenVisible}>
          <button onClick= {() => setLoginVisible(!loginVisible)}>show login</button>
        </div>
        <ErrorNotification message = {errorMessage}/>
        <div style = {showWhenVisible}>
          <LoginForm 
            handleSubmit = {handleLogin} 
            handleUsernameChange = {usernameHook.onChange}
            handlePasswordChange = {passwordHook.onChange}
            username = {usernameHook.value}
            password = {passwordHook.value}
          />
          <button onClick= {() => setLoginVisible(!loginVisible)}>cancel login</button>
        </div>
      </div>
    )
  }
  if (blogs === []) {
    return (
      <div>
        this big gay
      </div>
    )
  }
  else{
    return (
      <div>
        {user === '' ? loginForm() : resultForm()}
      </div>
  
      
    )  
  }
  
}

export default App
