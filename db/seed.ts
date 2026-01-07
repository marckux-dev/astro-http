import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

  await db.insert(Clients).values([
    { id:1, name: 'Marcos', age: 50, isActive: true },
    { id:2, name: 'Juani', age: 50, isActive: true },
    { id:3, name: 'Pablo', age: 19, isActive: true },
    { id:4, name: 'Óscar', age: 16, isActive: false },
  ]);
}
