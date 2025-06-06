import Fastify from 'fastify'
import cors from '@fastify/cors'
import { clientRoutes } from './routes/clientRoutes'
import { assetRoutes } from './routes/assetRoutes'

const app = Fastify()

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
})
app.register(clientRoutes, { prefix: '/clients' })
app.register(assetRoutes)

app.listen({ port: 3001 }, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001')
})
