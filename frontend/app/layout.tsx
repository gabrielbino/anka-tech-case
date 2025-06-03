import "./styles/globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "Anka Tech",
  description: "Sistema de Gestão de Clientes"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
