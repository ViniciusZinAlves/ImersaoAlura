import conectarAoBanco from "../config/dbConfig.js";

const conexaoDB = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getPostsDB() {
    const db = conexaoDB.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(dadosNovoPost) {
    const db = conexaoDB.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(dadosNovoPost);
}