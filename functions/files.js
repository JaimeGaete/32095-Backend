
const fs = require('fs');

const add = (path, data) => {
    fs.appendFileSync(path, data + '\n')
}

const upd = (path, data) => {
    del(path)

    data.forEach(val => {
        add(path, val)    
    });
}

const del = (path) => {
    fs.unlinkSync(path);
}

module.exports.add = add
module.exports.upd = upd
