'use client';
import React from 'react';
import { Card, Title, Text, Button } from '@tremor/react';
import { acceptClassification } from './actions';

interface ClasificacionEventoProps {
  nombre_deportista: string;
  nombre_evento: string;
  tiempoClasificacion: string;
  id_clasificacion: number;
  firstName:string;
  lastName:string;
}

const ClasificacionEvento: React.FC<ClasificacionEventoProps> = async ({
  nombre_deportista,
  nombre_evento,
  tiempoClasificacion,
  id_clasificacion,
  firstName,
  lastName
}) => {

  const handleValidar = async (id_clasificacion: number) => {
    try {
      const data = await acceptClassification(id_clasificacion);
    } catch (error) {
      console.error('Error al validar:', error);
    }
  };

  const handleRechazar = async (id_clasificacion: number) => {
    try {
      const data = await declineClassification(id_clasificacion);
    } catch (error) {
      console.error('Error al rechazar:', error);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
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
          onClick={() => handleValidar(id_clasificacion)}
          className="bg-green-500 text-white p-2 mt-4"
        >
          Validar
        </Button>
        {/*<Button*/}
        {/*  onClick={() => handleRechazar(id_clasificacion)}*/}
        {/*  className="bg-red-500 text-white p-2 mt-4"*/}
        {/*>*/}
        {/*  Rechazar*/}
        {/*</Button>*/}
      </Card>
    </div>
  );
};

export default ClasificacionEvento;