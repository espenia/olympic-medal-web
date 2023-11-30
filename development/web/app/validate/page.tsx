'use server';
import React, { useEffect, useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';
import ClasificacionEvento from './clasification';
import { getClassification, getUser } from './actions';
import EventClassifications from '../../../entities/events/classifications';
import { getServerSession } from 'next-auth';
import UserDto from '../../../entities/users/user';


const ClasificacionDeportista = async () => {


  const user = await getUser();
  const firstName = user.firstName;
  const lastName =user.lastName;

  const data = await getClassification(firstName, lastName);

  const clasificacionComponents = data.map((clasificacion) => (
    <ClasificacionEvento
      key={clasificacion.id}
      nombre_deportista={`${clasificacion.athlete_first_name} ${clasificacion.athlete_last_name}`}
      nombre_evento={`${clasificacion.event_name}`}
      tiempoClasificacion={`${clasificacion.duration_hours}h - ${clasificacion.duration_minutes}m - ${clasificacion.duration_seconds}s`}
      id_clasificacion={clasificacion.id || 0}
      firstName={`${clasificacion.athlete_first_name}`}
      lastName={`${clasificacion.athlete_last_name}`}
    />
  ));

  return (
    <div>
      {clasificacionComponents}
    </div>
  );
}

export default ClasificacionDeportista;
