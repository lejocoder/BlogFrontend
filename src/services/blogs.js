import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const makeABlog = async newBlog => {
  const config = {
    headers : {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addALike = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  console.log(`${baseUrl}/${id}`)
  return response.data
}

const deleteABlog = async id => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, setToken, makeABlog, addALike, deleteABlog}