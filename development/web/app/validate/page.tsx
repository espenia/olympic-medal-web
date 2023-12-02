'use server';
import ClasificacionEvento from './clasification';
import { getClassification, getUser } from './actions';


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
