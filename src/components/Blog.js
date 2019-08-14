import React, {useState} from 'react'

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

    return (
    <div style= {blogStyle}>
      <div onClick ={() => setExtraInfo(!extraInfo)}>
        <li key= {blog.id}>{blog.title + " " + blog.author}</li>
        <div >
          {blog.url}
          <br></br>
          {`${blog.likes} likes`}
          <br></br>
          {`added by ${blog.user}`}
        </div>
      </div>
    </div>
    
        
    )
}

export default Blog