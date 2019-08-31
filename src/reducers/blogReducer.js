import blogService from '../services/blogs'
export const makeNewBlog = (blog) => {
    return async dispatch => {
        dispatch ({
            type: 'MAKE_NEW_BLOG',
            blog: blog
        })
    }
}
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch ({
            type: 'INIT_BLOGS',
            blogs: blogs
        })
    }
}
const blogReducer = (state = [], action) => {
    console.log('this went thru the blog reducer!')
    switch (action.type) {
        case 'MAKE_NEW_BLOG':
            const newBlogs = state.concat(action.blog)
            return newBlogs
        case 'INIT_BLOGS':
            return action.blogs
        default:
            return state
    }
}

export default blogReducer