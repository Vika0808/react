import axios from 'axios';


axios.get('http://localhost:3000/api/data')
  .then(response => {
   
    console.log(response.data);
  })
  .catch(error => {
   
    console.error(error);
  });


const postData = {
  
};

axios.post('http://localhost:3000/api/data', postData)
  .then(response => {
    
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
