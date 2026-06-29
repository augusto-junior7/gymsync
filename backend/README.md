# GymSync - Backend

Este diretório contém a API e a lógica de negócios da aplicação GymSync.

## Configuração de Ambiente (.env)

Para rodar o backend localmente, você precisa configurar algumas variáveis de ambiente.

1. Na raiz da pasta `backend`, crie uma cópia do arquivo `.env.example` e renomeie-a para `.env`.
2. Abra o arquivo `.env` recém-criado e preencha as variáveis com os seus dados:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `FRONTEND_URL` | O endereço onde a interface do usuário (frontend) está rodando. | `http://localhost:5173` |
| `MONGO_URI` | A string de conexão de acesso ao seu banco de dados MongoDB. | `mongodb://localhost:27017/gymsync` |
| `JWT_SECRET` | Uma chave secreta aleatória utilizada para gerar o token JWT (utilizado em autenticação e autorização). | `amo_programacao_web` |
| `EMAIL_USER` | Conta de e-mail do Google (Gmail) que será usada para enviar e-mails pelo sistema (ex: recuperação de senha). | `seuemail@gmail.com` |
| `EMAIL_PASS` | A "Senha de App" gerada nas configurações de segurança do Google para o e-mail acima. (Não é a senha normal do e-mail). | `abcdefghijklmnop` |

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Para rodar o seed (para popular o banco de dados com dados iniciais):
   ```bash
   npm run seed
   ```
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Inicie o frontend. (Veja o arquivo README do frontend para mais informações).
