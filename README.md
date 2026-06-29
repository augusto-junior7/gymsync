# GymSync - Trabalho Prático - Programação para Web (INE5646) 2026.1

### Grupo: 10
### Alunos: Augusto Roberto Tavares Júnior (25100782), Gabriel Henrique Gonzaga da Silva Lino (25106020) e Matheus Ribeiro do Livramento (25102375)

## Descrição
O GymSync é uma aplicação web full-stack desenvolvida para ser uma ferramenta útil para amadores, entusiastas e profissionais do mundo fitness. O foco da aplicação é fornecer uma experiência intuitiva e que faça sentido para o gerenciamento de rotinas de exercícios, facilitando o acompanhamento das atividades criadas pelo próprio usuário ou compartilhadas por terceiros. O frontend consome a API REST construída no backend para gerenciar esses dados, os usuários e as notificações.

## Tecnologias
### Stack MERN:
* React
  * TailwindCSS
  * SHADCN
* Express
* NodeJS
* MongoDB

## Funcionalidades
* Cadastro e visualização de planos de treino, criando uma “comunidade” de compartilhamento de rotinas; 
  * Será possível defini-los como "público" ou "privado". Mesmo privados, poderão ser compartilhados com usuários específicos, escolhidos pelo autor (semelhante ao Google Drive); 
* Barra de pesquisa de rotinas públicas ("da comunidade") com possibilidade de ordenação por mais recentes, mais salvas, nome (crescente ou decrescente); 
* Página listando todos os exercícios disponíveis;
* Funcionalidade de "notificação": ao receber um pedido de compartilhamento, a pessoa será alertada:
  * Ao clicar em "Aceitar", o plano é adicionado à biblioteca do usuário na aba de "Compartilhados comigo"; 
  * Ao clicar em "Recusar", a solicitação é ignorada.
