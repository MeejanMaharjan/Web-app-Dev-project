
import { body, validationResult } from 'express-validator';

const movieValidationRules = [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),

    body('genre')
        .notEmpty()
        .withMessage('Genre is required'),
    
    body('year') 
        .isInt({ min: 1888 })
        .withMessage('Year must be a valid integer from 1888 onward'),
        
    body('rating') 
        .isFloat({ min: 0, max: 10 })
        .withMessage('Rating is required and must be between 0 and 10'),
];
const validateMovie = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export { movieValidationRules, validateMovie };