
const funDate=()=> {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date();
    const output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0')+ '-' + String(date.getDate()).padStart(2, '0');
    const separ = String(date).split(' ');
    const fecha = output;
    console.log(String(date.getHours()).length);
    const hora = `${(String(date.getHours()).length<=1)?`0${date.getHours()}`:date.getHours()}:${date.getMinutes()}:${String(date.getMilliseconds()).substr(0,2)}`;
    const ano = date.getFullYear();
    const dia = date.getDay();
    return {
        hora,
        fecha,
        ano,
        dia
    }
}


module.exports = {
    funDate
};