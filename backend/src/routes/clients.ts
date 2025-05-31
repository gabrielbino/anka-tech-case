import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { createClientSchema, updateClientSchema } from '../schemas/clientSchema'

const prisma = new PrismaClient()

export async function clientRoutes(app: FastifyInstance) {
  app.post('/clients', async (request, reply) => {
    const parsed = createClientSchema.safeParse(request.body)
    if (!parsed.success) return reply.status(400).send(parsed.error)

    const client = await prisma.client.create({ data: parsed.data })
    return reply.send(client)
  })

  app.get('/', async () => {
    return { message: 'API Anka Tech rodando com sucesso 🚀' }
  })

  app.put('/clients/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parsed = updateClientSchema.safeParse(request.body)
    if (!parsed.success) return reply.status(400).send(parsed.error)

    const client = await prisma.client.update({
      where: { id: Number(id) },
      data: parsed.data
    })
    return reply.send(client)
  })
}
