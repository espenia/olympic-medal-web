'use client';
import React, { useEffect, useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';
import ClasificacionEvento from './clasification';
import { getClassification } from './actions';
import EventClassifications from '../../../entities/events/classifications';

/*const getClassification = (firstName: string, lastName: string) => {
  // Lógica para obtener la lista de clasificaciones
  return [
    {
      id_clasificacion: 1,
      posicion: 1,
      duracion: '2 horas',
      atleta_first_name: 'Juan',
      lastname: 'Perez',
      event_id: 1,
      event_name: 'Maratón',
      event_edition: '2023',
    },
    {
      id_clasificacion: 1,
      posicion: 5,
      duracion: '5 dias',
      atleta_first_name: 'Pedro',
      lastname: 'Dominguez',
      event_id: 2,
      event_name: 'Triatlon',
      event_edition: '2021',
    },
    // ... más elementos
  ];
};*/

const ClasificacionDeportista = () => {

  const [instanciasClasificacion, setInstanciasClasificacion] = useState<JSX.Element[]>([]);


  /*const firstName = 'a';
  const lastName = 'a';*/

  const [classifications, setClassifications] = useState<EventClassifications[]>([]);
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const searchClasifications = getClassification(firstName, lastName).then(classifications => setClassifications(classifications));

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClassification(firstName, lastName);
        const instancias: JSX.Element[] = []; // Inicializar como un array vacío

        data.forEach((clasificacion: EventClassifications) => {
          instancias.push(
            <ClasificacionEvento
              key={clasificacion.id}
              nombre_deportista={clasificacion.athlete_first_name + " " + clasificacion.athlete_last_name}
              nombre_evento={clasificacion.eventName || "Not found"}
              tiempoClasificacion={clasificacion.hours ? String(clasificacion.hours) : "Tiempo por Defecto"}
              id_clasificacion={clasificacion.id || -1}
            />
          );
        });

        setInstanciasClasificacion(instancias);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [firstName, lastName]);

  return (
    <div>
      {instanciasClasificacion}
    </div>
  );
}

export default ClasificacionDeportista;
