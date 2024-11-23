import { getPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getPosts();
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
        urlImg: req.file.originalname,
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

export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            urlImg: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postAtualizado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}