import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './singlePostPage.css'; 

const SinglePostPage = () => {
  const { postId } = useParams();
  const [likes, setLikes] = useState(0); 

  const handleLike = () => {
    setLikes(likes + 1); 
  };

  return (
    <div className="CentralContainer"> {}
      <div className="SinglePost">
        <h2 className="PostTitle">Заголовок посту #{postId}</h2> {}
        <hr className="Divider" /> {}
       
          <div className="PostContent">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, libero quis laoreet placerat, lectus arcu commodo nisi, vitae feugiat magna lectus a mi. Etiam hendrerit est aliquet risus gravida, at finibus orci mattis. Vestibulum et mi sed felis porta maximus. In maximus sapien eu odio accumsan pellentesque. Suspendisse ut tempor nisl, vitae volutpat sapien. Cras porta lacinia luctus. Nam vitae luctus neque, ut sollicitudin lectus. Praesent blandit sapien nec ex ornare hendrerit. Praesent consequat malesuada neque et fermentum.

Suspendisse egestas scelerisque justo, vel pretium justo. Fusce felis elit, pharetra sit amet faucibus vel, dapibus eu nisi. Donec fringilla in purus a blandit. Suspendisse potenti. Fusce sit amet varius ante. Etiam gravida convallis felis, ac varius odio semper at. Duis tristique cursus viverra. Duis urna massa, lacinia et mi non, rutrum condimentum dolor. Proin feugiat risus ut orci tristique convallis. Aliquam erat volutpat. Sed ullamcorper ut ligula nec sodales.

Nulla pretium tortor eget sem vestibulum hendrerit. Vivamus sit amet varius neque. Phasellus at felis ex. Suspendisse auctor neque et ex faucibus, sit amet aliquet mi venenatis. Sed porttitor consectetur risus a ultrices. Fusce malesuada tellus ut eros maximus, a cursus eros venenatis. Sed feugiat feugiat dui, ut consectetur purus consectetur sit amet. Nullam accumsan leo ac placerat eleifend. Donec dui leo, tempor nec lacinia et, congue nec tellus. Duis scelerisque arcu malesuada metus pharetra molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum consequat tellus vel congue placerat.
            </p>
          
        </div>
        <hr className="Divider" /> {}
        <div className="PostActions">
          <button className="LikeButton" onClick={handleLike}>Лайки ({likes})</button> {}
          <button className="CommentButton">Коментарі</button>
          <button className="EditButton">Редагувати</button>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
