/*==========================================================
    PESQUISA DE IMÓVEIS
==========================================================*/

let resultadoPesquisa = [];

let paginaAtual = 1;

const registrosPorPagina = 15;

let colunaOrdenacao = "codigo";

let ordem = "asc";

/*==========================================================
    INICIALIZA
==========================================================*/

document.addEventListener("DOMContentLoaded", async () => {

    await banco.carregar();

    configurarEventos();

    pesquisar();

});

/*==========================================================
    EVENTOS
==========================================================*/

function configurarEventos(){

    const filtros = [

        "txtCodigo",

        "txtInscricao",

        "txtTipoLogradouro",

        "txtLogradouro",

        "txtQuadra",

        "txtLote"

    ];

    filtros.forEach(id=>{

        document
            .getElementById(id)
            .addEventListener("keyup",pesquisar);

    });

    document
        .getElementById("btnPesquisar")
        .addEventListener("click",pesquisar);

    document
        .getElementById("btnLimpar")
        .addEventListener("click",limparPesquisa);

    document
        .getElementById("btnCadastrar")
        .addEventListener("click",novoCadastro);

}

/*==========================================================
    PESQUISA
==========================================================*/

function pesquisar(){

    const filtro = {

        codigo:

            document
                .getElementById("txtCodigo")
                .value,

        inscricao:

            document
                .getElementById("txtInscricao")
                .value,

        tipoLogradouro:

            document
                .getElementById("txtTipoLogradouro")
                .value,

        logradouro:

            document
                .getElementById("txtLogradouro")
                .value,

        quadra:

            document
                .getElementById("txtQuadra")
                .value,

        lote:

            document
                .getElementById("txtLote")
                .value

    };

    resultadoPesquisa = banco.pesquisar(filtro);

    ordenar();

    paginaAtual = 1;

    atualizarTabela();

}

/*==========================================================
    ORDENAÇÃO
==========================================================*/

function ordenar(){

    resultadoPesquisa.sort((a,b)=>{

        let valorA = a[colunaOrdenacao];

        let valorB = b[colunaOrdenacao];

        if(valorA == null) valorA="";

        if(valorB == null) valorB="";

        valorA = valorA.toString().toUpperCase();

        valorB = valorB.toString().toUpperCase();

        if(ordem==="asc"){

            return valorA.localeCompare(valorB);

        }

        return valorB.localeCompare(valorA);

    });

}

/*==========================================================
    TROCA ORDENAÇÃO
==========================================================*/

function ordenarPor(coluna){

    if(coluna===colunaOrdenacao){

        ordem = ordem==="asc" ? "desc" : "asc";

    }else{

        colunaOrdenacao = coluna;

        ordem = "asc";

    }

    ordenar();

    atualizarTabela();

}

/*==========================================================
    TABELA
==========================================================*/

function atualizarTabela(){

    const tbody =
        document.getElementById("tbResultado");

    tbody.innerHTML="";

    const inicio =
        (paginaAtual-1)*registrosPorPagina;

    const fim =
        inicio+registrosPorPagina;

    const pagina =
        resultadoPesquisa.slice(inicio,fim);

    pagina.forEach(imovel=>{

        const linha =
            document.createElement("tr");

        linha.innerHTML =

        `
        <td>${imovel.codigo}</td>

        <td>${imovel.inscricao}</td>

        <td>${imovel.tipoLogradouro}</td>

        <td>${imovel.logradouro}</td>

        <td>${imovel.quadra}</td>

        <td>${imovel.lote}</td>

        <td>

            <button
                class="btn-table btn-editar"
                onclick="editar('${imovel.codigo}')">

                ✏

            </button>

        </td>

        `;

        tbody.appendChild(linha);

    });

    atualizarQuantidade();

    atualizarMensagem();

    atualizarPaginacao();

}

/*==========================================================
    QUANTIDADE
==========================================================*/

function atualizarQuantidade(){

    document
        .getElementById("lblQuantidade")
        .innerHTML =

        resultadoPesquisa.length +

        " imóvel(is) encontrado(s)";

}

/*==========================================================
    SEM RESULTADO
==========================================================*/

function atualizarMensagem(){

    const painel =

        document
            .getElementById("semResultado");

    if(resultadoPesquisa.length===0){

        painel.style.display="block";

    }else{

        painel.style.display="none";

    }

}

/*==========================================================
    PAGINAÇÃO
==========================================================*/

function atualizarPaginacao(){

    const total =

        Math.ceil(

            resultadoPesquisa.length/

            registrosPorPagina

        );

    const container =

        document.querySelector(".pagination-buttons");

    if(!container) return;

    container.innerHTML="";

    for(let i=1;i<=total;i++){

        const botao =

            document.createElement("button");

        botao.className="page-button";

        if(i===paginaAtual){

            botao.classList.add("active");

        }

        botao.innerHTML=i;

        botao.onclick=()=>{

            paginaAtual=i;

            atualizarTabela();

        };

        container.appendChild(botao);

    }

}

/*==========================================================
    LIMPAR
==========================================================*/

function limparPesquisa(){

    [

        "txtCodigo",

        "txtInscricao",

        "txtTipoLogradouro",

        "txtLogradouro",

        "txtQuadra",

        "txtLote"

    ].forEach(id=>{

        document.getElementById(id).value="";

    });

    pesquisar();

}

/*==========================================================
    EDITAR
==========================================================*/

function editar(codigo){

    localStorage.setItem(

        "codigoImovel",

        codigo

    );

    window.location="cadastro.html";

}

/*==========================================================
    NOVO
==========================================================*/

function novoCadastro(){

    localStorage.removeItem(

        "codigoImovel"

    );

    window.location="cadastro.html";

}