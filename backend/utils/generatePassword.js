import bcrypt from 'bcryptjs';

const generatePassword = (firstname, lastname, mobileNumber) => {
    let simplePassword = `${firstname[0]}${lastname}${mobileNumber.slice(-4)}`;
    simplePassword = simplePassword.toLowerCase();
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(simplePassword, salt);
    return { simplePassword, encryptedPassword };
};

export default generatePassword;