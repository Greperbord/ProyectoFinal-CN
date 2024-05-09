const bcrypt = require('bcrypt')
const admin = require('../config/firebase')
const IUser = require('../interfaces/IUser')
const firestore = admin.firestore()

class User extends IUser {
    constructor (email, password, nombre, apaterno, amaterno, direccion, telefono) {
        super()
        this.email = email
        this.password = password
        this.nombre = nombre
        this.apaterno = apaterno
        this.amaterno = amaterno
        this.direccion = direccion
        this.telefono = telefono
        // nombre, apaterno, amaterno, dirección, teléfono
    }

    static async createUser (email, password, nombre, apaterno, amaterno, direccion, telefono) {
        try {
            const hash = await bcrypt.hash(password, 10)    
            const user = firestore.collection('users').doc(email)
            await user.set({
                email, 
                password: hash,
                nombre,
                apaterno,
                amaterno,
                direccion,
                telefono
            })

            return new User(email, password, nombre, apaterno, amaterno, direccion, telefono)
        } catch (error) {
            console.log('@@ Error => ', error)
            throw new Error ('Error creating user')
        }
    }

    async verifyPassword (password) {
        return await bcrypt.compare(password, this.password)
    }
   
}

module.exports = User