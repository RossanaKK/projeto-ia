# Projeto: Plataforma IA - Chatbot Integrado

Este projeto consiste numa interface de chat desenvolvida em React, integrada com a API do Google Gemini, criada no âmbito do CTeSP de Tecnologias e Programação de Sistemas de Informação (TPSI) da Universidade da Madeira, para a disciplina de Desenvolvimento Web - Front-End.

---

## 🛠️ Tecnologias Utilizadas
* **React (com Vite):** Framework principal para a construção da interface de utilizador.
* **TypeScript:** Garantia de tipagem estática e robustez do código.
* **Google Generative AI SDK:** Integração com o modelo `gemini-2.5-flash` para processamento de linguagem natural.
* **Firebase Authentication:** Proteção de rotas e gestão de utilizadores.
* **Bootstrap:** Estilização responsiva e componentes UI.
* **Recharts:** Biblioteca de gráficos utilizada para o Dashboard de estatísticas.
* **React Context API:** Gestão de estado global (perguntas, respostas, temas e métricas).

---

## 🧠 Arquitetura e Decisões Técnicas

Durante o desenvolvimento, foram tomadas decisões focadas na robustez do sistema e no cumprimento dos requisitos do enunciado:

**1. Sincronização de Estado e UX:**
Manteve-se o alinhamento entre os arrays de `perguntas` e `respostas`. Para melhorar a experiência do utilizador, implementou-se uma resposta temporária (*"A pensar..."*). Isto garante que o utilizador tem feedback imediato e que as listas mantêm o mesmo comprimento para a renderização via `.map()`.

**2. Navegação SPA (Single Page Application):**
Para evitar a perda de dados armazenados no Contexto (como o histórico e as métricas), substituiu-se o uso de tags `<a>` pelo componente `<Link>` do `react-router-dom`. Isto garante uma navegação instantânea sem *refresh* da página, mantendo o estado da aplicação "vivo".

**3. Dashboard e Monitorização (Recharts):**
Implementou-se uma página de Dashboard que consome dados globais do contexto. Utilizou-se a biblioteca **Recharts** para desenhar um gráfico de barras responsivo que compara o número de pedidos com o tempo médio de resposta.

**4. Medição de Performance:**
O sistema calcula o tempo de carregamento da API utilizando `Date.now()` antes e depois da chamada assíncrona. O cálculo é feito dentro de um bloco `finally` para garantir que, mesmo em caso de erro da API (High Demand), o pedido e o tempo gasto sejam contabilizados nas estatísticas.

**5. Tratamento de Erros:**
Reforço com blocos `try...catch` para gerir erros HTTP 503 e 429 da API Gemini, informando o utilizador através de mensagens amigáveis na interface em vez de falhas silenciosas.

**6. Segurança e Statelessness:**
- Uso de ficheiros `.env` para proteção da API Key.
- Reconhecimento da natureza *stateless* do método `generateContent`, justificando a ausência de memória entre pedidos isolados e a ocorrência de respostas genéricas (*fallbacks*).

**7. Otimização e "Clean Code":**
Na fase final de desenvolvimento, o código dos componentes foi alvo de refatorização para aplicar princípios de *Clean Code* (como o DRY - *Don't Repeat Yourself*). Foram eliminadas redundâncias, como a remoção de verificações duplas de autenticação no componente de chat (uma vez que a proteção já é garantida pelo Router no `App.tsx`), e adotou-se o *Destructuring* de objetos para o consumo da Context API. Estas otimizações reduziram significativamente a complexidade visual e o número de linhas de código, tornando a aplicação mais leve e fácil de manter.

---

## 🚀 Como Executar o Projeto

1. Clonar o repositório.
2. Criar um ficheiro `.env` na raiz do projeto e adicionar a chave da API:
   `VITE_GEMINI_API_KEY=sua_chave_aqui`
3. Instalar as dependências (incluindo Recharts):
   `npm install`
4. Iniciar o servidor de desenvolvimento:
   `npm run dev`

---
*Projeto desenvolvido para a Universidade da Madeira - 2026*
