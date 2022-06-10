const axios = require('axios').default;
const tunnel = require('tunnel');

const baseURL= 'https://api.apis.net.pe';

const agent = tunnel.httpsOverHttp({
    proxy: {
        host: '192.168.100.1',
        port: 8080, 
    },
});

const sunatApi = axios.create({
    baseURL,
    httpsAgent:agent,
});


sunatApi.interceptors.request.use(function(config){
        config.headers.Authorization = 'Bearer apis-token-2218.PkfcgkhsDPYGo17IKBVXCJRHpk-qxAkA';
        config.headers.Accept ='application/json';
        return config;
    },null, {synchronous:true}
);

module.exports = sunatApi;