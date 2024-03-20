global.logger = require('node-file-logger');

logger.SetUserOptions({
    timeZone: 'Europe/Paris',
    folderPath: './logs/',
    dateBasedFileNaming: true,
    fileNamePrefix: 'log_',
    fileNameExtension: '.log',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: 'HH:mm:ss',
    logLevel: 'debug',
    timeFormat: 'HH:mm:ss',
    onlyFileLogging: false,
});