export const required = (val) => val && val.length > 0;
export const minLength = len => (val) => val && val.length >= len;
export const isEmail = val => !val || /(.+)@(.+){2,}\.(.+){2,}/.test(val);

export const passwordsMatch = vals => vals.password === vals.password_repeat;
export const passwordMinLength = vals => vals.password.length >= 8;
export const email = vals => /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(vals.email);

export const emailValidators = { required, isEmail, minLength: minLength(5) };
