'use client';

import { Card, Title, Text, Button } from '@tremor/react';
import Search from '../../src/search-bar/search';
import { useState } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


export default function Events() {
  // Datos del evento
  const [inscrito, setInscrito] = useState(false);

  const eventoDeportivo = {
    nombre: "Evento Deportivo",
    descripcion: "Descripción del evento deportivo",
    tipoDeporte: "Maraton 10k",
    localizacion: "Buenos Aires",
    capacidadActual: 50,
    capacidadMaxima: 100,
    abierto: false,
  };

  // Función para manejar la inscripción o desinscripción
  const handleInscripcionDesinscripcion = () => {
    // Cambiar el estado de inscrito
    setInscrito(!inscrito);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="text-3xl font-bold">{eventoDeportivo.nombre}</Title>
      <Text className="text-lg">{eventoDeportivo.descripcion}</Text>
      <Text className="text-lg">Tipo de deporte: {eventoDeportivo.tipoDeporte}</Text>
      <Text className="text-lg">Localización: {eventoDeportivo.localizacion}</Text>
      <Text className="text-lg">Capacidad: {eventoDeportivo.capacidadActual} / {eventoDeportivo.capacidadMaxima}</Text>
      <Text className={`text-lg ${eventoDeportivo.abierto ? 'text-green-500' : 'text-red-500'}`}>Estado: {eventoDeportivo.abierto ? "Abierto" : "Cerrado"}</Text>
      <Card className="mt-6">
        {/* Renderizar botón de inscripción o desinscripción según el estado */}
        <Card className="mt-6">
          {eventoDeportivo.abierto && (  // Agregar condición para mostrar solo si el evento está abierto
            inscrito ? (
              <Button onClick={handleInscripcionDesinscripcion} className="bg-red-500 text-white">
                Desinscribirse
              </Button>
            ) : (
              <Button onClick={handleInscripcionDesinscripcion} className="bg-green-500 text-white">
                Inscribirse
              </Button>
            )
          )}
        </Card>

        {!eventoDeportivo.abierto && (
          <a href="/form">
            <Button className="bg-blue-500 text-white mt-4">Cuestionario</Button>
          </a>
        )}
      </Card>
    </main>
  );
}

