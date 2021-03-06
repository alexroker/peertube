"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSortableColumns = exports.checkSort = exports.areValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const logger_1 = require("../../helpers/logger");
function areValidationErrors(req, res) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        logger_1.logger.warn('Incorrect request parameters', { path: req.originalUrl, err: errors.mapped() });
        res.status(400).json({ errors: errors.mapped() });
        return true;
    }
    return false;
}
exports.areValidationErrors = areValidationErrors;
function checkSort(sortableColumns) {
    return [
        express_validator_1.query('sort').optional().isIn(sortableColumns).withMessage('Should have correct sortable column'),
        (req, res, next) => {
            logger_1.logger.debug('Checking sort parameters', { parameters: req.query });
            if (areValidationErrors(req, res))
                return;
            return next();
        }
    ];
}
exports.checkSort = checkSort;
function createSortableColumns(sortableColumns) {
    const sortableColumnDesc = sortableColumns.map(sortableColumn => '-' + sortableColumn);
    return sortableColumns.concat(sortableColumnDesc);
}
exports.createSortableColumns = createSortableColumns;
