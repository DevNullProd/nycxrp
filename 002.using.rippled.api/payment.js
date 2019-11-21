const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233'
});

api.connect().then(() => {
  const src = { 'public' : 'rfArGpLJWxZqS8BR3gfCX5LgtAxXwMeHpQ',
               'private' : 'ssXkpbkUftD47bvxxAa471yK65yjn'};

  const dst = { 'public' : 'rpTLussqxN8eByRd4dYJnTjkT38iKaKzEW',
               'private' : 'snK1RNdto1ZY3dVRDgMXaqc1HjaV8' };

  const payment = { source : { address : src['public'], maxAmount : { value : "10", currency : 'XRP' } },
               destination : { address : dst['public'],    amount : { value : "10", currency : 'XRP' } } };

  api.preparePayment(src['public'], payment, {}).then(prepared => {
    const signed = api.sign(prepared.txJSON, src['private']);
    api.submit(signed.signedTransaction).then(result => {
      console.log(result);
    });
  });
});
