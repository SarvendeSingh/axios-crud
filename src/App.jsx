  import { useEffect, useState } from "react";
  import {deletePost, getPost, postPost, putPost} from "./api/PostApi"
  import Card from "./components/Card";

  function App () {

    const [data, setData] = useState([]);  
    const [addData, setAddData] = useState({
      title: "",
      body: ""
    });

    const [editData, setEditData] = useState(false);
    const [editId, setEditId] = useState(null);
    
    const getPostData =  async () => {
      const res = await getPost();
      setData(res.data);     
    }


    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddData((prev) => {
          return {
            ...prev,
            [name] : value
          }
        })
    }


    const addHandler = async (e) => {
      e.preventDefault();    
      try {
        const newRes = await postPost(addData);    
        
        if (newRes.status === 201) {
          
          const highestId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 100;
        const newPostWithId = { ...newRes.data, id: highestId + 1 };
          setData([...data, newPostWithId])
        }
        
        setAddData(prev => ({...prev, title: "", body: ""}))
        
      } catch (error) {
        console.error("Error creating post:", error);    
      }

      
    }   


    useEffect(() => {
      getPostData();
    }, [])


    const handleDelete = async (id) => {
      
      try {
        const res = await deletePost(id);
      
        if (res.status === 200) {
          const newUpdatedPosts = data.filter((curPost) => {
            return curPost.id !== id;
          })
          setData(newUpdatedPosts)
        }else{
          console.log("Failed to delete the post:", res.status);
        }
      } catch (error) {
        console.log("Failed to delete the post:", error);      
      }    
    }

    const handlerEdit = (id) => {
      setEditData(true)
      setEditId(id);
      const updateData = data.filter(data => data.id === id);
      
      if (updateData.length > 0) {
        setAddData({
          title: updateData[0].title,
          body: updateData[0].body
        });
      } 
    }


    const updateHandler = async (e) => {    
      e.preventDefault();  
      try {
        const res =  await putPost(editId, addData);
        if (res.status === 200) {
          const updatedData =  data.map(item => {
            if (item.id === editId) {
              return {
                ...item,
                title: res.data.title, 
                body: res.data.body  
              };
            }
            return item
          })
          setData(updatedData);
          setEditData(false);
          setAddData({ title: "", body: "" }); 
          setEditId(null);
        }
      } catch (error) {
        console.log("Error updating post:", error);
        
      }
    }


    

    return (
      <>
        <div>
          <div className="form-div">
            <form onSubmit={editData ? updateHandler : addHandler}>
              <input type="text" id="title" value={addData.title} name="title" onChange={handleInputChange} placeholder="Add Title"/>
              <input type="text" id="post" value={addData.body} name="body" onChange={handleInputChange} placeholder="Add Post"/>
              
              <button className="edit">{editData ? "Edit" : "Add"}</button>
              
            </form>
          </div>
          <div className="crud-main">
            {
              data.length > 0 ? (data.map((i) => <Card key={i.id} handleDelete={handleDelete} handlerEdit={handlerEdit} title={i.title} body={i.body} id={i.id}/>)) : <h1>No Data</h1>
            }
          </div>
        </div>
      </>
    )
  }

  export default App