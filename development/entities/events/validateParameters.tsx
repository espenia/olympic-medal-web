import Parameters from '../common/interfaces/parameters'
import EventClassifications from './classifications'

export default class ClassificationValidateParameters extends Parameters<EventClassifications> {
    firstName?: string;
    lastName?: string;
    idClassification?: number
}