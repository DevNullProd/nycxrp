const RippleAPI = require('ripple-lib').RippleAPI;
const jp = require('jsonpath');

const api = new RippleAPI({
  server: 'wss://s1.ripple.com'
});

api.connect().then(() => {
  const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';
  api.getAccountInfo(myAddress).then(info => {
    console.log(info)
  });

  api.connection.on('transaction', tx => {
    if(jp.query(tx, '$..[?(@.TransactionResult == "tesSUCCESS")]').length > 0)
      console.log(tx);
  });

  api.connection.request({
    command: 'subscribe',
    streams: ['transactions']
  });
}).catch(console.error);
