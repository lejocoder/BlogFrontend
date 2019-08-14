// blog form
import React from 'react'
const ResultForm = ({
    handleSubmit,
    titleChange,
    authorChange,
    urlChange,
    title,
    author, 
    url
}) => {
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <div>
                title:
                <input type= 'text' value = {title} name= 'Title' onChange= {titleChange }></input>
                </div>
                <div>
                author:
                <input type= 'text' value = {author} name = 'Author' onChange = {authorChange}></input>
                </div>
                <div>
                url:
                <input type= 'text' value = {url} name = 'Url' onChange = {urlChange}></input>
                </div>
                <button type= 'submit'>create</button>
            </form>
        </div>
    )
}


export default ResultForm

/*
<form onSubmit = {handleSubmit}>
                <div>
                title:
                <input type= 'text' value = {title} name= 'Title' onChange= {titleChange }></input>
                </div>
                <div>
                author:
                <input type= 'text' value = {author} name = 'Author' onChange = {authorChange}></input>
                </div>
                <div>
                url:
                <input type= 'text' value = {url} name = 'Url' onChange = {urlChange}></input>
                </div>
                <button type= 'submit'>create</button>
            </form>
*/