# Wireframes e Roadmap de Lançamento - Rede Escola

Este documento descreve as estruturas de tela baseadas nos diagramas de wireframe e o cronograma de fases do projeto.

---

## 🗺️ Roadmap de Lançamento (Fases do Projeto)

Para garantir o sucesso sem sobrecarregar a escola ou adiar muito o lançamento, o aplicativo será dividido em 3 fases:

### 🟢 Fase 1 — MVP (0–3 meses)
*O núcleo que valida o produto e fecha o primeiro contrato.*
*   **Feed escolar:** Posts oficiais da escola e professores.
*   **Notificações Push:** Envios de comunicados urgentes para as famílias.
*   **Secretaria Digital:** Solicitação básica de documentos sem ir à escola.

### 🟣 Fase 2 — Engajamento (3–6 meses)
*Depois de ter escolas ativas e feedback real.*
*   **DMs + Auditoria:** Chat entre alunos com painel de logs.
*   **Grupos / Turmas:** Comunidades por série ou clube/matéria.
*   **Notas e Presença:** Lançamento diário pelo professor.

### 🟠 Fase 3 — IA e Escala (6–12 meses)
*Recursos pesados e avançados só com receita recorrente base instalada.*
*   **Filtro NLP:** Moderação automática de texto.
*   **Visão Computacional:** Bloqueio de imagens impróprias.
*   **GPS + Tracking:** Painel de logs de acesso e geolocalização exata.

---

## 📱 Estrutura de Telas (Wireframes)

Abaixo descrevemos o fluxo de navegação e as telas principais, com foco inicial na visão da **Administração/Diretoria**.

### 1. Mapa do Aplicativo (Sitemap)
*   **Login** -> Redireciona para o **Dashboard Principal**
*   Do Dashboard, saem os ramais principais:
    *   **Feed Escolar** -> *Nova Publicação*
    *   **Notificações** -> *Novo Comunicado*
    *   **Secretaria Digital** -> *Responder Pedido*
    *   **Usuários** (Alunos, Pais, Profs) -> *Cadastrar Usuário*
*   **Menu Global (Acessível de qualquer tela):** Perfil da escola, Configurações, Suporte/Ajuda, Alertas.

---

### 2. Tela Inicial (Dashboard da Diretoria)
**Aba selecionada:** Início

*   **Cabeçalho:** Saudação personalizada ("Bom dia, Diretora Ana") com foto de perfil e data atual.
*   **Bloco "Resumo de Hoje" (Cards de métricas):**
    *   Alunos ativos (ex: 312 de 340 matriculados).
    *   Docs pendentes (ex: 7 aguardando resposta).
    *   Professores ativos hoje (ex: 18).
    *   Responsáveis com cadastros confirmados (ex: 204).
*   **Bloco "Ações Rápidas" (Botões horizontais):**
    *   Novo comunicado (Azul)
    *   Secretaria (Amarelo)
    *   Novo post (Verde)
    *   Usuários (Cinza)
*   **Bloco "Pendências":**
    *   Aviso de X solicitações de documentos aguardando resposta.
    *   Lembrete de reuniões agendadas com responsáveis.
*   **Bloco "Feed Recente":**
    *   Pré-visualização das 2 últimas postagens (ex: Professora de Matemática marcou prova; Escola avisando sobre feriado).
*   **Menu de Navegação Inferior (Bottom Tabs):**
    *   *Início / Feed / Secretaria / Usuários / Config*

---

### 3. Tela da Secretaria Digital (Visão Administração)
**Aba selecionada:** Secretaria

*   **Cabeçalho:** Título "Secretaria digital".
*   **Bloco "Resumo" (Filtros superiores):**
    *   Novos pedidos (Vermelho - ex: 7)
    *   Em andamento (Amarelo - ex: 3)
    *   Concluídos (Verde - ex: 24)
*   **Lista de "Solicitações Pendentes" (Cards contendo):**
    *   Foto de perfil do requerente.
    *   Nome do requerente (ex: Carlos Souza).
    *   Tipo de solicitação e aluno atrelado (ex: Declaração de matrícula - João, 4º A).
    *   Tempo desde a solicitação (ex: Solicitado há 10 min).
    *   *Tag de status visual* ("Novo" ou "Pendente").
*   **Botão Flutuante/Fixo Inferior:**
    *   "Responder próximo pedido" (Chamada para ação principal do administrador).
*   **Menu de Navegação Inferior (Bottom Tabs):** Mantém o padrão global do app.
