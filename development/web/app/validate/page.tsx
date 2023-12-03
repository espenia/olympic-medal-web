'use server';
import ClasificacionEvento from './clasification';
import { getClassification, getUser } from './actions';
import {Card, Flex, Title} from "@tremor/react";


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
      <Card>
        <Flex justifyContent="center" className="pb-8" alignItems="center">
          <Title>Validar Clasificaciones</Title>
        </Flex>
        <div>
          {clasificacionComponents.length === 0 ?
              <Flex justifyContent="center">
                No se encontraron clasificaciones para validar
              </Flex>
              : clasificacionComponents }
        </div>

        </Card>
    </div>
  );
}

export default ClasificacionDeportista;
