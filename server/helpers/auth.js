import bcrypt from "bcrypt";

//blend password and return
//get the plain password and return hashed version
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // 12 is strength level
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
              reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                reject(err);
              }
              resolve(hash);
            });
          });
        });
      };
//compared the password and return 
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
  };
  