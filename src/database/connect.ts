import { createConnection } from 'typeorm';

createConnection().then(() => console.log('Tamo conectado'));
