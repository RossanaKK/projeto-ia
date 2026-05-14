# Projeto: Plataforma IA - Assistente Virtual e Dashboard

Este projeto consiste numa aplicação web desenvolvida em React, integrada com a API do Google Gemini, criada no âmbito do CTeSP de Tecnologias e Programação de Sistemas de Informação (TPSI) da Universidade da Madeira, para a disciplina de Desenvolvimento Web - Front-End.

---

## 🎯 Domínio e Problema de Aplicação

O projeto foi concebido para resolver a necessidade de centralizar o apoio à produtividade e à aprendizagem numa única plataforma acessível e segura. O domínio de aplicação foca-se na produtividade académica e pessoal. O problema central que resolve é a dispersão de ferramentas: este assistente virtual permite, na mesma interface, interpretar e aprender as linguagens de programação lecionadas no contexto universitário, ajudar na resolução e reflexão sobre exercícios de forma interativa.

---

## 📂 Organização e Estruturação do Projeto

O projeto segue uma arquitetura modular típica do React, separando responsabilidades de forma lógica:

* `src/components/`: Contém os componentes visuais reutilizáveis da aplicação.
  * `ChatScreen.tsx`: Interface principal de conversação com a IA.
  * `Dashboard.tsx`: Página de visualização de métricas e gráficos.
  * `Header.tsx` / `Footer.tsx` / `LeftMenu.tsx`: Componentes de layout e navegação base.
  * `Login.tsx` / `Unauthorized.tsx`: Componentes para gestão de acesso e feedback ao utilizador.
* `src/config/`: Contém a configuração de serviços externos.
  * `firebase.ts`: Inicialização e exportação da instância de autenticação do Firebase.
* `src/styles/`: Ficheiros de estilização global.
  * `theme.css`: Classes para gestão dos modos Claro, Escuro e Azul.
* `src/App.tsx`: Ponto de entrada que gere o *Routing* (react-router-dom) e os provedores de estado global (Context API).

---

## 🛠️ Tecnologias Utilizadas

* **React (Vite) & TypeScript:** Construção da interface de utilizador com garantia de tipagem estática.
* **Google Generative AI SDK:** Integração com o modelo `gemini-2.5-flash`.
* **Firebase Authentication:** Proteção de rotas e gestão de utilizadores.
* **Bootstrap:** Estilização responsiva e componentes UI.
* **Recharts:** Biblioteca de gráficos dinâmicos para o Dashboard.
* **React Context API:** Gestão de estado global (perguntas, respostas, temas e métricas).

---

## 🧠 Arquitetura e Decisões Técnicas

**1. Sincronização de Estado e UX:**
Manteve-se o alinhamento entre os arrays de `perguntas` e `respostas`. Para melhorar a experiência do utilizador, implementou-se uma resposta temporária (*"A pensar..."*). Isto garante que o utilizador tem feedback imediato e que as listas mantêm o mesmo comprimento para a renderização via `.map()`.

**2. Navegação SPA (Single Page Application):**
Para evitar a perda de dados armazenados no Contexto (como o histórico e as métricas do Dashboard), substituiu-se o uso de tags `<a>` pelo componente `<Link>` do `react-router-dom`. Isto garante uma navegação instantânea sem *refresh* da página.

**3. Dashboard e Monitorização (Recharts):**
Implementou-se uma página de Dashboard que consome dados globais do contexto. Utilizou-se a biblioteca **Recharts** para desenhar um gráfico de barras responsivo que compara o número de pedidos com o tempo médio de resposta da API.

**4. Medição de Performance e Bloco *Finally*:**
O sistema calcula o tempo de processamento da API utilizando `Date.now()` antes e depois da chamada. Este cálculo, bem como a incrementação do número de pedidos, é executado no bloco `finally` para garantir que, mesmo em caso de erro da API, a interação e o tempo gasto sejam contabilizados nas estatísticas.

**5. Tratamento de Erros de API:**
Reforço com blocos `try...catch` para gerir erros HTTP 503 e 429 ("High Demand") da API Gemini. A aplicação evita crashar, devolvendo mensagens em texto no próprio chat a pedir ao utilizador para aguardar.

**6. Comportamento *Stateless* e Segurança:**
O uso do ficheiro `.env` isola a API Key. Adicionalmente, identificou-se que a comunicação atual através de `generateContent` opera de forma *stateless* (amnésia de contexto entre mensagens), o que justifica a eventual ocorrência de respostas genéricas (*fallbacks*) caso o modelo assuma tratar-se de um primeiro contacto isolado.

**7. Otimização e "Clean Code":**
Na fase final de desenvolvimento, o código dos componentes foi alvo de refatorização. Foram eliminadas redundâncias, como verificações duplas de autenticação no componente de chat (uma vez que a proteção já é garantida pelo Router no `App.tsx`), e adotou-se o *Destructuring* de objetos para o consumo da Context API, reduzindo drasticamente a complexidade visual.

**8. Gestão de Estado e Ciclo de Vida (React Hooks):**
A aplicação faz um uso extensivo e estratégico de React Hooks para garantir componentes puramente funcionais e reativos:
* **`useState`:** Utilizado para gerir estados locais e efémeros que afetam apenas a renderização do próprio componente, como o controlo do *input* de texto e o estado de carregamento (`loading`) no `ChatScreen`.
* **`useContext`:** Adotado para resolver o problema de *prop drilling*. Em vez de passar variáveis de componente em componente, criou-se um estado global no `App.tsx` que fornece dados transversais (histórico de mensagens, métricas de performance e o tema escolhido) diretamente a componentes isolados como o `Dashboard` e o `LeftMenu`.
* **`useEffect`:** Implementado para gerir efeitos secundários e subscrições externas à árvore de renderização. Foi vital no `App.tsx` para invocar o observador `onAuthStateChanged` da Firebase apenas na montagem inicial do componente, garantindo que a verificação de sessão não causa re-renderizações infinitas.
* **`useNavigate` e `useLocation`:** Hooks do *react-router-dom* aplicados para roteamento dinâmico. O `useNavigate` assegura redirecionamentos programáticos (ex: expulsar utilizadores não logados), enquanto o `useLocation` lê a rota atual para destacar visualmente a página ativa no menu lateral.

---

## 🔐 Credenciais de Teste

Para facilitar a navegação, foram previamente configuradas contas de demonstração, apesar também poder criar um novo registo. É possível utilizar qualquer uma das seguintes credenciais de acesso:

**Utilizador de Teste 1:**
* **Email:** teste@gmail.com
* **Password:** 123456789

**Utilizador de Teste 2:**
* **Email:** teste1@gmail.com
* **Password:** 123456789

*(Nota: Ambas as contas têm acesso total ao Chat e ao Dashboard de estatísticas).*

---

## 📖 Guia de Utilização (Como usar a aplicação)

1. **Acesso:** Ao abrir a aplicação, o utilizador deve efetuar a autenticação via Firebase (Login). Utilizadores não autenticados são redirecionados para fora da área de chat.
2. **Navegação:** O menu lateral esquerdo permite alternar fluidamente entre as abas "Chat" e "Dashboard", além de apresentar um histórico das mensagens enviadas durante a sessão ativa.
3. **Conversação:** No ecrã principal de Chat, basta digitar o *prompt* e pressionar "Enviar". Um balão provisório aparecerá enquanto o sistema processa a resposta da IA.
4. **Análise de Dados:** Ao aceder ao separador Dashboard, o utilizador pode visualizar em tempo real o volume de pedidos enviados à IA e o tempo médio de carregamento dos mesmos.
5. **Personalização Visual:** No fundo do menu lateral, encontram-se botões para alternar dinamicamente a paleta de cores de toda a aplicação (Claro, Escuro e Azul).

---

## 🚀 Como Executar o Projeto

1. Clonar o repositório.
2. Criar um ficheiro `.env` na raiz do projeto e adicionar a chave da API:
   `VITE_GEMINI_API_KEY=sua_chave_aqui`
3. Instalar as dependências necessárias:
   `npm install`
4. Iniciar o servidor de desenvolvimento local:
   `npm run dev`
