# Projeto: Plataforma IA - Chatbot Integrado

Este projeto consiste numa interface de chat desenvolvida em React, integrada com a API do Google Gemini, criada no âmbito do CTeSP de Tecnologias e Programação de Sistemas de Informação (TPSI) da Universidade da Madeira, para Desenvolvimento Web - Front-End.

---


## 🛠️ Tecnologias Utilizadas
* **React (com Vite):** Framework principal para a construção da interface de utilizador.
* **TypeScript:** Utilizado para garantir a tipagem estática e maior robustez do código.
* **Google Generative AI SDK:** Integração com o modelo `gemini-2.5-flash` para processamento de linguagem natural.
* **Firebase Authentication:** Proteção de rotas, garantindo que o chat apenas é acessível a utilizadores autenticados.
* **Bootstrap:** Estilização, layout flexível (Flexbox) e responsividade.
* **React Context API:** Gestão de estado global (perguntas, respostas e temas).

---

## 🧠 Arquitetura e Decisões Técnicas

Durante o desenvolvimento, foram tomadas decisões arquiteturais focadas na robustez, na experiência do utilizador (UX) e no rigor das metodologias lecionadas em aula:

**1. Sincronização de Estado (O problema das listas assimétricas):**
Em vez de utilizar uma única estrutura de objetos complexos, manteve-se a abordagem baseada em duas listas (arrays) geridas pelo Contexto (`perguntas` e `respostas`). Para evitar erros de índice (quando a IA demora a responder), implementou-se a inserção de uma resposta temporária (*"A pensar..."*). Isto garante que as listas têm sempre o mesmo comprimento, sendo a resposta temporária posteriormente atualizada com o texto final da IA.

**2. Renderização Condicional e UX:**
A mensagem inicial de boas-vindas foi configurada para desaparecer dinamicamente assim que o array de perguntas deixa de estar vazio (`perguntas.length === 0`). Para a estrutura do chat, utilizou-se o método de iteração nativo do React (`.map()`), alinhando as mensagens do utilizador à direita e as da IA à esquerda através de classes do Bootstrap (`justify-content-end` e `justify-content-start`).

**3. Tratamento de Erros e Limites de API (Rate Limiting):**
Sendo a API do Gemini (Free Tier) suscetível a picos de tráfego, o uso crucleal de blocos `try...catch` foi reforçado com a interceção de erros HTTP 503 e 429 ("High Demand"). Em vez de a aplicação falhar (crash), o utilizador recebe uma notificação visual (na própria interface de chat) a pedir para aguardar, mantendo a estabilidade do sistema.

**4. Segurança das Credenciais:**
A chave da API da Google foi isolada num ficheiro `.env` e acedida via `import.meta.env.VITE_GEMINI_API_KEY`. Isto garante que as credenciais não ficam expostas no código-fonte em repositórios públicos.

**5. Comportamento do Modelo e Ausência de Estado (Statelessness):**
A comunicação atual com a API através do método `generateContent` opera de forma "stateless", ou seja, não retém memória do histórico da conversa. Cada envio é processado como um pedido isolado (amnésia de contexto), o que explica a repetição ocasional de saudações por parte da IA. Adicionalmente, como o modelo não tem acesso à internet em tempo real para dados dinâmicos (como meteorologia exata), foi observado que a IA utiliza mecanismos de *fallback* (respostas genéricas de preenchimento) ou baseia-se em dados históricos de treino (alucinação leve) para colmatar a ausência de informação imediata. Esta é uma característica inerente ao funcionamento atual dos LLMs (Large Language Models) nesta configuração simples.

---

## 🚀 Como Executar o Projeto

1. Clonar o repositório.
2. Criar um ficheiro `.env` na raiz do projeto e adicionar a chave da API:
   `VITE_GEMINI_API_KEY=sua_chave_aqui`
3. Instalar as dependências:
   `npm install`
4. Iniciar o servidor de desenvolvimento:
   `npm run dev`

---
*Projeto desenvolvido para a Universidade da Madeira - 2026*
