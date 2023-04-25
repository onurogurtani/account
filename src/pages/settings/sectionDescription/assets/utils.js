export const validateNumber = (rule, value, callback) => {
    if (value <= 0) {
        callback('');
    } else {
        callback();
    }
};
