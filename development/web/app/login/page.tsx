'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Title, Text, Button } from '@tremor/react';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

import { login } from './actions';

const initialState = {
  username: "",
  password: ""
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Iniciar sesion
    </button>
  )
}

export default function Login() {
  const [state, formAction] = useFormState(login, initialState)

  // const [credenciales, setCredenciales] = useState({
  //   username: '',
  //   password: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCredenciales({
  //     ...credenciales,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('/login', credenciales);
  //     console.log('Usuario autenticado:', response.data);
  //     setCredenciales({
  //       username: '',
  //       password: ''
  //     });
  //   } catch (error) {
  //     console.error('Error al iniciar sesión:', error);
  //   }
  // };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
    <Title>Iniciar Sesión</Title>
       <Text>
         Ingresa tus credenciales para iniciar sesión.
       </Text>
       <form action={formAction}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
           <input
            type="email"
            name="username"
            id="username"
            required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </main>
    // <main className="p-4 md:p-10 mx-auto max-w-7xl">
    //   <Title>Iniciar Sesión</Title>
    //   <Text>
    //     Ingresa tus credenciales para iniciar sesión.
    //   </Text>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Nombre de usuario:</label>
    //       <input
    //         type="text"
    //         name="username"
    //         value={credenciales.username}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Contraseña:</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={credenciales.password}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <Button type="submit">Iniciar Sesión</Button>
    //   </form>
    // </main>
  );
};