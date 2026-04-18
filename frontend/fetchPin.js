const https = require('https');
https.get('https://pin.it/4E3mkPKzd', (res) => {
  let location = res.headers.location;
  if (!location && res.statusCode >= 300 && res.statusCode < 400) {
    console.log("No location header redirect");
    return;
  }
  if (!location) {
     location = 'https://pin.it/4E3mkPKzd'; // maybe it didn't redirect
  }
  
  // Follow the redirect
  https.get(location, (res2) => {
    let data = '';
    res2.on('data', chunk => data += chunk);
    res2.on('end', () => {
      const match = data.match(/<meta property="og:image" content="(.*?)"/);
      console.log(match ? match[1] : 'No image found');
    });
  }).on('error', err => console.log('Err2: ', err.message));
}).on('error', err => console.log('Err: ', err.message));
