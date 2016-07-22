
module.exports = function() {

    var superAgent = require('superagent');


    return {
        /**
         * 发送数据
         * @param method
         * @param url
         * @param data
         * @param callback
         */
        sendData: function (method, url, data, callback) {
            console.log('enter\n');
            console.log('B2B will Send msg :(' + url + ')' + JSON.stringify(data) + '\n');
            superAgent[method](url)
                .send(JSON.stringify(data))
                .set('content-type', 'application/json')
                //.set('content-type', 'application/x-www-form-urlencoded')
                .set('Accept', 'application/json')
                .end(function superAgentCallback(error, res) {
                    if(error || !res.ok){
                        console.log('error: ', error + '\n');
                        callback(error);
                    }else{
                        if (res.ok) {
                            console.log('发送消息的返回值:'+ res.text.length > 20000 ? res.text.substr(0,20000) + '...' : res.text + '\n');
                            try {
                                var data = JSON.parse(res.text);
                            } catch (exception){
                                return callback(exception);
                            }
                            console.log('after send msg, feedback:'+ JSON.stringify(data).length > 20000 ? JSON.stringify(data).substr(0,20000) + '...' : data + '\n');
                            return callback(null, data);
                        }
                        else{
                            console.log('send data error!\n');
                            callback('send data error!');
                        }
                    }
                });
        }
    };


};