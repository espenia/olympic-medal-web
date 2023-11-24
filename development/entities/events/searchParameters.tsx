import Parameters from '../common/interfaces/parameters'
import EventClassifications from './classifications'

export default class ClassificationSearchParameters extends Parameters<EventClassifications> {
    firstName?: string;
    lastName?: string;
}