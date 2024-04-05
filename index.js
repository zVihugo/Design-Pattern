module.exports = () =>{


    //Utilização do readline para que o programa seja interativo
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    class Contato {
        //Aqui basicamente ele cria um novo contato, com  os seguintes atributos: nome, telefone e email
        constructor(nome, telefone, email) {
            this.nome = nome;
            this.telefone = telefone;
            this.email = email;
        }
    }

    //Aqui utilizo o padrão de projeto Strategy, onde crio uma classe que vai implementar estratégias de busca
    class BuscaContatoStrategy {
        
        buscar(contatos, nome) {
            throw new Error("Método 'buscar' deve ser implementado");
        }
    }

    //Estratégia de busca por nome
    class BuscaContatoPorNomeStrategy extends BuscaContatoStrategy {
        
        //Busca um contato pelo nome
        buscar(contatos, nome) {
            return contatos.filter(contato => contato.nome.toLowerCase().includes(nome.toLowerCase()));
        }
    }

   //Classe que gerencia os contatos
    class GerenciadorContatos {
        //Aqui eu crio um array de contatos e defino a estratégia de busca como buscaContatoPorNomeStrategy
        constructor(buscaContatoStrategy = new BuscaContatoPorNomeStrategy()) {
            this.contatos = [];
            this.buscaContatoStrategy = buscaContatoStrategy;
        }

        
        //Aqui eu adiciono um novo contato
        adicionarContato(nome, telefone, email) {
            const novoContato = new Contato(nome, telefone, email);
            this.contatos.push(novoContato);
            console.log(`Contato ${nome} adicionado com sucesso.`);
        }

        //Função de remover
        removerContato(nome) {
            const index = this.contatos.findIndex(contato => contato.nome === nome); //Percorre o array contatos
            if (index !== -1) {
                this.contatos.splice(index, 1);
                console.log(`Contato ${nome} removido com sucesso. \n`);
            } else {
                console.log(`Contato ${nome} não encontrado.`);
            }
        }

       //Função de listar
        listarContatos() {
            console.log("Lista de Contatos:");
            this.contatos.forEach(contato => {
                console.log(`Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email} \n`);
            });
        }

        //Aqui eu busco o contato pelo nome, note que abaixo tenho a chamada da classe buscaContatoStrategy, no qual eu defino acima 
        buscarContato(nome) {
            const resultado = this.buscaContatoStrategy.buscar(this.contatos, nome); // Aqui
            console.log(`Resultado da busca por ${nome}:`);
            if (resultado.length > 0) {
                resultado.forEach(contato => {
                    console.log(`Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email} \n`);
                });
            } else {
                console.log("Nenhum contato encontrado.");
            }
        }
    }

    //Aqui eu utilizo o padrão de projetos Facade, onde eu crio uma classe que vai ser responsável por gerenciar os gerenciadores
    class GerenciadorContatosFacade {
        constructor() {
            this.gerenciadores = [];
        }

        //Adiciona um gerenciador
        adicionarGerenciador(gerenciador) {
            this.gerenciadores.push(gerenciador);
        }

        adicionarContato(nome, telefone, email) {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.adicionarContato(nome, telefone, email);
            });
        }

        //Remove um contato
        removerContato(nome) {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.removerContato(nome);
            });
        }

        listarContatos() {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.listarContatos();
            });
        }

      

        buscarContato(nome) {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.buscarContato(nome);
            });
        }
    }

    //Note que na classe de cima, eu estou utilizando métodos que são implementados em outras classes, isso é o padrão de projetos Facade

    const gerenciadorContatos = new GerenciadorContatos();
    const gerenciador = new GerenciadorContatosFacade();
    gerenciador.adicionarGerenciador(gerenciadorContatos);

    function menu() {
        console.log("\n1. Adicionar contato");
        console.log("2. Remover contato");
        console.log("3. Listar contatos");
        console.log("4. Buscar contato por nome");
        console.log("0. Sair\n");

        rl.question("Escolha uma opção: ", function(opcao) {
            switch(opcao) {
                case '1':
                    rl.question("Nome: ", function(nome) {
                        rl.question("Telefone: ", function(telefone) {
                            rl.question("Email: ", function(email) {
                                gerenciador.adicionarContato(nome, telefone, email);
                                menu();
                            });
                        });
                    });
                    break;
                case '2':
                    rl.question("Nome: ", function(nome) {
                        gerenciador.removerContato(nome);
                        menu();
                    });
                    break;
                case '3':
                    gerenciador.listarContatos();
                    menu();
                    break;
                case '4':
                    rl.question("Nome: ", function(nome) {
                        gerenciador.buscarContato(nome);
                        menu();
                    });
                    break;
                case '0':
                    console.log("Saindo....")
                    rl.close()
                    process.exit()
                    break;
                default:
                    console.log("Opção inválida!");
                    menu();
            }
        });
    }

    menu();

}
