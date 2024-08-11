import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.error('Server closed due to unhandled rejection');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.error('Server closed due to uncaught exception');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
