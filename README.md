# Gerenciador de Contatos em Node.js

Este é um projeto simples desenvolvido para a disciplina de Arquitetura de Software (AS64B), ministrada pelo professor Diego Addan. O objetivo do projeto é criar um sistema básico de gerenciamento de contatos utilizando Node.js.

## Funcionalidades

O sistema oferece as seguintes funcionalidades:

- Adicionar contatos
- Remover contatos
- Listar contatos
- Buscar contatos por nome

## Padrões de Projeto Utilizados

### Strategy

O padrão Strategy foi escolhido para implementar diferentes estratégias de busca de contatos. A classe `BuscaContatoStrategy` atua como uma interface comum para todas as estratégias. Neste projeto, a estratégia de busca por nome foi implementada. A principal vantagem do padrão Strategy é a capacidade de alterar dinamicamente o algoritmo de busca, tornando o sistema mais flexível e fácil de estender. Por exemplo, caso seja desejado adicionar a capacidade de busca por telefone no futuro, basta criar uma nova classe que implemente a interface `BuscaContatoStrategy`.

### Facade

O padrão Facade foi escolhido devido à sua facilidade de uso. Ele fornece uma interface simplificada para o sistema de gerenciamento de contatos. A classe `GerenciadorContatosFacade` oferece métodos como adicionar, remover, listar e buscar contatos. A principal vantagem do Facade é simplificar o entendimento do código, permitindo que os usuários não precisem se preocupar com os detalhes de implementação de cada método, utilizando o Facade como único ponto de entrada para o sistema.

## Como Usar

1. Baixe o código.
2. Instale os pacotes do Node.js com o comando `npm install`.
3. Execute o arquivo com o comando `node app.js`.
4. Abra o navegador e acesse o seguinte endereço: `localhost:3000`.
5. Recarregue a página e acompanhe o terminal da sua IDE.
6. Interaja com o menu de opções, digitando o número correspondente à opção desejada.
