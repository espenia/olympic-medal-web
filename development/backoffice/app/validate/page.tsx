'use client';
import React, { useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';

const ClasificacionDeportista = () => {

  const deportista = {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
  };
  const evento = {
    id: 1,
    nombre: "Maraton 10k BSAS",
  };
  const tiempoClasificacion = "2 horas 30 minutos";

  const [estadoClasificacion, setEstadoClasificacion] = useState('Pendiente');

  const handleValidar = () => {
    setEstadoClasificacion('Validado');
  };

  const handleRechazar = () => {
    setEstadoClasificacion('Rechazado');
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Clasificación de Deportista</Title>
        <div>
          <Text>Deportista: {deportista.nombre} {deportista.apellido}</Text>
        </div>
        <div>
          <Text>Evento: {evento.nombre}</Text>
        </div>
        <div>
          <Text>Tiempo de Clasificación: {tiempoClasificacion}</Text>
        </div>
        <div>
          <Text>Estado de Clasificación: {estadoClasificacion}</Text>
        </div>
        <Button
          onClick={handleValidar}
          className="bg-green-500 text-white p-2 mt-4"
        >
          Validar
        </Button>
        <Button
          onClick={handleRechazar}
          className="bg-red-500 text-white p-2 mt-4"
        >
          Rechazar
        </Button>
      </Card>
    </main>
  );
};

export default ClasificacionDeportista;
