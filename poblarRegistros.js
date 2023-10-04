import Producto from './models/producto.js';
import Usuario from './models/usuario.js';

async function poblarBaseDeDatos() {
  try {
    // Poblar la tabla de productos
    await Producto.bulkCreate([
      {
        nombre: 'Producto 1',
        tipo: 'Tipo 1',
        precio: 10.99,
      },
      {
        nombre: 'Producto 2',
        tipo: 'Tipo 2',
        precio: 20.49,
      },
    ]);

    // Poblar la tabla de usuarios
    await Usuario.bulkCreate([
      {
        dni: '12345678',
        nombres: 'Usuario 1',
        apellidos: 'Apellido 1',
        email: 'usuario1@example.com',
        telefono: '123-456-7890',
      },
      {
        dni: '87654321',
        nombres: 'Usuario 2',
        apellidos: 'Apellido 2',
        email: 'usuario2@example.com',
        telefono: '987-654-3210',
      },
    ]);

    console.log('Registros de ejemplo insertados en la base de datos');
  } catch (error) {
    console.error('Error al poblar registros:', error);
  }
}

// Llama a la función para poblar la base de datos
poblarBaseDeDatos();