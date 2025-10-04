import app from '#index.js';
import config from '#config/config.js';

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});