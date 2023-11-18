import { UUID } from "crypto";
import getEvent from "./actions";
import CrearEvento from "../../new/page";

export default async function EditEvent({ params }: { params: { slug: UUID }}) {
    const event = await getEvent(params.slug);
    return <CrearEvento event={event} redirectTo={`/events/${params.slug}`}></CrearEvento>;
}