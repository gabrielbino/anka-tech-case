import Fastify from 'fastify'
import cors from '@fastify/cors'
import { clientRoutes } from './routes/clients'
import { assetRoutes } from './routes/assets'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)
app.register(clientRoutes)
app.register(assetRoutes)

app.listen({ port: 3001 }, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001')
})
