import data from '../data/post.data.js';

async function getPosts() {
    return await data.getAll()    
}

async function getPostById(id) {
    return await data.getById(id);
}

export default {getPosts, getPostById}