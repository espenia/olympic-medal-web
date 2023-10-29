'use client';

import React, { useState } from 'react';
import axios from 'axios'; // Quiza podamos usar otra libreria
import { Card, Title, Text, Button } from '@tremor/react';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

import { register } from './actions';

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  password: ''
};

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className="bg-blue-500 text-white p-2 mt-4">
      Enviar
    </button>
  )
}

export default function Registro() {
  const [state, formAction] = useFormState(register, initialState)

  // const [userData, setUserData] = useState({
  //   username: '',
  //   nombre: '',
  //   apellido: '',
  //   fechaNacimiento: '',
  //   password: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({
  //     ...userData,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('/register', userData);
  //     console.log('Usuario registrado con éxito:', response.data);
  //     setUserData({
  //       username: '',
  //       nombre: '',
  //       apellido: '',
  //       fechaNacimiento: '',
  //       password: ''
  //     });
  //   } catch (error) {
  //     console.error('Error al registrar el usuario:', error);
  //   }
  // };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Registro</Title>
      <Text>
        Ingresa tus datos para registrarte.
      </Text>
      <form action={formAction}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="email"
            id="username"
            name="username"
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
          />
        </div>
        <div>
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            name="birthdate"
            id="birthDate"
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        {/* <Button type="submit">Registrarse</Button> */}
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </main>
  );
};