import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


afterEach(cleanup)


test('before', () => {
  const blog = {
    'author': 'fuck yall',
    'likes': 5,
    'title': 'sue',
    'url': 'swervinginalambo.com',
    'user': {
      'username': 'lil uzi vert'
    }
  }
  const username = 'lil uzi vert'

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const component = render(
    <Blog blog = {blog} username= {username} likeHandler = {mockLikeHandler} deleteHandler= {mockDeleteHandler} />
  )
  
  expect(component.container).toHaveTextContent(
    'fuck yall'
  )

  expect(component.container).toHaveTextContent (
    'sue'
  )
  component.debug()
  /*
  expect(component.container).toHaveTextContent (
    'lil uzi vert'
  )
  expect(component.container).not.toHaveTextContent (
    'swervinginalambo.com'
  )
  */


} )

test('after', () => {
  const blog = {
    'author': 'fuck yall',
    'likes': 5,
    'title': 'sue',
    'url': 'swervinginalambo.com',
    'user': {
      'username': 'lil uzi vert'
    }
  }
  const username = 'lil uzi vert'

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const component = render(
    <Blog blog = {blog} username= {username} likeHandler = {mockLikeHandler} deleteHandler= {mockDeleteHandler} />
  )
  const div = component.container.querySelector('.extrainfo')
  
  expect(div).toHaveStyle('display: none')

  const button = component.container.querySelector('.divClicker')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
})