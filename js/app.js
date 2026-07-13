/*==========================================================
    APP.JS
    Controlador Principal da Aplicação
==========================================================*/

const App = {

    nome: "Sistema de Cadastro de Imóveis",

    versao: "1.0.0",

    iniciado: false,

    /*======================================================
        Inicialização
    ======================================================*/

    async iniciar() {

        if (this.iniciado)
            return;

        console.log("--------------------------------");

        console.log(this.nome);

        console.log("Versão:", this.versao);

        console.log("--------------------------------");

        Util.mostrarLoading();

        try {

            await banco.carregar();

            this.configurarEventosGlobais();

            this.configurarAtalhos();

            this.configurarTabela();

            this.atualizarRodape();

            this.iniciado = true;

        }

        catch (erro) {

            console.error(erro);

            Util.erro("Erro ao inicializar a aplicação.");

        }

        finally {

            Util.ocultarLoading();

        }

    },

    /*======================================================
        Eventos Globais
    ======================================================*/

    configurarEventosGlobais() {

        window.addEventListener(

            "error",

            (erro) => {

                console.error(erro);

            }

        );

        window.addEventListener(

            "beforeunload",

            (e) => {

                if (typeof alterado !== "undefined" && alterado) {

                    e.preventDefault();

                    e.returnValue = "";

                }

            }

        );

    },

    /*======================================================
        Atalhos de Teclado
    ======================================================*/

    configurarAtalhos() {

        document.addEventListener(

            "keydown",

            (e) => {

                if (e.key === "Escape") {

                    const btn = document.getElementById("btnCancelar");

                    if (btn)
                        btn.click();

                }

                if (e.ctrlKey && e.key === "s") {

                    e.preventDefault();

                    const btn = document.getElementById("btnSalvarFormulario");

                    if (btn)
                        btn.click();

                }

                if (e.ctrlKey && e.key === "f") {

                    e.preventDefault();

                    const txt = document.getElementById("txtCodigo");

                    if (txt)
                        txt.focus();

                }

            }

        );

    },

    /*======================================================
        Configura tabela
    ======================================================*/

    configurarTabela() {

        document

            .querySelectorAll("th.sortable")

            .forEach(coluna => {

                coluna.addEventListener(

                    "click",

                    () => {

                        ordenarPor(

                            coluna.dataset.campo

                        );

                    }

                );

            });

    },

    /*======================================================
        Rodapé
    ======================================================*/

    atualizarRodape() {

        const rodape = document.getElementById("lblVersao");

        if (!rodape)
            return;

        rodape.innerHTML =

            `${this.nome} - ${this.versao}`;

    },

    /*======================================================
        Exportação futura
    ======================================================*/

    exportarJSON() {

        Util.download(

            "imoveis.json",

            banco.listar()

        );

    },

    /*======================================================
        Estatísticas
    ======================================================*/

    estatisticas() {

        return {

            totalImoveis:

                banco.listar().length,

            data:

                new Date()

        };

    }

};

/*==========================================================
    Inicialização Automática
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.iniciar();

    }

);