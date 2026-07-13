/*==========================================================
  BANCO DE DADOS
  Camada de acesso aos dados
==========================================================*/

class BancoDados {

    constructor() {

        this.imoveis = [];

    }

    /*======================================================
      Carrega os dados
    ======================================================*/

    async carregar() {

        try {

            const resposta = await fetch("dados/imoveis.json");

            if (!resposta.ok) {

                throw new Error("Erro ao carregar a base de dados.");

            }

            this.imoveis = await resposta.json();

            return this.imoveis;

        }

        catch (erro) {

            console.error(erro);

            this.imoveis = [];

            return [];

        }

    }

    /*======================================================
      Retorna todos os imóveis
    ======================================================*/

    listar() {

        return [...this.imoveis];

    }

    /*======================================================
      Localiza um imóvel pelo código
    ======================================================*/

    localizar(codigo) {

        return this.imoveis.find(

            item => String(item.codigo) === String(codigo)

        );

    }

    /*======================================================
      Pesquisa dinâmica (Contains)
    ======================================================*/

    pesquisar(filtro) {

        return this.imoveis.filter(imovel => {

            return this.contains(imovel.codigo, filtro.codigo)

                && this.contains(imovel.inscricao, filtro.inscricao)

                && this.contains(imovel.tipoLogradouro, filtro.tipoLogradouro)

                && this.contains(imovel.logradouro, filtro.logradouro)

                && this.contains(imovel.quadra, filtro.quadra)

                && this.contains(imovel.lote, filtro.lote);

        });

    }

    /*======================================================
      Adiciona um novo imóvel
    ======================================================*/

    adicionar(imovel) {

        this.imoveis.push(imovel);

        return imovel;

    }

    /*======================================================
      Atualiza um imóvel existente
    ======================================================*/

    atualizar(codigo, novosDados) {

        const indice = this.imoveis.findIndex(

            item => String(item.codigo) === String(codigo)

        );

        if (indice === -1) {

            return false;

        }

        this.imoveis[indice] = {

            ...this.imoveis[indice],

            ...novosDados

        };

        return true;

    }

    /*======================================================
      Exclui um imóvel
    ======================================================*/

    excluir(codigo) {

        this.imoveis = this.imoveis.filter(

            item => String(item.codigo) !== String(codigo)

        );

    }

    /*======================================================
      Pesquisa "Contains"
    ======================================================*/

    contains(valorBanco, valorPesquisa) {

        if (

            valorPesquisa === null ||

            valorPesquisa === undefined ||

            valorPesquisa === ""

        ) {

            return true;

        }

        if (

            valorBanco === null ||

            valorBanco === undefined

        ) {

            return false;

        }

        return valorBanco

            .toString()

            .toUpperCase()

            .includes(

                valorPesquisa

                    .toString()

                    .toUpperCase()

            );

    }

}

/*==========================================================
  Instância Global
==========================================================*/

const banco = new BancoDados();