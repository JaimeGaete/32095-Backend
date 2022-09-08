
// Fecha en formato timestamp
const getDateTime = () =>
{
    const dateObj = new Date();

    let year = dateObj.getFullYear();
    
    let month = dateObj.getMonth();
    month = ('0' + month).slice(-2);
    
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
   
    return `${year}/${month}/${date} ${hour}:${minute}:${second}`;
}

module.exports.getDateTime = getDateTime
