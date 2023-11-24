'use client';
import React, { useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';

interface ClasificacionEventoProps {
  nombre_deportista: string;
  nombre_evento: string;
  tiempoClasificacion: string;
  id_clasificacion: number;
}

const ClasificacionEvento: React.FC<ClasificacionEventoProps> = ({
  nombre_deportista,
  nombre_evento,
  tiempoClasificacion,
  id_clasificacion,
}) => {


  const handleValidar = () => {
  };

  const handleRechazar = () => {
  };

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Clasificación de Deportista</Title>
        <div>
          <Text>Deportista: {nombre_deportista} </Text>
        </div>
        <div>
          <Text>Evento: {nombre_evento}</Text>
        </div>
        <div>
          <Text>Tiempo de Clasificación: {tiempoClasificacion}</Text>
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
    </div>
  );
};

export default ClasificacionEvento;
