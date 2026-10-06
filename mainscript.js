import {
    salvarUsuarios,
    carregarUsuarios,
    adicionarMusica,
    ouvirMusicas,
    excluirMusica
} from "./crud.js";


// ==========================================
// ELEMENTOS
// ==========================================

// Login

const usuarioinput =
    document.getElementById("usuarioinput");

const senhainput =
    document.getElementById("senhainput");

const logar =
    document.getElementById("logar");

const criarconta =
    document.getElementById("criarconta");

const criarusuario =
    document.getElementById("criarusuario");

const criarsenha =
    document.getElementById("criarsenha");

const criarcontabutao =
    document.getElementById("criarcontabutao");

const caixaprincipal =
    document.getElementById("caixaprincipal");

const criaroconta1 =
    document.getElementById("criaroconta1");


// Header

const sair =
    document.getElementById("sair");


// Admin

const paineladmin =
    document.getElementById("paineladmin");

const artistaimg =
    document.getElementById("artistaimg");

const nomeartista =
    document.getElementById("nomeartista");

const musicaimg =
    document.getElementById("musicaimg");

const musicamp3 =
    document.getElementById("musicamp3");

const nomedamusica =
    document.getElementById("nomedamusica");

const adicionarmusica =
    document.getElementById("adicionarmusica");

const listamusicasadmin =
    document.getElementById("listamusicasadmin");


// Biblioteca

const biblioteca =
    document.getElementById("biblioteca");

const listaartistas =
    document.getElementById("listaartistas");

const listamusicas =
    document.getElementById("listamusicas");

const nomedoartista =
    document.getElementById("nomedoartista");


// Player

const player =
    document.getElementById("player");

const playercapa =
    document.getElementById("playercapa");

const playernome =
    document.getElementById("playernome");

const playerartista =
    document.getElementById("playerartista");

const playeraudio =
    document.getElementById("playeraudio");


let usuarios = [];

let senhas = [];

let usuarioAtual = "";

let admin = false;

let todasMusicas = [];

sair.style.display = "none";

paineladmin.style.display = "none";

biblioteca.style.display = "none";

player.style.display = "none";

criaroconta1.style.display = "none";



async function carregarUsuariosFirebase() {

    const dados =
        await carregarUsuarios();


    usuarios =
        dados.usuarios || [];


    senhas =
        dados.senhas || [];

}



// ==========================================
// BOTÃO CRIAR CONTA
// ==========================================

criarconta.addEventListener(
    "click",
    function() {

        criaroconta1.style.display = "block";

    }
);




criarcontabutao.addEventListener(
    "click",
    async function() {

        const novoUsuario =
            criarusuario.value.trim();


        const novaSenha =
            criarsenha.value.trim();


        if (
            novoUsuario === "" ||
            novaSenha === ""
        ) {

            alert(
                "Preencha usuário e senha."
            );

            return;

        }


        await carregarUsuariosFirebase();


        if (
            usuarios.includes(novoUsuario)
        ) {

            alert(
                "Esse usuário já existe."
            );

            return;

        }


        usuarios.push(novoUsuario);

        senhas.push(novaSenha);


        await salvarUsuarios(
            usuarios,
            senhas
        );


        alert(
            "Conta criada com sucesso!"
        );


        criarusuario.value = "";

        criarsenha.value = "";

        criaroconta1.style.display =
            "none";

    }
);




logar.addEventListener(
    "click",
    async function() {

        const usuario =
            usuarioinput.value.trim();


        const senha =
            senhainput.value.trim();


        if (
            usuario === "" ||
            senha === ""
        ) {

            alert(
                "Digite usuário e senha."
            );

            return;

        }


       
        if (
            usuario === "admin" &&
            senha === "123456"
        ) {

            entrarComoAdmin();

            return;

        }



        await carregarUsuariosFirebase();


        let encontrou = false;


        for (
            let i = 0;
            i < usuarios.length;
            i++
        ) {

            if (
                usuarios[i] === usuario &&
                senhas[i] === senha
            ) {

                encontrou = true;

                break;

            }

        }


        if (encontrou) {

            entrarComoUsuario(
                usuario
            );

        } else {

            alert(
                "Usuário ou senha incorretos."
            );

        }

    }
);



function entrarComoAdmin() {

    admin = true;

    usuarioAtual = "admin";


    caixaprincipal.style.display =
        "none";


    sair.style.display =
        "block";


    paineladmin.style.display =
        "block";


    biblioteca.style.display =
        "none";


    player.style.display =
        "none";


    carregarMusicasAdmin();

}

function entrarComoUsuario(usuario) {

    admin = false;

    usuarioAtual = usuario;


    caixaprincipal.style.display =
        "none";


    sair.style.display =
        "block";


    paineladmin.style.display =
        "none";


    biblioteca.style.display =
        "block";


    player.style.display =
        "flex";


    carregarBiblioteca();

}


sair.addEventListener(
    "click",
    function() {

        admin = false;

        usuarioAtual = "";


        caixaprincipal.style.display =
            "flex";


        sair.style.display =
            "none";


        paineladmin.style.display =
            "none";


        biblioteca.style.display =
            "none";


        player.style.display =
            "none";


        usuarioinput.value = "";

        senhainput.value = "";


        playeraudio.pause();

        playeraudio.src = "";

    }
);


adicionarmusica.addEventListener(
    "click",
    async function() {

        const nome =
            nomedamusica.value.trim();


        const artista =
            nomeartista.value.trim();


        const imagemArtista =
            artistaimg.files[0];


        const capa =
            musicaimg.files[0];


        const arquivo =
            musicamp3.files[0];


        if (
            nome === "" ||
            artista === "" ||
            !imagemArtista ||
            !capa ||
            !arquivo
        ) {

            alert(
                "Preencha todos os campos."
            );

            return;

        }


        try {

            adicionarmusica.disabled =
                true;


            adicionarmusica.innerText =
                "Enviando...";


            await adicionarMusica(
                nome,
                artista,
                imagemArtista,
                capa,
                arquivo
            );


            alert(
                "Música adicionada com sucesso!"
            );


            // Limpar campos

            nomedamusica.value = "";

            nomeartista.value = "";

            artistaimg.value = "";

            musicaimg.value = "";

            musicamp3.value = "";


        } catch (erro) {

            console.error(erro);


            alert(
                "Erro ao adicionar música."
            );

        } finally {

            adicionarmusica.disabled =
                false;


            adicionarmusica.innerText =
                "Adicionar música";

        }

    }
);


function carregarBiblioteca() {

    ouvirMusicas(
        function(lista) {

            todasMusicas = lista;

            criarArtistas();

        }
    );

}


function criarArtistas() {

    listaartistas.innerHTML = "";


    const artistas = [];


    todasMusicas.forEach(
        function(musica) {

            if (
                !artistas.includes(
                    musica.artista
                )
            ) {

                artistas.push(
                    musica.artista
                );

            }

        }
    );


    artistas.forEach(
        function(nomeArtista) {

            const musicaArtista =
                todasMusicas.find(
                    function(musica) {

                        return (
                            musica.artista ===
                            nomeArtista
                        );

                    }
                );


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "artista";


            const imagem =
                document.createElement(
                    "img"
                );


            imagem.src =
                musicaArtista.imagemArtista;


            const nome =
                document.createElement(
                    "h2"
                );


            nome.innerText =
                nomeArtista;


            div.appendChild(imagem);

            div.appendChild(nome);


            listaartistas.appendChild(
                div
            );


            div.addEventListener(
                "click",
                function() {

                    mostrarMusicas(
                        nomeArtista
                    );

                }
            );

        }
    );

}



function mostrarMusicas(nomeArtista) {

    listamusicas.innerHTML = "";


    nomedoartista.innerText =
        nomeArtista;


    const musicas =
        todasMusicas.filter(
            function(musica) {

                return (
                    musica.artista ===
                    nomeArtista
                );

            }
        );


    musicas.forEach(
        function(musica) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "musica";


            const imagem =
                document.createElement(
                    "img"
                );


            imagem.src =
                musica.capa;


            const nome =
                document.createElement(
                    "h2"
                );


            nome.innerText =
                musica.nome;


            const artista =
                document.createElement(
                    "p"
                );


            artista.innerText =
                musica.artista;


            div.appendChild(imagem);

            div.appendChild(nome);

            div.appendChild(artista);


            listamusicas.appendChild(
                div
            );


            div.addEventListener(
                "click",
                function() {

                    tocarMusica(
                        musica
                    );

                }
            );

        }
    );

}


function tocarMusica(musica) {

    playercapa.src =
        musica.capa;


    playernome.innerText =
        musica.nome;


    playerartista.innerText =
        musica.artista;


    playeraudio.src =
        musica.arquivo;


    playeraudio.play();

}

function carregarMusicasAdmin() {

    ouvirMusicas(
        function(lista) {

            todasMusicas = lista;

            mostrarMusicasAdmin();

        }
    );

}


function mostrarMusicasAdmin() {

    listamusicasadmin.innerHTML =
        "";


    todasMusicas.forEach(
        function(musica) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "musicaadmin";


            const imagem =
                document.createElement(
                    "img"
                );


            imagem.src =
                musica.capa;


            const informacoes =
                document.createElement(
                    "div"
                );


            const nome =
                document.createElement(
                    "h2"
                );


            nome.innerText =
                musica.nome;


            const artista =
                document.createElement(
                    "p"
                );


            artista.innerText =
                musica.artista;


            const botao =
                document.createElement(
                    "button"
                );


            botao.innerText =
                "Excluir";


            informacoes.appendChild(
                nome
            );


            informacoes.appendChild(
                artista
            );


            div.appendChild(
                imagem
            );


            div.appendChild(
                informacoes
            );


            div.appendChild(
                botao
            );


            listamusicasadmin.appendChild(
                div
            );


            botao.addEventListener(
                "click",
                async function() {

                    const confirmar =
                        confirm(
                            "Deseja excluir esta música?"
                        );


                    if (!confirmar) {

                        return;

                    }


                    try {

                        await excluirMusica(
                            musica.id
                        );


                        alert(
                            "Música excluída."
                        );


                    } catch (erro) {

                        console.error(
                            erro
                        );


                        alert(
                            "Erro ao excluir música."
                        );

                    }

                }
            );

        }
    );

}