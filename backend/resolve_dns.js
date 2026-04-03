import { Resolver } from 'dns';
import fs from 'fs';

const resolver = new Resolver();
resolver.setServers(['8.8.8.8']); // Use Google DNS

resolver.resolveSrv('_mongodb._tcp.cluster0.flqnj6n.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('SRV Error:', err);
    process.exit(1);
  }
  
  const servers = addresses.map(a => `${a.name}:${a.port}`).join(',');

  resolver.resolveTxt('cluster0.flqnj6n.mongodb.net', (err, txtRecords) => {
    let txtArgs = '';
    if (!err && txtRecords.length > 0) {
      txtArgs = '&' + txtRecords.flat().join('&');
    }
    fs.writeFileSync('dns_output.txt', `SERVERS=${servers}\nTXT=${txtArgs}\n`);
  });
});
