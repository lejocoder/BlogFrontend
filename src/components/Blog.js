import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, username, likeHandler, deleteHandler }) => {
  
  const [extraInfo, setExtraInfo] = useState(true)
  //const [extraButton, setExtraButton] = useState(true)
  //const [blogsUserCanDelete, setBlogsCanDelete] = useState([])
  const showExtraVisible = { display : extraInfo ? 'none' : '' }
  
  //const hideExtraVisible = {display : extraInfo ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const newBlogUser = blog.user
  //console.log(username)
  //console.log(username)
  const showExtraButton = { display : newBlogUser.username === username ? '' : 'none' } // if true show, if not show nothing
  //console.log(newBlog)
  
  return (
    <div style= {blogStyle}>
      <div onClick ={() => setExtraInfo(!extraInfo)}>
        <li key= {blog.id}>{blog.title + ' ' + blog.author + ' ' + blog.id}</li>
        <div style = {showExtraVisible}>
          {blog.url}
          <br></br>
          {`${blog.likes} likes`} <button value = {blog.id} onClick = {likeHandler}>like</button>
          <br></br>
          {`added by ${newBlogUser.username} `}
          <br></br>
          <div style = {showExtraButton}>
            <button value = {blog.id} onClick = {deleteHandler}>remove</button>
          </div>
          
            
            
        </div>
      </div>
    </div>
    
        
  )

    
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired

}
export default Blog

//. for button we can use value ={value we want to pass}
// in order to use the value elsewhere we use event.target.value in order to all on it