import { useState } from 'react'
import axios from 'axios'

const useResource = async (url) => {
  const [ resources, setResources ] = useState([])
  setResources(await axios.get(url))
  const create = async (token, newBlog) => {
    const config = {
      headers : { Authorization: token }
    }
    const response = await axios.post(url, newBlog, config)
    return response.data
  }
  return {
    resources,
    create
  }
}

export default useResource