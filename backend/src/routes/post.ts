import express from 'express'

export default (router: express.Router) => {
  router.get('/posts')
  router.post('/posts')
  router.get('/posts/:id')
  router.patch('/posts/:id')
}
