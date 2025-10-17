# Estrutura do projeto

Resumo da organização do repositório `roofstock-web`.

Raiz
- `package.json` — dependências e scripts (`dev`, `build`, `lint`, `preview`).
- `vite.config.js` — configuração do Vite.
- `index.html` — entrada HTML.
- `README.md`, `eslint.config.js` — documentação e lint.

Pasta `public/`
- Ativos estáticos (ex.: `vite.svg`).

Pasta `src/`
- `main.jsx` — ponto de entrada da aplicação React.
- `index.css` — estilos globais (Tailwind provável).
- `assets/` — imagens e demais recursos estáticos (`react.svg`, `images/HomeStock.jpg`).

Componentes
- `components/` — componentes organizados por funcionalidade, por exemplo:
  - `PageContainer/` (header, body, root)
  - `Product/` (`ProductModal.jsx`)
  - `Report/` (`ChartsPanel.jsx`)
  - `StockClosure/`, `StockTransaction/`
  - `ui/` — utilitários de UI (`ExportPdf.jsx`, `Footer.jsx`, `MessageModal.jsx`, `SideNav.jsx`, `TopBar.jsx`)

Contextos e providers
- `contexts/` — `CompanyContext.jsx`, `UserContext.jsx` (contextos de aplicação).
- `providers/AppProvider.jsx` — provider central.

Layout e rotas
- `layout/Layout.jsx` — componente de layout principal.
- `routes/` — rotas (`AdminRoute.jsx`, `PrivateRoute.jsx`, `Route.jsx`).

Páginas
- `pages/` — `Dashboard.jsx`, `Home.jsx`, `Settings.jsx`, `StockClosure.jsx`, `StockTransaction.jsx`, e área `Admin/`.
- `pages/Login/` — `Login.jsx`, `CreateAccount.jsx`.

Serviços e integração
- `services/api/` — cliente/API services (`api.services.js`, `auth.services.js`, `stock.service.js`, etc.).
- `services/local-storage/` — `async.storage.js`.

Utilitários
- `utils/` — utilitários como `dateFunctions.util.ts`, `integration.utils.js`, `PDF/pdfGenerator.utils.js`.
