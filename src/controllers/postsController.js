import { getPostsDB } from "../models/postsModel.js";

export async function listarPosts(req, res) {
    const posts = await getPostsDB();
    res.status(200).json(posts);
}
