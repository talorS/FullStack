const jFile = require('jsonfile');

exports.writeDataToFile = function (file, data) {
    return new Promise((resolve, reject) => {
        jFile.writeFile(file, data, { spaces: 2 }, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded');
            }
        })
    })
}
