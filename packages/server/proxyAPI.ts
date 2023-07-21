import express from 'express'
import { proxyMiddleware } from './middlewares/proxy'

const proxyAPI = express.Router().use('/', proxyMiddleware)
module.exports = proxyAPI
