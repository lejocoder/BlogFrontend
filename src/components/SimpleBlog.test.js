import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


afterEach(cleanup)

test('renders SimpleBlod', () => {
  const blog = {
    'author': 'fuck yall',
    'likes': 5,
    'title': 'sue'
  }

  const component = render(
    <SimpleBlog blog= {blog} />
  )

  expect(component.container).toHaveTextContent(
    'fuck yall'
  )

  expect(component.container).toHaveTextContent (
    'sue'
  )

  expect(component.container).toHaveTextContent (
    5
  )
  // this is a rough draft, so far it uses the simplistic parts of the code
  // will attempt to add mroe complexity to ensure that i am doing this correctly

  // we could change the div component so we can use this test!
	
	
}
)


test('after clicking the button 2x, like event is registered 2x', () => {
  const blog = {
    'author': 'fuck yall',
    'likes': 5,
    'title': 'sue'
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog= {blog} onClick = {mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)



	
}
)
