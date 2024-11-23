import { getPostsDB, criarPost } from "../models/postsModel.js";
import fs from "fs";


export async function listarPosts(req, res) {
    const posts = await getPostsDB();
    res.status(200).json(posts);
}

export async function uploadNewPost(req, res) {
    const dadosNovoPost = req.body;
     try {
        const postCriado = await criarPost(dadosNovoPost);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const dadosNovoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(dadosNovoPost);
        const nomeImgAtualizado = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, nomeImgAtualizado);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}