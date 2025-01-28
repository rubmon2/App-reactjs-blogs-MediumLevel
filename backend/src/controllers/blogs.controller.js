import { blogModel } from '../models/relationships.js';
import { sanitizeInput, sanitizeInteger } from '../utils/sanitized.js';

export const createBlogs = async (req, res) => {
  const { title, description, important } = req.body;

  const userId = req.user.payload.id;
  try {
    const sanitizedUserId = sanitizeInteger(userId);
    if (!title || !description || !important) {
      return res
        .status(400)
        .json({ message: 'Complete todos los campos para guardar el blog' });
    }
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedImportant = sanitizeInput(important);

    const blog = await blogModel.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      important: sanitizedImportant,
      userId: sanitizedUserId,
    });

    res.status(201).json({ message: 'Blog creado exitosamente', blog: blog });
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ message: 'El blog ya existe, elije otro titulo' });
    }

    if ((error.name = 'SequelizeValidationError')) {
      return res.status(400).json({
        message:
          'Revise que los campos tengan como minimo 5 letras y sean caracteres no especiales.',
      });
    }

    //otros errores
    res
      .status(500)
      .json({ message: 'Error en la creacion del blog', error: error.message });
  }
};

export const udpateBlogs = async (req, res) => {
  const { title, description, important } = req.body;
  const id = req.user.payload.id;
  const { blogId } = req.params;

  try {
    if (!title || !description || !important) {
      return res
        .status(400)
        .json({ message: 'Los campos no pueden estar vacios' });
    }
    if (!blogId) {
      return res.status(404).json({
        message: 'El numero de blog es necesario para iniciar la busqueda',
      });
    }
    const sanitizedUserId = sanitizeInteger(id);
    const sanitizedBlogId = sanitizeInteger(blogId);
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedImportant = sanitizeInput(important);

    const blog = await blogModel.findOne({
      where: { id: sanitizedBlogId, userId: sanitizedUserId },
    });

    if (!blog) {
      return res.status(404).json({
        message: 'El blog no existe o no es uno propio',
        succes: false,
      });
    }

    const [updateRows] = await blogModel.update(
      {
        title: sanitizedTitle,
        description: sanitizedDescription,
        important: sanitizedImportant,
      },
      { where: { id: sanitizedBlogId, userId: sanitizedUserId } },
    );

    if (!updateRows || updateRows === 0) {
      return res.status(400).json({
        message:
          'El blog no pudo ser actualizado, revisa las campos y si esta logueado',
        succes: false,
      });
    }

    res.status(200).json({ message: 'Blog actualizado', blog: blog });
  } catch (error) {
    console.log(error);
    //error si actualizaco y ya existe uno asi
    if (error.name === 'SequelizeUniqueconstraintError') {
      return res
        .status(400)
        .json({ messagea: 'Ya existe un blog con ese titulo' });
    }
    res.status(500).json({
      message: 'Error en la actualizacion del blog',
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const userId = req.user.payload.id;
  const { blogId } = req.params;

  try {
    if (!blogId) {
      return res
        .status(400)
        .json({ message: 'Se necesita un id para proceder con la solicitud' });
    }

    const sanitizedBlogId = sanitizeInteger(blogId);
    const sanitizedUserId = sanitizeInteger(userId);
    const blogExist = await blogModel.findOne({
      where: { id: sanitizedBlogId, userId: sanitizedUserId },
    });
    if (!blogExist) {
      return res.status(404).json({
        message: 'El blog no existe o no pertenece al usuario',
        succes: false,
      });
    }

    const blogDelete = await blogModel.destroy({
      where: { id: sanitizedBlogId, userId: sanitizedUserId },
    });

    if (!blogDelete) {
      return res.status(404).json({
        message: 'El blog no existe o no pudo ser eliminado',
        succes: false,
      });
    }

    res
      .status(202)
      .json({ message: 'Blog eliminado correctamente', blog: blogExist });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: 'Error borrando el blog', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  const id = req.user.payload.id;

  try {
    const sanitizedId = sanitizeInput(id);
    const blog = await blogModel.findAll({ where: { userId: sanitizedId } });
    if (!blog || blog.length === 0) {
      return res.status({
        message: 'El usuario no tiene blogs o no tiene acceso',
        succes: false,
      });
    }

    res
      .status(200)
      .json({ message: 'Todos los blogs, obtenidos exitosamente', blog: blog });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Error obteniendo todos los blog',
      error: error.message,
    });
  }
};

export const getOneBlogs = async (req, res) => {
  const userId = req.user.payload.id;

  const blogId = req.params.blogId;
  try {
    if (!blogId) {
      return res
        .status(401)
        .json({ message: 'Se necesita un id para buscar el blog' });
    }

    const sanitizedBlogId = sanitizeInput(blogId);
    const sanitizedUserId = sanitizeInteger(userId);

    const blog = await blogModel.findOne({
      where: { id: sanitizedBlogId, userId: sanitizedUserId },
    });

    if (!blog) {
      return res.status(404).json({
        message: 'el blog no existe o no pertenece al usuairo',
        succes: false,
      });
    }

    res.status(200).json({ message: 'Blog encontrado', blog: blog });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: 'Error obteniendo el blog', error: error.message });
  }
};
