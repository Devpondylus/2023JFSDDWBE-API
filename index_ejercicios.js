import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const datos = require('./datos.json')

import express from 'express'

const html = '<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li>    <li>POST: /productos/</li>    <li>DELETE: /productos/id</li>    <li>PUT: /productos/id</li>    <li>PATCH: /productos/id</li>    <li>GET: /usuarios/</li>    <li>GET: /usuarios/id</li>    <li>POST: /usuarios/</li>    <li>DELETE: /usuarios/id</li>    <li>PUT: /usuarios/id</li>    <li>PATCH: /usuarios/id</li></ul>'

const app = express()

const exposedPort = 1234

//* 01. Endpoint para obtener el listado completo de usuarios *//
app.get('/usuarios/', (req, res) =>{
    try {
        let allUsers = datos.usuarios
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

//* 02. Endpoint para obtener los datos de un usuario por ID *//
app.get('/usuarios/:id', (req, res) => {
    try {
        let usuarioId = parseInt(req.params.id)
        let usuarioEncontrado = datos.usuarios.find((usuario) => usuario.id === usuarioId)
        res.status(200).json(usuarioEncontrado)
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

//* 03.Endpoint para guardar un nuevo usuario *//
app.post('/usuarios', (req, res) => {
    try {
        let bodyTemp = ''
        req.on('data', (chunk) => {
            bodyTemp += chunk.toString()
        })
        req.on('end', () => {
            const data = JSON.parse(bodyTemp)
            req.body = data
            datos.usuarios.push(req.body)
        })
        res.status(201).json({"message": "Usuario creado"})
    } catch (error) {
        res.status(204).json({"message": "Error al crear el usuario"})
    }
})

//* 04.Endpoint para modificar algún atributo de un usuario por ID *//
app.patch('/usuarios/:id', (req, res) => {
    let idUsuarioAEditar = parseInt(req.params.id)
    let usuarioAActualizar = datos.usuarios.find((usuario) => usuario.id === idUsuarioAEditar)

    if (!usuarioAActualizar) {
        res.status(204).json({"message":"Usuario no encontrado"})
    }

    let bodyTemp = ''
    req.on('data', (chunk) => {
        bodyTemp += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(bodyTemp)
        req.body = data

        if(data.nombre){
            usuarioAActualizar.nombre = data.nombre
        }
        
        if (data.telefono){
            usuarioAActualizar.telefono = data.telefono
        }

        res.status(200).json({"message": "Usuario actualizado"})
    })
})

//* 05.Endpoint para borrar un usuario por ID *//
app.delete('/usuarios/:id', (req, res) => {
    let idUsuarioABorrar = parseInt(req.params.id)
    let usuarioABorrar = datos.usuarios.find((usuario) => usuario.id === idUsuarioABorrar)

    if (!usuarioABorrar){
        res.status(204).json({"message":"Usuario no encontrado"})
    }

    let indiceUsuarioABorrar = datos.usuarios.indexOf(usuarioABorrar)
    try {
         datos.usuarios.splice(indiceUsuarioABorrar, 1)
        res.status(200).json({"message": "Usuario eliminado"})
    } catch (error) {
        res.status(204).json({"message": "Error al eliminar el usuario"})
    }
})

//* 06.Endpoint para obtener el precio de un producto por ID *//
app.get('/productos/:id/precio', (req, res) => {
    try {
        let productoId = parseInt(req.params.id)
        let productoEncontrado = datos.productos.find((producto) => producto.id === productoId)

        if (productoEncontrado) {
            res.status(200).json({"precio": productoEncontrado.precio})
        } else {
            res.status(204).json({"message": "Producto no encontrado"})
        }
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

//* 07.Endpoint para obtener el nombre de un producto por ID *//
app.get('/productos/:id/nombre', (req, res) => {
    try {
        let productoId = parseInt(req.params.id)
        let productoEncontrado = datos.productos.find((producto) => producto.id === productoId)

        if (productoEncontrado) {
            res.status(200).json({"nombre": productoEncontrado.nombre})
        } else {
            res.status(204).json({"message": "Producto no encontrado"})
        }
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

//* 08.Endpoint para obtener el teléfono de un usuario por ID *//
app.get('/usuarios/:id/telefono', (req, res) => {
    try {
        let usuarioId = parseInt(req.params.id)
        let usuarioEncontrado = datos.usuarios.find((usuario) => usuario.id === usuarioId)

        if (usuarioEncontrado) {
            res.status(200).json({"telefono": usuarioEncontrado.telefono})
        } else {
            res.status(204).json({"message": "Usuario no encontrado"})
        }
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

//* 09.Endpoint para obtener el nombre de un usuario por ID *//
app.get('/usuarios/:id/nombre', (req, res) => {
    try {
        let usuarioId = parseInt(req.params.id)
        let usuarioEncontrado = datos.usuarios.find((usuario) => usuario.id === usuarioId)

        if (usuarioEncontrado) {
            res.status(200).json({"nombre": usuarioEncontrado.nombre})
        } else {
            res.status(204).json({"message": "Usuario no encontrado"})
        }
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

//* 10.Endpoint para obtener el total del stock actual de productos *//
app.get('/productos/total-stock', (req, res) => {
    try {
        let totalStock = datos.productos.reduce((total, producto) => total + producto.stock, 0)
        res.status(200).json({"total_stock": totalStock})
    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.listen( exposedPort, () => {
    console.log('Servidor escuchando en http://localhost:' + exposedPort)
})
