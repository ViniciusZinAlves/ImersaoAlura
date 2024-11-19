import express from "express";

const app = express();
app.use(express.json());

const posts = [
    { id: 1, descricao: "Gato fazendo a barba", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
];

app.listen(3000, () => {
    console.log("Servidor escutando em http://localhost:3000.");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    const postID = Number(req.params.id);
    if (isNaN(postID)) return res.status(400).json({ error: "ID inválido." });

    const post = posts.find(p => p.id === postID);
    if (!post) return res.status(404).json({ error: "Post não encontrado." });
    
    res.status(200).json(post);
});