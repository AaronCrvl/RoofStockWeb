# Tecnologias usadas

- Vite — bundler e dev server moderno para projetos React.
- React 19 — biblioteca de UI.
- React Router DOM — roteamento.
- Axios — chamadas HTTP.
- jsPDF & jspdf-autotable — geração de PDFs.
- react-hook-form — gerenciamento de formulários.
- react-toastify — notificações.
- Tailwind CSS — utilitários de estilo (presente nas dependências).

# Proposta e recomendações

Objetivo
- Aplicação web para controle de estoque e relatórios.

Proposta de melhorias
1. Tipagem: migrar para TypeScript ou padronizar uso de JS (atualmente há pelo menos um arquivo .ts).
2. Testes: adicionar Jest/React Testing Library para cobertura de componentes e serviços.
3. CI/CD: configurar GitHub Actions para lint, build e testes.
4. Documentação: adicionar `CONTRIBUTING.md`, `.env.example` e anotações de arquitetura.
5. Acessibilidade: auditar componentes e melhorar a navegação por teclado e leitores.

Como rodar localmente
1. Instalar dependências: `pnpm install` ou `npm install`.
2. Rodar dev server: `npm run dev`.
