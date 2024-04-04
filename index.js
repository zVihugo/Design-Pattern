module.exports = () =>{



    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    /**
     * Classe que representa um contato.
     */
    class Contato {
        /**
         * Cria um novo contato.
         * @param {string} nome - O nome do contato.
         * @param {string} telefone - O telefone do contato.
         * @param {string} email - O email do contato.
         */
        constructor(nome, telefone, email) {
            this.nome = nome;
            this.telefone = telefone;
            this.email = email;
        }
    }

    /**
     * Classe abstrata para estratégias de busca de contatos.
     */
    class BuscaContatoStrategy {
        /**
         * Busca um contato.
         * @param {Array} contatos - A lista de contatos.
         * @param {string} nome - O nome do contato a ser buscado.
         * @throws {Error} Lança um erro se o método não for implementado.
         */
        buscar(contatos, nome) {
            throw new Error("Método 'buscar' deve ser implementado");
        }
    }

    /**
     * Estratégia de busca de contatos por nome.
     * @extends BuscaContatoStrategy
     */
    class BuscaContatoPorNomeStrategy extends BuscaContatoStrategy {
        /**
         * Busca um contato por nome.
         * @param {Array} contatos - A lista de contatos.
         * @param {string} nome - O nome do contato a ser buscado.
         * @returns {Array} A lista de contatos que correspondem ao nome.
         */
        buscar(contatos, nome) {
            return contatos.filter(contato => contato.nome.toLowerCase().includes(nome.toLowerCase()));
        }
    }

    /**
     * Classe que gerencia contatos.
     */
    class GerenciadorContatos {
        /**
         * Cria um novo gerenciador de contatos.
         * @param {BuscaContatoStrategy} buscaContatoStrategy - A estratégia de busca de contatos.
         */
        constructor(buscaContatoStrategy = new BuscaContatoPorNomeStrategy()) {
            this.contatos = [];
            this.buscaContatoStrategy = buscaContatoStrategy;
        }

        /**
         * Adiciona um contato.
         * @param {string} nome - O nome do contato.
         * @param {string} telefone - O telefone do contato.
         * @param {string} email - O email do contato.
         */
        adicionarContato(nome, telefone, email) {
            const novoContato = new Contato(nome, telefone, email);
            this.contatos.push(novoContato);
            console.log(`Contato ${nome} adicionado com sucesso.`);
        }

        /**
         * Remove um contato.
         * @param {string} nome - O nome do contato.
         */
        removerContato(nome) {
            const index = this.contatos.findIndex(contato => contato.nome === nome);
            if (index !== -1) {
                this.contatos.splice(index, 1);
                console.log(`Contato ${nome} removido com sucesso. \n`);
            } else {
                console.log(`Contato ${nome} não encontrado.`);
            }
        }

        /**
         * Lista todos os contatos.
         */
        listarContatos() {
            console.log("Lista de Contatos:");
            this.contatos.forEach(contato => {
                console.log(`Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email} \n`);
            });
        }

        /**
         * Busca um contato.
         * @param {string} nome - O nome do contato.
         */
        buscarContato(nome) {
            const resultado = this.buscaContatoStrategy.buscar(this.contatos, nome);
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

    /**
     * Classe que fornece uma fachada para gerenciar contatos.
     */
    class GerenciadorContatosFacade {
        constructor() {
            this.gerenciadores = [];
        }

        /**
         * Adiciona um gerenciador de contatos.
         * @param {GerenciadorContatos} gerenciador - O gerenciador de contatos.
         */
        adicionarGerenciador(gerenciador) {
            this.gerenciadores.push(gerenciador);
        }

        /**
         * Adiciona um contato.
         * @param {string} nome - O nome do contato.
         * @param {string} telefone - O telefone do contato.
         * @param {string} email - O email do contato.
         */
        adicionarContato(nome, telefone, email) {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.adicionarContato(nome, telefone, email);
            });
        }

        /**
         * Remove um contato.
         * @param {string} nome - O nome do contato.
         */
        removerContato(nome) {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.removerContato(nome);
            });
        }

        /**
         * Lista todos os contatos.
         */
        listarContatos() {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.listarContatos();
            });
        }

        /**
         * Busca um contato.
         * @param {string} nome - O nome do contato.
         */
        buscarContato(nome) {
            this.gerenciadores.forEach(gerenciador => {
                gerenciador.buscarContato(nome);
            });
        }
    }

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