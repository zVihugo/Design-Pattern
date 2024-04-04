Documentação do Projeto
  Este é um projeto simples, solicitado em sala pelo professor Diego Addan da disciplina de Arquitetura de Software (AS64B), o projeto tem como finalidade o desenvolvimento de um sistema simples de gerenciamento de contatos em node.js.
  Tem como funcionalidades: Adcionar, remover, listar e buscar contatos.

Padrões de projeto utilizados:

Strategy:
   O padrão foi escolhido para implementar diferentes estratégias de busca de contatos. Temos presente dentro do nosso código, uma classe chamada BuscaContatoStrategy que é uma interface comum para todas estratégias, neste projeto, utilizei a estratégia de busca por nome.
   A principal vantagem ao utilizar o strategy é que ele permite que o algoritmo de busca seja alterado dinamicamente. Tornando o sistema mais flexível e e fácil de estender. 
   Um exemplo da principal vantagem é que caso no futuro, quisermos adicionar a capacidade de buscar por telefone, podemos simplesmente criar uma nova classe que implementa a interface BuscaContatoStrategy

Facade:
  O padrão foi escolhido devido a facilidade na utilização, ele fornece uma interface simplificada para o sistema de gerenciamento de contatos. Temos no nosso projeto a classe GerenciadorContatosFacade que fonece métodos como adiconar, remover, listar e buscar contatos. 
  A principal vantagem é que ele simplifica o entendimento do código, fazendo com que, os possíveis usuários, não se preocupem com o detalhe de como é realizado cada método, só utilizem o facade como unico ponto de entrada para o sistema.


Como usar?

  Baixe o código
  instale o pacote do node com o comando "npm init"
  Execute o arquivo com o comando "node app.js"
  Abra no seu navegador o seguinte caminho "localhost:3000"
  Recarregue a página e olhe no terminal da sua IDE
  Interaja com o menu de opções. Podendo escolher a opção digitando o número correspondente
  
  
   
