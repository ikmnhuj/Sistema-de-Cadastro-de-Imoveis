/*==========================================================
    CADASTRO DE IMÓVEIS
==========================================================*/

let imovelAtual = null;

let alterado = false;

/*==========================================================
    INICIALIZAÇÃO
==========================================================*/

document.addEventListener("DOMContentLoaded", async () => {

    await banco.carregar();

    carregarCombos();

    configurarEventos();

    abrirCadastro();

});

/*==========================================================
    EVENTOS
==========================================================*/

function configurarEventos(){

    document
        .querySelectorAll("input,select,textarea")
        .forEach(campo=>{

            campo.addEventListener("change",()=>{

                alterado=true;

            });

            campo.addEventListener("keyup",()=>{

                alterado=true;

            });

        });

    document
        .getElementById("frmCadastro")
        .addEventListener("submit",salvar);

    document
        .getElementById("btnCancelar")
        .addEventListener("click",voltar);

    document
        .getElementById("btnVoltar")
        .addEventListener("click",voltar);

    document
        .getElementById("btnLimparFormulario")
        .addEventListener("click",limparFormulario);

}

/*==========================================================
    ABRE O CADASTRO
==========================================================*/

function abrirCadastro(){

    const codigo = localStorage.getItem("codigoImovel");

    if(codigo){

        imovelAtual = banco.localizar(codigo);

        preencherFormulario(imovelAtual);

    }

}

/*==========================================================
    PREENCHE O FORMULÁRIO
==========================================================*/

function preencherFormulario(imovel){

    if(!imovel) return;

    document.getElementById("codigo").value=imovel.codigo;
    document.getElementById("inscricao").value=imovel.inscricao;
    document.getElementById("tipoLogradouro").value=imovel.tipoLogradouro;
    document.getElementById("logradouro").value=imovel.logradouro;
    document.getElementById("quadra").value=imovel.quadra;
    document.getElementById("lote").value=imovel.lote;
    document.getElementById("loteamento").value=imovel.loteamento;

    document.getElementById("areaConstruida").value=imovel.areaConstruida;
    document.getElementById("areaTerreno").value=imovel.areaTerreno;

    document.getElementById("fluxoVia").value=imovel.fluxoVia;
    document.getElementById("idadeAparente").value=imovel.idadeAparente;
    document.getElementById("andar").value=imovel.andar;
    document.getElementById("pavimentos").value=imovel.pavimentos;
    document.getElementById("elevador").value=imovel.elevador;
    document.getElementById("topografia").value=imovel.topografia;
    document.getElementById("esquina").value=imovel.esquina;
    document.getElementById("muro").value=imovel.muro;
    document.getElementById("distanciaPortaria").value=imovel.distanciaPortaria;
    document.getElementById("areaLazer").value=imovel.areaLazer;
    document.getElementById("situacao").value=imovel.situacao;
    document.getElementById("benfeitoria").value=imovel.benfeitoria;
    document.getElementById("distanciaKm").value=imovel.distanciaKm;
    document.getElementById("margem").value=imovel.margem;
    document.getElementById("seguranca").value=imovel.seguranca;
    document.getElementById("infraestrutura").value=imovel.infraestrutura;
    document.getElementById("indice").value=imovel.indice;

}

/*==========================================================
    OBTÉM DADOS DO FORMULÁRIO
==========================================================*/

function obterDadosFormulario(){

    return{

        codigo:document.getElementById("codigo").value,
        inscricao:document.getElementById("inscricao").value,
        tipoLogradouro:document.getElementById("tipoLogradouro").value,
        logradouro:document.getElementById("logradouro").value,
        quadra:document.getElementById("quadra").value,
        lote:document.getElementById("lote").value,
        loteamento:document.getElementById("loteamento").value,

        areaConstruida:Number(document.getElementById("areaConstruida").value),
        areaTerreno:Number(document.getElementById("areaTerreno").value),

        fluxoVia:document.getElementById("fluxoVia").value,
        idadeAparente:document.getElementById("idadeAparente").value,
        andar:Number(document.getElementById("andar").value),
        pavimentos:Number(document.getElementById("pavimentos").value),
        elevador:document.getElementById("elevador").value,
        topografia:document.getElementById("topografia").value,
        esquina:document.getElementById("esquina").value,
        muro:document.getElementById("muro").value,
        distanciaPortaria:document.getElementById("distanciaPortaria").value,
        areaLazer:document.getElementById("areaLazer").value,
        situacao:document.getElementById("situacao").value,
        benfeitoria:document.getElementById("benfeitoria").value,
        distanciaKm:Number(document.getElementById("distanciaKm").value),
        margem:document.getElementById("margem").value,
        seguranca:document.getElementById("seguranca").value,
        infraestrutura:document.getElementById("infraestrutura").value,
        indice:Number(document.getElementById("indice").value)

    };

}

/*==========================================================
    SALVAR
==========================================================*/

function salvar(e){

    e.preventDefault();

    if(!validarFormulario()){

        return;

    }

    const dados = obterDadosFormulario();

    banco.atualizar(

        dados.codigo,

        dados

    );

    alterado=false;

    mostrarMensagem(

        "Cadastro salvo com sucesso.",

        "success"

    );

}

/*==========================================================
    LIMPAR
==========================================================*/

function limparFormulario(){

    document
        .querySelectorAll(

            "#frmCadastro input:not(.readonly), #frmCadastro select"

        )

        .forEach(campo=>{

            campo.value="";

        });

}

/*==========================================================
    VOLTAR
==========================================================*/

function voltar(){

    if(alterado){

        if(

            !confirm(

                "Existem alterações não salvas. Deseja sair?"

            )

        ){

            return;

        }

    }

    window.location="index.html";

}