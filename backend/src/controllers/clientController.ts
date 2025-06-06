import { FastifyReply, FastifyRequest } from 'fastify'
import prisma from '../lib/prisma'
import { createClientSchema, updateClientSchema } from '../schemas/clientSchema'

export async function createClient(request: FastifyRequest, reply: FastifyReply) {
  const parsed = createClientSchema.safeParse(request.body)
  if (!parsed.success) return reply.status(400).send(parsed.error)

  const client = await prisma.client.create({ data: parsed.data })
  return reply.send(client)
}

export async function getClients(_: FastifyRequest, reply: FastifyReply) {
  const clients = await prisma.client.findMany()
  return reply.send(clients)
}

export async function getClientAssets(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const clientId = Number(request.params.id);

  if (isNaN(clientId)) {
    return reply.status(400).send({ error: 'ID inválido' });
  }

  try {
    const assets = await prisma.asset.findMany({
      where: { clientId },
    });

    return reply.send(assets);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao buscar ativos do cliente' });
  }
}

export async function getClientById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const clientId = Number(request.params.id);

  if (isNaN(clientId)) {
    return reply.status(400).send({ error: "ID inválido" });
  }

  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return reply.status(404).send({ error: "Cliente não encontrado" });
    }

    return reply.send(client);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return reply.status(500).send({ error: "Erro interno no servidor" });
  }
}

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const parsed = updateClientSchema.safeParse(request.body)
  if (!parsed.success) return reply.status(400).send(parsed.error)

  const client = await prisma.client.update({
    where: { id: Number(id) },
    data: parsed.data
  })

  return reply.send(client)
}

export async function deleteClient(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params

  try {
    await prisma.client.delete({
      where: { id: Number(id) }
    })

    return reply.status(204).send()
  } catch (error) {
    return reply.status(404).send({
      message: "Cliente não encontrado ou já removido"
    })
  }
}
