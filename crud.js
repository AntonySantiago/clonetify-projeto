import { db } from "./firebase.js";

import {
    ref,
    push,
    set,
    onValue,
    remove,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


// ==========================================
// CLOUDINARY
// ==========================================

async function enviarCloudinary(arquivo) {

    const dados = new FormData();

    dados.append("file", arquivo);
    dados.append("upload_preset", "clonetify");


    const resposta = await fetch(
        "https://api.cloudinary.com/v1_1/tqlpgprn/auto/upload",
        {
            method: "POST",
            body: dados
        }
    );


    if (!resposta.ok) {

        throw new Error(
            "Erro ao enviar arquivo para o Cloudinary"
        );

    }


    const resultado = await resposta.json();

    return resultado.secure_url;
}



// ==========================================
// USUÁRIOS
// ==========================================

export async function salvarUsuarios(usuarios, senhas) {

    await set(
        ref(db, "usuarios"),
        {
            usuarios: usuarios,
            senhas: senhas
        }
    );

}



export async function carregarUsuarios() {

    const resultado = await get(
        ref(db, "usuarios")
    );


    if (resultado.exists()) {

        return resultado.val();

    }


    return {
        usuarios: [],
        senhas: []
    };

}



// ==========================================
// ADICIONAR MÚSICA
// ==========================================

export async function adicionarMusica(
    nome,
    artista,
    imagemArtista,
    capa,
    arquivo
) {

    // Envia imagem do artista
    const imagemArtistaUrl =
        await enviarCloudinary(imagemArtista);


    // Envia capa
    const capaUrl =
        await enviarCloudinary(capa);


    // Envia MP3
    const arquivoUrl =
        await enviarCloudinary(arquivo);


    // Cria nova música
    const musicaRef =
        push(ref(db, "musicas"));


    await set(
        musicaRef,
        {
            nome: nome,
            artista: artista,
            imagemArtista: imagemArtistaUrl,
            capa: capaUrl,
            arquivo: arquivoUrl
        }
    );

}



// ==========================================
// CARREGAR MÚSICAS
// ==========================================

export function ouvirMusicas(callback) {

    const musicasRef =
        ref(db, "musicas");


    onValue(
        musicasRef,
        function(snapshot) {

            const lista = [];


            snapshot.forEach(
                function(item) {

                    lista.push({

                        id: item.key,

                        ...item.val()

                    });

                }
            );


            callback(lista);

        }
    );

}



// ==========================================
// EXCLUIR MÚSICA
// ==========================================

export async function excluirMusica(id) {

    await remove(
        ref(db, "musicas/" + id)
    );

}