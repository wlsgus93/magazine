export const emailCheck= (email) =>{
      // aa-_.123aa@aa.com
      let _reg=/^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

      return _reg.test(email);
}