import { FastifyReply, FastifyRequest } from "fastify"
import prisma from "../lib/prisma"
import { assetSchema } from "../schemas/assetSchema"

export async function createAsset(request: FastifyRequest, reply: FastifyReply) {
  const parsed = assetSchema.safeParse(request.body)
  if (!parsed.success) return reply.status(400).send(parsed.error)

  const asset = await prisma.asset.create({
    data: parsed.data
  })

  return reply.send(asset)
}

export async function getAssets(_: FastifyRequest, reply: FastifyReply) {
  const assets = await prisma.asset.findMany()
  return reply.send(assets)
}

export async function getStaticAssets(_: FastifyRequest, reply: FastifyReply) {
  const staticAssets = [
    { id: 1, name: "Ação XYZ", category: "Ações", value: 123.45 },
    { id: 2, name: "Fundo ABC", category: "Fundos", value: 456.78 }
  ]
  return reply.send(staticAssets)
}