import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexaoDB = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getPosts() {
    const db = conexaoDB.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(dadosNovoPost) {
    const db = conexaoDB.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(dadosNovoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexaoDB.db("imersao-alura");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}