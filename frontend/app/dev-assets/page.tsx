import AssetForm from "../components/asset/AssetForm"
import AssetList from "../components/asset/AssetList"

export default function AssetsPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-2xl font-bold">Gestão de Ativos Financeiros</h1>
      <AssetForm />
      <hr />
      <AssetList />
    </main>
  )
}