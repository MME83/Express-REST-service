import { PORT } from './common/config';
import app from './app';
import { logger } from './logger/logger';

app.listen(PORT, () => {
  process.stdout.write(`App is running on http://localhost:${PORT}\n`);
  logger.info(`App is running on http://localhost:${PORT}\n`);
});
