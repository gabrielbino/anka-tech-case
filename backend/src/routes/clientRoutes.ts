import { FastifyInstance } from 'fastify'
import {
  createClient,
  getClients,
  updateClient
} from '@/controllers/clientController'

export async function clientRoutes(app: FastifyInstance) {
  app.get('/clients', getClients)
  app.post('/clients', createClient)
  app.put('/clients/:id', updateClient)
}
