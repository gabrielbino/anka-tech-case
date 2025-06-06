import { FastifyInstance } from 'fastify'
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
  getClientAssets,
  getClientById
} from '../controllers/clientController'

export async function clientRoutes(app: FastifyInstance) {
  app.get('/', getClients)
  app.get('/:id/assets', getClientAssets);
  app.get('/:id', getClientById);
  app.post('/', createClient)
  app.put('/:id', updateClient)
  app.delete('/:id', deleteClient)
}
