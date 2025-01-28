import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BlogsCards = ({ blog, fnx }) => {
  const navTo = useNavigate();
  const handleUpdate = () => {
    navTo(`/blogs/update/${blog.id}`);
  };

  const handleDelete = async () => {
    await fnx(blog.id);
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Importancia</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{blog.title}</th>
            <td>{blog.description}</td>
            <td>{blog.important}</td>
            <td>
              <button onClick={handleUpdate}>editar</button>
              <button onClick={handleDelete}>eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
