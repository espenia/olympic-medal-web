'use client';
import React, { useState } from 'react';
import { Card, Title, Text, Button, Select } from '@tremor/react';

const PerfilUsuario = () => {
  const usuario = {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    fechaNacimiento: "01/01/1990",
    perfilPublico: true, //Supongo que el perfil se crea publico x default
  };

  const [perfilPublico, setPerfilPublico] = useState(usuario.perfilPublico);

  const handlePerfilPublicoChange = (event) => {
    setPerfilPublico(event.target.value === "true");
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Mi Perfil</Title>
        <div>
          <Text>Nombre: {usuario.nombre}</Text>
        </div>
        <div>
          <Text>Apellido: {usuario.apellido}</Text>
        </div>
        <div>
          <Text>Fecha de Nacimiento: {usuario.fechaNacimiento}</Text>
        </div>
        <div>
          <Text>Privacidad de mi perfil:</Text>
          <select
            name="abierto"
            value={String(perfilPublico)} // Convierte a cadena
            onChange={handlePerfilPublicoChange}
            className="border p-2 w-full"
          >
            <option value="true">Abierto</option>
            <option value="false">Cerrado</option>
          </select>
        </div>
        <Button className="bg-blue-500 text-white p-2 mt-4">
          Guardar Cambios
        </Button>
      </Card>
    </main>
  );
};

export default PerfilUsuario;
