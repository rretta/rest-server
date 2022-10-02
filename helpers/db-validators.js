const Role = require("../models/role");
const Usuario = require("../models/usuario")

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const existeEmail = async (correo = "") => {
  const emailExistenteEnBase= await Usuario.findOne({ correo });
  if (emailExistenteEnBase) {
    throw new Error(`El mail ${correo} ya está registrado`);
    };
  }


  const existeUsuarioPorID = async ( _id) => {
    const existeUsuario= await Usuario.findById({ _id });
    if (!existeUsuario) {
      throw new Error(`El id ${_id} no existe`);
      };
    }

module.exports = {
  esRoleValido,
  existeEmail,
  existeUsuarioPorID
};
