import React from 'react'
import { 
  render, waitForElement, cleanup
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
jest.mock('./services/blogs')
afterEach(cleanup)

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}
const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

localStorageMock.setItem('loggedBlogAppUser', JSON.stringify(user))

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(      
      () => component.getByText('login')    
    ) 
    // expectations here
    expect(component.container).not.toHaveToTextContent(
      'fuck yall'
    )
  })
})