'use client';
import React, { useState } from 'react';
import './Formulario.css'; 

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
    <div className="container mt-4">
      <h2 className="cuestionario-titulo">Cuestionario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-4">
            <label className="label-horas">Horas</label>
            <input
              type="number"
              className="form-control input-tiempo"
              placeholder="0"
              value={horas}
              onChange={(e) => actualizarHoras(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="col-4">
            <label className="label-minutos">Minutos</label>
            <input
              type="number"
              className="form-control input-tiempo"
              placeholder="0"
              value={minutos}
              onChange={(e) => actualizarMinutos(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="col-4">
            <label className="label-segundos">Segundos</label>
            <input
              type="number"
              className="form-control input-tiempo"
              placeholder="0"
              value={segundos}
              onChange={(e) => actualizarSegundos(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Enviar</button>
      </form>

      {enviado && (
        <p className="mt-3 alert alert-success enviado-mensaje">¡Gracias por enviar tus respuestas!</p>
      )}
    </div>
  );
};

export default FormularioCuestionario;