import express from 'express';
import db from './db/connection.js';
import Producto from './models/producto.js';
import Usuario from './models/usuario.js';

const app = express();
const exposedPort = 1234;

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li><li>POST: /productos/</li><li>DELETE: /productos/id</li><li>PUT: /productos/id</li><li>PATCH: /productos/id</li><li>GET: /usuarios/</li><li>GET: /usuarios/id</li><li>POST: /usuarios/</li><li>DELETE: /usuarios/id</li><li>PUT: /usuarios/id</li><li>PATCH: /usuarios/id</li><li>GET: /productos/precio/:id</li><li>GET: /productos/nombre/:id</li><li>GET: /usuarios/telefono/:id</li><li>GET: /usuarios/nombre/:id</li><li>GET: /productos/stock-total</li></ul>');
});

// Endpoint para obtener el listado completo de usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Endpoint para obtener los datos de un usuario por ID
app.get('/usuarios/:id', async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
});

// Endpoint para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});

// Endpoint para modificar un atributo de un usuario por ID
app.put('/usuarios/:id', async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await usuario.update(req.body);
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
});

// Endpoint para borrar un usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});

// Endpoint para obtener el precio de un producto por ID
app.get('/productos/precio/:id', async (req, res) => {
    const productoId = parseInt(req.params.id);
    try {
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ precio: producto.precio });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener precio del producto' });
    }
});

// Endpoint para obtener el nombre de un producto por ID
app.get('/productos/nombre/:id', async (req, res) => {
    const productoId = parseInt(req.params.id);
    try {
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ nombre: producto.nombre });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener nombre del producto' });
    }
});

// Endpoint para obtener el teléfono de un usuario por ID
app.get('/usuarios/telefono/:id', async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ telefono: usuario.telefono });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener teléfono del usuario' });
    }
});

// Endpoint para obtener el nombre de un usuario por ID
app.get('/usuarios/nombre/:id', async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ nombre: usuario.nombre });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener nombre del usuario' });
    }
});

// Endpoint para obtener el total del stock actual de productos
app.get('/productos/stock-total', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        const totalStock = productos.reduce((total, producto) => total + producto.stock, 0);
        res.status(200).json({ totalStock });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el total del stock de productos' });
    }
});

// Código de conexión a la base de datos
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(exposedPort, () => {
    console.log('Servidor escuchando en http://localhost:' + exposedPort);
});