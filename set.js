const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZFaExvakZHRGh2V0s5UEU1aWsrYW5ISk5UM20yWE82TlAvWERMYjZGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEpmcDlqbmltSHp2UGVJREpWZXVjempTMDhmL0xiN1NYckptRDhIWGVoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RHA2OVVFUXVpMG0rVTg5UGV4QTcrWGN5TlcyRGxLNUx1ZE1CV2w3SEZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6clc3TkdqL01KckRzaUp5THJSTnJNL3JvZ1hpVHBOemJuR040eTMyeTA0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNLVzFzYzRUK2gyZElVRGE4dENoTUR6Vi9iWXpMTTloZmZhVVpYekNURTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im0ySm1ESHhkMkZaSU10UFFuNWgxaUVmb250TU5vQlg4YzBuV24wb1BZRHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUI2c1NucWhSVjVGL2xrbVN0eUx3RG96d3luRkdvWEdpLzdjb2J6ZVExUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUStjMXhhQUNFN044MllvUmplUmxxVFIvY1d0ejNlb25tQVRJU1dBdFRSdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBOc3hnSjBjL1Z6T09sOFVFQVVQUFIvd2tpRWJRY1RwMFNTUzF3N015Mmo1dzdtdUZjSGVZQytydWZSZGxMbHhKRUw0cXI2dWl3T0R2b0lza2dvcmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NSwiYWR2U2VjcmV0S2V5IjoiOUdGbkdkTzR2K3pJRmpQYXVZRnNQMVNWUHh3amJ5M3lNajdpQzZMMElJQT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOmZhbHNlLCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFBFdW9nR0VJTC9qc0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieUxMOFpsQy8yZFFVamFXMlUxbVdaY1hTU3hMSmZKOXFrb2FLTk52bktBZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiL05ma3pkQXFNR1hWcXBxZi9jc2dGM3JBd3B0YlJkakhuMTdMRHpUOHlESDZyOFVTeS9hWlhweDkxSE85blZpd0lkdXJkZVBsQmpEQjZIUFVDSzdRQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImlzMHVRNEMxbFVuVkFqSGVaZ2wzRUQxem1EencvNGZzelIyTlVnem1hWWpDQzNjd2tna3k5NERPclhFUUlDWWE5bU1rdEZrWHppajdHTTVQYkZzQWhRPT0ifSwibWUiOnsiaWQiOiIyNjM3ODMyNzM2NTU6N0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE2NjAwOTUxMjE5NDEzMjo3QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODMyNzM2NTU6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjaXkvR1pRdjluVUZJMmx0bE5abG1YRjBrc1N5WHlmYXBLR2lqVGI1eWdJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDUwNzYxMTIsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUE1xIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cheure",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263783273655",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
