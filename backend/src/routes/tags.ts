import express from 'express'
import { getTags } from '../controllers/tags.js'

export default (router: express.Router) => {
  return router.get('/tags', getTags)
}
