import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: 'Перший пост', content: 'Це контент першого посту.' },
  { id: 2, title: 'Другий пост', content: 'Це контент другого посту.' },
  { id: 3, title: 'Третій пост', content: 'Це контент третього посту.' }
];

const PostListPage = () => {
  return (
    <div>
      <h2>Список постів</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListPage;

