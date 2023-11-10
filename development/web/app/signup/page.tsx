'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, Title, Text, Button } from '@tremor/react';
import UserDto from '../../../entities/users/user';
import ApiGateway from '../../../infrastructure/src/gateways/gateway';
import { exit } from 'process';

const Registro = () => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data:any) => {
    try {
      const userDto = new UserDto();
      userDto.firstName = data.firstName;
      userDto.lastName = data.lastName;
      userDto.username = data.username;
      userDto.password = data.password;
      userDto.birthdate = new Date(data.birthdate);
      const apiGateway = new ApiGateway();

      await apiGateway.createUser(userDto);

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
            <Text>Email:</Text>
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
