'use client';
import React, { useState } from 'react';
import { Card, Title, Text, Button, Select } from '@tremor/react';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

import { changePrivacy } from './actions';

const initialState = {
  public: true //Supongo que el perfil se crea publico x default
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className="bg-blue-500 text-white p-2 mt-4">
      Cambiar privacidad
    </button>
  )
}

const PerfilUsuario = () => {
  const [state, formAction] = useFormState(changePrivacy, initialState)

  const usuario = {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    fechaNacimiento: "01/01/1990",
    perfilPublico: true, //Supongo que el perfil se crea publico x default
  };

  // const [perfilPublico, setPerfilPublico] = useState(usuario.perfilPublico);

  // const handlePerfilPublicoChange = (event) => {
  //   setPerfilPublico(event.target.value === "true");
  // };

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
          <form action={formAction}>
            </form>
          <select
            name="public"
            id="public"
            // value={String(perfilPublico)} // Convierte a cadena
            // onChange={handlePerfilPublicoChange}
            className="border p-2 w-full"
          >
            <option value="true">Publico</option>
            <option value="false">Privado</option>
          </select>
        </div>
        {/* <Button className="bg-blue-500 text-white p-2 mt-4">
          Guardar Cambios
        </Button> */}
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </Card>
    </main>
  );
};

export default PerfilUsuario;
