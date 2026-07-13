/*==========================================================
    UTILITÁRIOS DO SISTEMA
==========================================================*/

const Util = {

    /*======================================================
        Seletores
    ======================================================*/

    $(id) {

        return document.getElementById(id);

    },

    $all(selector) {

        return document.querySelectorAll(selector);

    },

    /*======================================================
        Strings
    ======================================================*/

    texto(valor) {

        if (valor === null || valor === undefined)
            return "";

        return valor.toString().trim();

    },

    vazio(valor) {

        return this.texto(valor) === "";

    },

    /*======================================================
        Números
    ======================================================*/

    numero(valor) {

        if (valor === "")
            return 0;

        const numero = Number(valor);

        return isNaN(numero) ? 0 : numero;

    },

    inteiro(valor) {

        return parseInt(this.numero(valor));

    },

    decimal(valor) {

        return parseFloat(this.numero(valor));

    },

    /*======================================================
        Formatação
    ======================================================*/

    moeda(valor) {

        return this.numero(valor)

            .toLocaleString("pt-BR", {

                style: "currency",

                currency: "BRL"

            });

    },

    decimal2(valor) {

        return this.numero(valor)

            .toLocaleString(

                "pt-BR",

                {

                    minimumFractionDigits:2,

                    maximumFractionDigits:2

                }

            );

    },

    inteiroFormatado(valor){

        return this.numero(valor)

            .toLocaleString("pt-BR");

    },

    /*======================================================
        Toast
    ======================================================*/

    toast(mensagem,tipo="success"){

        let toast = document.getElementById("toast");

        if(!toast){

            toast = document.createElement("div");

            toast.id="toast";

            toast.className="toast";

            document.body.appendChild(toast);

        }

        toast.innerHTML=mensagem;

        toast.className="toast "+tipo;

        toast.classList.add("show");

        setTimeout(()=>{

            toast.classList.remove("show");

        },3000);

    },

    /*======================================================
        Loading
    ======================================================*/

    mostrarLoading(){

        const loading=document.getElementById("loading");

        if(loading)

            loading.style.display="flex";

    },

    ocultarLoading(){

        const loading=document.getElementById("loading");

        if(loading)

            loading.style.display="none";

    },

    /*======================================================
        Confirmação
    ======================================================*/

    confirmar(texto){

        return confirm(texto);

    },

    /*======================================================
        Mensagens
    ======================================================*/

    sucesso(texto){

        this.toast(texto,"success");

    },

    erro(texto){

        this.toast(texto,"error");

    },

    aviso(texto){

        this.toast(texto,"warning");

    },

    /*======================================================
        Datas
    ======================================================*/

    hoje(){

        return new Date();

    },

    dataBR(data){

        return new Date(data)

            .toLocaleDateString("pt-BR");

    },

    hora(){

        return new Date()

            .toLocaleTimeString("pt-BR");

    },

    /*======================================================
        Clone
    ======================================================*/

    clone(obj){

        return JSON.parse(

            JSON.stringify(obj)

        );

    },

    /*======================================================
        GUID
    ======================================================*/

    guid(){

        return crypto.randomUUID();

    },

    /*======================================================
        Debounce
    ======================================================*/

    debounce(func,delay){

        let timer;

        return(...args)=>{

            clearTimeout(timer);

            timer=setTimeout(

                ()=>func(...args),

                delay

            );

        };

    },

    /*======================================================
        Download JSON
    ======================================================*/

    download(nome,objeto){

        const blob=new Blob(

            [

                JSON.stringify(

                    objeto,

                    null,

                    4

                )

            ],

            {

                type:"application/json"

            }

        );

        const url=

            URL.createObjectURL(blob);

        const a=

            document.createElement("a");

        a.href=url;

        a.download=nome;

        a.click();

        URL.revokeObjectURL(url);

    }

};

/*==========================================================
    Atalhos
==========================================================*/

const $ = Util.$.bind(Util);

const $$ = Util.$all.bind(Util);

function mostrarMensagem(texto,tipo="success"){

    Util.toast(texto,tipo);

}