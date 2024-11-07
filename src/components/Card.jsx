import React from 'react'

const Card = ({id, title, body, handleDelete, handlerEdit}) => { 

  return (
    <div className="box">
          <span className="countNum">{id}.</span>
          <p className="title">Title: {title}</p>
          <p className="des">
           {body}
          </p>
          <div className="btn">
            <button className="edit" onClick={() => handlerEdit(id)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(id)}>Delete</button>
          </div>
        </div>
  )
}

export default Card