  import { FastifyInstance } from "fastify"
  import { createAsset, getStaticAssets } from "../controllers/assetController"

  export async function assetRoutes(app: FastifyInstance) {
    app.get("/", getStaticAssets)
    app.post("/", createAsset)
  }
