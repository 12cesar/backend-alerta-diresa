


const semanaArray=(semana)=>{
    let semanas='';
      if (Array.isArray(semana)) {
          for (let i = 0; i < semana.length; i++) {
              semanas += semana[i]+`${(semana.length-1 === i) ? '':','}`;
          }
          return semanas;
      }else{
        semanas = semana;
        return semanas;
      }
}


module.exports = {
    semanaArray
}