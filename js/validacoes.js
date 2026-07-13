/*==========================================================
    VALIDAÇÕES DO FORMULÁRIO
==========================================================*/

const Validacoes = {

    /*======================================================
        Validação principal
    ======================================================*/

    validarFormulario() {

        this.limparErros();

        let valido = true;

        // Campos obrigatórios
        valido &= this.obrigatorio("loteamento", "Informe o loteamento.");
        valido &= this.obrigatorio("areaConstruida", "Informe a área construída.");
        valido &= this.obrigatorio("areaTerreno", "Informe a área do terreno.");

        // Validação numérica
        valido &= this.numeroPositivo(
            "areaConstruida",
            "A área construída deve ser maior que zero."
        );

        valido &= this.numeroPositivo(
            "areaTerreno",
            "A área do terreno deve ser maior que zero."
        );

        valido &= this.numeroNaoNegativo(
            "andar",
            "O andar não pode ser negativo."
        );

        valido &= this.numeroNaoNegativo(
            "pavimentos",
            "O número de pavimentos não pode ser negativo."
        );

        valido &= this.numeroNaoNegativo(
            "distanciaKm",
            "A distância não pode ser negativa."
        );

        valido &= this.numeroNaoNegativo(
            "indice",
            "O índice não pode ser negativo."
        );

        if (!valido) {

            this.exibirMensagem(
                "Existem campos inválidos. Corrija-os antes de salvar."
            );

        }

        return Boolean(valido);

    },

    /*======================================================
        Campo obrigatório
    ======================================================*/

    obrigatorio(id, mensagem) {

        const campo = document.getElementById(id);

        if (!campo) return true;

        if (campo.value.trim() === "") {

            this.marcarErro(campo, mensagem);

            return false;

        }

        return true;

    },

    /*======================================================
        Número positivo (>0)
    ======================================================*/

    numeroPositivo(id, mensagem) {

        const campo = document.getElementById(id);

        if (!campo) return true;

        const valor = Number(campo.value);

        if (isNaN(valor) || valor <= 0) {

            this.marcarErro(campo, mensagem);

            return false;

        }

        return true;

    },

    /*======================================================
        Número >=0
    ======================================================*/

    numeroNaoNegativo(id, mensagem) {

        const campo = document.getElementById(id);

        if (!campo) return true;

        if (campo.value === "") return true;

        const valor = Number(campo.value);

        if (isNaN(valor) || valor < 0) {

            this.marcarErro(campo, mensagem);

            return false;

        }

        return true;

    },

    /*======================================================
        Destaca erro
    ======================================================*/

    marcarErro(campo, mensagem) {

        campo.classList.add("invalid");

        campo.title = mensagem;

    },

    /*======================================================
        Remove erro
    ======================================================*/

    limparErros() {

        document
            .querySelectorAll(".invalid")
            .forEach(campo => {

                campo.classList.remove("invalid");

                campo.title = "";

            });

        const erro = document.getElementById("msgErro");

        if (erro) {

            erro.style.display = "none";

            erro.innerHTML = "";

        }

    },

    /*======================================================
        Mensagem
    ======================================================*/

    exibirMensagem(texto) {

        const erro = document.getElementById("msgErro");

        if (!erro) {

            alert(texto);

            return;

        }

        erro.innerHTML = texto;

        erro.style.display = "block";

        erro.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

};

/*==========================================================
    Função pública
==========================================================*/

function validarFormulario() {

    return Validacoes.validarFormulario();

}