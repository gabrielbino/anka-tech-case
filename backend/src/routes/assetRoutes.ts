import { FastifyInstance } from "fastify"
import { createAsset, getAssets } from "../controllers/assetController"

export async function assetRoutes(app: FastifyInstance) {
  app.get("/", getAssets)
  app.post("/", createAsset)
}
