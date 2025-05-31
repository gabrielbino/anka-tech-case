import { FastifyInstance } from 'fastify'

export async function assetRoutes(app: FastifyInstance) {
  app.get('/assets', async () => {
    return [
      { name: 'Ação XYZ', value: 125.75 },
      { name: 'Fundo ABC', value: 212.40 },
      { name: 'Cripto DEF', value: 18.91 }
    ]
  })
}
