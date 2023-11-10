'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, Title, Text, Button } from '@tremor/react';

const Registro = () => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/signup', data);
      console.log('Usuario registrado con éxito:', response.data);

      // Redirige al usuario a la URL deseada después de registrarse
      window.location.href = '/api/auth/signin';
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Registro</Title>
        <Text>Ingresa tus datos para registrarte.</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Text>Nombre de usuario:</Text>
            <input {...register('username', { required: true })} type="email" />
          </div>
          <div>
            <Text>Nombre:</Text>
            <input {...register('firstName', { required: true })} type="text" />
          </div>
          <div>
            <Text>Apellido:</Text>
            <input {...register('lastName', { required: true })} type="text" />
          </div>
          <div>
            <Text>Fecha de nacimiento:</Text>
            <input {...register('birthdate', { required: true })} type="date" />
          </div>
          <div>
            <Text>Contraseña:</Text>
            <input {...register('password', { required: true })} type="password" />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Enviar
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default React.memo(Registro);