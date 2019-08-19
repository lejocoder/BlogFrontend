const blogs = [
  {
    'author': 'fuck yall',
    'likes': 5,
    'title': 'sue',
    'url': 'swervinginalambo.com',
    'user': {
      'username': 'lil uzi vert'
    }
  }
]

const getAll = () => {
  return Promise.resolve( blogs )
}


export default { getAll }