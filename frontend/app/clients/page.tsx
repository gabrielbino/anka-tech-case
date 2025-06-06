import ClientForm from "@/components/client/ClientForm";
import ClientList from "@/components/client/ClientList";

export default function ClientsPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <p className="mb-6">Gerencie os clientes cadastrados no sistema.</p>
      
      <ClientForm />
      <hr className="my-6" />
      <ClientList />
    </main>
  );
}
