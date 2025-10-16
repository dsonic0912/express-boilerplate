import app from '#index.js';
import config from '#config/config.js';
import { verifyConnection } from '#db/db.js';

// Verify database connection before starting the server
(async () => {
  try {
    await verifyConnection();
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
})();

// Start the server
app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});