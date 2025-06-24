import { Post } from "../domains/post.js";

async function getAll() {
    const URL_POSTS = 'http://jsonplaceholder.typicode.com/posts';
    const v = [];
    const res = await fetch(URL_POSTS);
    const posts = await res.json();
    posts.forEach(x => {
        const post = new Post();
        post.id = x.id;
        post.titulo = x.title;
        post.cuerpo = x.body;
        post.usuario = x.userId;
        v.push(post)
        
    });

    return v;
}

async function getById(id) {
    const URL_POST = `http://jsonplaceholder.typicode.com/posts/${id}`;
    const res = await fetch(URL_POST);
    const x = await res.json();

    const post = new Post();
    post.id = x.id;
    post.titulo = x.title;
    post.cuerpo = x.body;
    post.usuario = x.userId;

    return post;
}

export default {getAll, getById}