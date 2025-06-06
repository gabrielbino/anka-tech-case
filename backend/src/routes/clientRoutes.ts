import { FastifyInstance } from 'fastify'
import {
  createClient,
  getClients,
  updateClient,
  deleteClient
} from '../controllers/clientController'

export async function clientRoutes(app: FastifyInstance) {
  app.get('/', getClients)
  app.post('/', createClient)
  app.put('/:id', updateClient)
  app.delete('/:id', deleteClient)
}
