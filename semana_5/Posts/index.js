import service from './services/post.services.js';

(async () => {
  const allPosts = await service.getPosts();
  console.log('Todos los posts:', allPosts);

  const postId = 5; //id a consultar
  const post = await service.getPostById(postId);
  console.log(`Post con ID ${postId}:`, post);
})();