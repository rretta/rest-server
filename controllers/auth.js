const {response} = require("express")
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs")
const { generarJWT } = require("../helpers/generarJST")



const login = async (req, res=response) => {
    const { correo, password} = req.body


    try {


        //Ver si el email existe
        const usuario = await Usuario.findOne({correo})

        if (!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            })
        }

        //validar si el usuario está activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            })
        }
        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - pass: incorrecta"
            })
        }

        //generar jwt
        const token = await generarJWT(usuario.id);
        //ver si el usuario está dentro de base de datos




        res.json({
            usuario, token
            
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }


   
}


module.exports = {
    login
}