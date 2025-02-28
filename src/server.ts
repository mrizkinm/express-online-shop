import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});