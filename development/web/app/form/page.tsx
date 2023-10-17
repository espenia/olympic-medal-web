'use client';
import React, { useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';

const FormularioCuestionario = () => {
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tiempoTotal = horas * 3600 + minutos * 60 + segundos;

    if (tiempoTotal > 0) {
      setEnviado(true);
    } else {
      alert("Por favor, ingresa un tiempo válido.");
    }
  };

  const actualizarHoras = (valor) => {
    if (valor >= 0) {
      setHoras(valor);
    }
  };

  const actualizarMinutos = (valor) => {
    if (valor >= 0 && valor < 60) {
      setMinutos(valor);
    }
  };

  const actualizarSegundos = (valor) => {
    if (valor >= 0 && valor < 60) {
      setSegundos(valor);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="cuestionario-titulo">Cuestionario</Title>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-4">
            <Text className="label-horas">Horas</Text>
            <input
              type="number"
              className="form-control input-tiempo"
              placeholder="0"
              value={horas}
              onChange={(e) => actualizarHoras(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="col-4">
            <Text className="label-minutos">Minutos</Text>
            <input
              type="number"
              className="form-control input-tiempo"
              placeholder="0"
              value={minutos}
              onChange={(e) => actualizarMinutos(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="col-4">
            <Text className="label-segundos">Segundos</Text>
            <input
              type="number"
              className="form-control input-tiempo"
              placeholder="0"
              value={segundos}
              onChange={(e) => actualizarSegundos(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        <Button type="submit" className="btn-primary mt-3">
          Enviar
        </Button>
      </form>

      {enviado && (
        <Text className="mt-3 alert-success enviado-mensaje">
          ¡Gracias por enviar tus calificaciones!
          Apenas sean verificadas por un admin, las veras en tu medallero
        </Text>
      )}
    </main>
  );
};

export default FormularioCuestionario;