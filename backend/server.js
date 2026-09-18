import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`MarketMentor API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start MarketMentor API:", error.message);
    process.exit(1);
  });
