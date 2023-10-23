'use client';

import React, { useState } from 'react';
import axios from 'axios'; // Quiza podamos usar otra libreria
import { Card, Title, Text, Button } from '@tremor/react';

const Registro = () => {
  const [userData, setUserData] = useState({
    username: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', userData);
      console.log('Usuario registrado con éxito:', response.data);
      setUserData({
        username: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        password: ''
      });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Registro</Title>
      <Text>
        Ingresa tus datos para registrarte.
      </Text>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={userData.apellido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={userData.fechaNacimiento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Registrarse</Button>
      </form>
    </main>
  );
};

export default Registro;