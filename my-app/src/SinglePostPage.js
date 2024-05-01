import React from 'react';
import { useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const { postId } = useParams(); // Отримання параметра postId з URL

  return (
    <div>
      <h2>Пост #{postId}</h2>
      <p>Це вміст посту #{postId}</p>
    </div>
  );
};

export default SinglePostPage;