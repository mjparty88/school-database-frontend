const { check, body, validationResult } = require('express-validator');

///middleware validation for the user resources (using express-validator)
exports.userValidationChain = [
  check('firstName')
    .exists({checkNull: true, checkFalsy: true}).withMessage("User's firstName must be provided")
    .isAlpha().withMessage("firstName must be a string - no numbers or special symbols"),
  check('lastName')
    .exists({checkNull: true, checkFalsy: true}).withMessage("User's lastname must be provided")
    .isAlpha().withMessage("lastName must be a string - no numbers or special symbols"),
  check('emailAddress')
    .exists({checkNull: true, checkFalsy: true}).withMessage("User's emailAddress must be provided")
    .isEmail().withMessage("You must provide a valid email address"),
  check('password')
    .exists({checkNull: true, checkFalsy: true}).withMessage("User's password must be provided")
  ];
