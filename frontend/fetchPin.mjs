import fs from 'fs';
fetch('https://pin.it/4E3mkPKzd').then(r=>r.text()).then(t => {
  const match = t.match(/<meta property="og:image" content="(.*?)"/);
  console.log(match ? match[1] : "not found");
});
