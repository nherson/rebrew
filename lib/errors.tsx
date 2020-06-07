import { ValidationError } from "sequelize/types";
import _ from 'lodash';

// format errors into something that looks decent on the API
export const formatValidationError = (error: ValidationError): string[] => {
    return _.map(error.errors, (err) => err.message)
}