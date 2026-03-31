# Fluxos de Autenticação (Login e Cadastro)

Em uma rede social escolar, o "Cadastro" (Sign Up) é a parte mais sensível. Não podemos ter um botão genérico "Criar Conta" onde qualquer pessoa da internet possa entrar e se passar por um aluno ou tentar interagir com as crianças. O acesso precisa ser blindado e 100% atrelado à Secretaria Física da escola.

Aqui está o fluxo de entrada para cada um dos 4 perfis:

---

## 🏛️ 1. Administração / Diretoria (Role: `ADMIN`)

*   **Cadastro Inicial:** O cadastro da Escola não é feito pelo aplicativo normal. Ele é feito pela central de vendas e implantação da plataforma *Rede Escola*. 
*   A plataforma cria um "Espaço Virtual" (Tenant) para a Escola XYZ e gera o **Admin Mestre** (Diretor/Coordenador de TI).
*   **Login Diário:** 
    *   E-mail Institucional + Senha Forte.
    *   **Exigência de Segurança:** Recomenda-se forte exigência de **Autenticação em 2 Fatores (2FA)** via SMS ou Authenticator App, pois a conta Admin tem acesso a logs de GPS e dados de menores (LGPD).

---

## 👨‍🏫 2. Professores (Role: `TEACHER`)

*   **Cadastro Inicial (Convite):** O professor **não cria** a própria conta do zero. A Secretaria da escola acessa o Painel Admin, vai em "Adicionar Professor" e digita o Nome, CPF e E-mail dele.
*   **Ativação:** O sistema dispara um "Link Mágico" criptografado para o E-mail do professor. Ele clica, abre o aplicativo e só então cadastra sua Senha e Foto de perfil. 
*   **Login Diário:** E-mail ou CPF + Senha. (Pode-se habilitar um botão seguro do "Entrar com Google/Microsoft", já que 99% deles já usam).

---

## 👨‍🎓 3. Alunos (Role: `STUDENT`)

*   **Cadastro Inicial (Código de Acesso Segredo):** Proibido o cadastro livre. A secretaria importa as listas de turmas (Excel/Sistema Acadêmico antigo). Ao fazer isso, o sistema gera o **RA (Registro Acadêmico)** e um PIN inicial para cada aluno (ou usa a Data de Nascimento como validador inicial).
*   **Primeiro Acesso (Onboarding):**
    1. O aluno baixa o App da Rede Escola.
    2. Clica em `"Sou Aluno - Primeiro Acesso"`.
    3. Digita a Matrícula (RA) entregue impressa pela escola + Data de Nascimento.
    4. O sistema reconhece: `"Olá, Pedrinho! Vimos que você está no 7º Ano B. Crie sua senha de acesso e ESCOLHA SEU @NICKNAME"`.
*   **Login Diário:** RA (Matrícula) ou @Nickname + Senha.

---

## 👨‍👩‍👧 4. Pais / Responsáveis (Role: `PARENT`)

*   **Cadastro Inicial (Vinculação Legal):** Assim como o aluno, o cadastro depende da secretaria, que vincula o **CPF do Responsável Financeiro/Legal** ao RA do Aluno (uma dependência de Banco de Dados de 1 -> N, pois um pai pode ter 3 filhos na mesma escola).
*   **Primeiro Acesso (Onboarding + LGPD):**
    1. O pai baixa o App.
    2. Clica em `"Sou Responsável - Primeiro Acesso"`.
    3. Digita o seu CPF. O sistema faz um "Match" e valida por SMS no celular cadastrado na secretaria.
    4. **PASSO CRÍTICO (Termos de Uso):** O primeiro pop-up obrigatório é o Pai assinando digitalmente (dando o Aceite) de que o aplicativo fará o tracking de navegação, chat e rastreio do filho dele para Segurança da Comunidade. Sem o "Eu concordo", a conta não é ativada.
    5. Cadastra a senha final.
*   **Login Diário:** CPF + Senha. (Usar CPF no login reforça o peso "Oficial" e a assinatura da Secretaria Digital em pedidos de documentos).

---

## ⚙️ Resumo do Banco de Dados (Auth Geral)

*Nenhuma conta é isolada. TODA conta na base de dados precisa obrigatoriamente ter uma chave estrangeira de `school_id` (Id da Escola), impossibilitando que um Aluno da 'Escola A' faça login no ambiente, feed ou grupos da 'Escola B'.*
