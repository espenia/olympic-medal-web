import getEvent from "./actions";
import CrearEvento from "../../new/page";

export default async function EditEvent({ params }: { params: { slug: number }}) {
    const event = await getEvent(params.slug);
    return <CrearEvento event={event}></CrearEvento>;
}