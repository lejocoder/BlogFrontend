import React, {useState} from 'react'
/*
const Blog = ({blog, blogs}) => {
  
  const [extraInfo, setExtraInfo] = useState(true)
  const showExtraVisible = {display : extraInfo ? 'none' : ''}
  //const hideExtraVisible = {display : extraInfo ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(blog)
  const newBlog = blogs.filter(myBlog => myBlog.id === blog.id)[0]
  const newBlogUser = newBlog.user
  //console.log(newBlog)
    return (
    <div style= {blogStyle}>
      <div onClick ={() => setExtraInfo(!extraInfo)}>
        <li key= {blog.id}>{blog.title + " " + blog.author + " " + blog.id}</li>
        <div style = {showExtraVisible}>
          {newBlog.url}
          <br></br>
          {`${newBlog.likes} likes`}
          <br></br>
          {`added by ${newBlogUser.username} `}
          <br></br>
          {JSON.stringify(newBlog)}
        </div>
      </div>
    </div>
    
        
    )
}
*/
const Blog = ({blog}) => {
  
  const [extraInfo, setExtraInfo] = useState(true)
  const showExtraVisible = {display : extraInfo ? 'none' : ''}
  //const hideExtraVisible = {display : extraInfo ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(blog)
  //const newBlog = new Promise(function(resolve,reject) {resolve(blogs.filter(myBlog => myBlog.id === blog.id)[0])})
  //const newBlog = blogs.filter(myBlog => myBlog.id === blog.id)[0]
  //console.log(newBlog)
  //const newBlogUser = newBlog.user
  
  const newBlogUser = new Promise(function(resolve,reject) {resolve(blog.user)})
  //console.log(newBlog)
  
    return (
      <div style= {blogStyle}>
        <div onClick ={() => setExtraInfo(!extraInfo)}>
          <li key= {blog.id}>{blog.title + " " + blog.author + " " + blog.id}</li>
          <div style = {showExtraVisible}>
            {blog.url}
            <br></br>
            {`${blog.likes} likes`}
            <br></br>
            {`added by ${newBlogUser.username} `}
            <br></br>
            {JSON.stringify(blog)}
          </div>
        </div>
      </div>
      
          
    )

    
}

export default Blog