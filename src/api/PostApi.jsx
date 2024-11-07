import axios from "axios";

 const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
 });

 export const getPost = () => {
   return api.get('/posts');
 };


 export const postPost = (addData) => {
  return api.post('/posts', addData);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};


export const putPost = (id, data) => {
  return api.put(`/posts/${id}`, data);
};
