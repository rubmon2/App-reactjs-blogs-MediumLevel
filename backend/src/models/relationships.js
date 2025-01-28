import { userModel } from './user.model.js';
import { blogModel } from './blogs.model.js';

//un usuario puede tener muchos blogs
userModel.hasMany(blogModel, { foreignKey: 'userId' });

//el blog pertenece a un solo usuario
blogModel.belongsTo(userModel, { foreignKey: 'userId' });

export { userModel, blogModel };
