# GymSync - Frontend

Este diretório contém a interface de usuário da aplicação GymSync, construída com React e Vite.

## Configuração de Ambiente (.env)

Para que o frontend consiga se comunicar com a API (backend), você precisa definir onde a API está hospedada.

1. Na raiz da pasta `frontend`, crie uma cópia do arquivo `.env.example` e renomeie-a para `.env` (ou utilize o arquivo existente `.env.development` para rodar localmente).
2. Adicione a seguinte variável de ambiente no arquivo:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `VITE_API_URL` | Armazena a URL base da API do backend. **Atenção:** Coloque o endereço sem a barra (`/`) no final. | `http://localhost:3000` |

Exemplo de como o seu arquivo `.env` deve ficar:
```env
VITE_API_URL=http://localhost:3000
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a aplicação em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
