const PasswordValidator = require("password-validator");

const schema = new PasswordValidator();

schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .symbols()
    .has()
    .not()
    .spaces();

/**
 *
 * @param {string} password
 * @returns {Array} An array of objects that tell why the password failed the evaluation or an empty array if the password is valid
 */
const evaluate_password = (password) => {
    return schema.validate(password, { details: true });
};

module.exports = evaluate_password;