> 🚨🚨🚨 **ATENÇÃO!** 🚨🚨🚨
>
> 🔴 **SE FOR RODAR O PROJETO LOCALMENTE UTILIZE A BRANCH `dev`** 🔴

# Desafio Técnico Aiqfome: Front-end Mobile✨

## 📋 Descrição do Projeto

Este projeto é a solução para o desafio técnico da Aiqfome para a vaga de Desenvolvedor Front-end. O objetivo principal é prototipar uma aplicação web com foco total na experiência mobile, demonstrando conhecimento em React, Next.js (com ênfase em Server Components), organização de código e usabilidade.

## 🚀 Funcionalidades Implementadas

- **Listagem de Produtos**: Exibe produtos categorizados com suas respectivas informações (título, imagem, preço e review).
- **Adição ao Ticket**: Permite adicionar produtos e suas opções ao carrinho (ticket).
- **Visualização do Ticket**: Apresenta um resumo claro dos itens adicionados, com a possibilidade de edição de quantidade e observações.
- **Persistência de Dados Local**: Os dados do ticket são armazenados localmente no navegador, garantindo que o usuário não perca suas informações ao recarregar a página.

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.3+**: Framework React para desenvolvimento web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Local Storage**: Para persistência de dados no navegador.

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

```bash
git clone https://github.com/JoaumVictor/aiqfome-challenge
cd aiqfome-challenge

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Execute o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em http://localhost:3000.

> 🚨🚨🚨 **ATENÇÃO!** 🚨🚨🚨
>
> 🔴 **SE FOR RODAR O PROJETO LOCALMENTE UTILIZE A BRANCH `dev`** 🔴

## 📦 Estrutura de Pastas

A organização do projeto segue a estrutura padrão do Next.js com o diretório `src`:

```
aiqfome-challenge/
├── public/                     # Arquivos estáticos
├── src/
│   ├── app/                    # Rotas e layout do Next.js (App Router)
│   │   ├── cart/
│   │   │   └── page.tsx        # Página do ticket (/cart)
│   │   ├── stores\[storeId]/
│   │   │   ├── item\[itemId]/  # Página do produto específico
│   │   │   │   └── page.tsx    # (/stores/[storeId]/item/[itemId])
│   │   │   └── page.tsx        # Página da loja (/stores/[storeId])
│   │   ├── favicon.ico
│   │   ├── globals.css         # Estilos globais (Tailwind)
│   │   ├── layout.tsx          # Layout raiz do App
│   │   └── page.tsx            # Página inicial (/)
│   ├── components/             # Componentes reutilizáveis e por domínio
│   │   ├── cart/               # Componentes do ticket
│   │   ├── layout/             # Componentes de layout (Header, Footer, etc.)
│   │   ├── productOptions/     # Componentes de opções de produto
│   │   ├── shared/             # Outros componentes auxiliares
│   │   ├── skeletons/          # Skeletons para carregamento
│   │   ├── store/              # Componentes da página de loja
│   │   └── ui/                 # Componentes genéricos de interface
│   ├── contexts/               # Context API (ex: CartContext)
│   ├── hooks/                  # Hooks personalizados
│   ├── lib/                    # Funções utilitárias e lógica de negócio
│   ├── mocks/                  # Dados mockados (ex: produtos)
│   └── types/                  # Tipagens TypeScript
├── tailwind.config.ts          # Configuração do Tailwind CSS
├── tsconfig.json
└── package.json

```

## ✨ Pontos de Destaque

- **Experiência Mobile First**: O layout e a interatividade foram pensados primeiramente para dispositivos móveis, garantindo fluidez e usabilidade.
- **Server Components**: Exploração dos benefícios dos Server Components do Next.js para otimização de renderização e desempenho.
- **Design System**: Utilização do Tailwind CSS com um sistema de cores e espaçamentos customizados para garantir consistência visual.
- **Responsividade**: A interface se adapta a diferentes tamanhos de tela, proporcionando uma experiência consistente em múltiplos dispositivos.

## 📝 Observações

- Os dados dos produtos são mockados localmente em um arquivo `.json` (ex: `src/mocks/products.json`).
