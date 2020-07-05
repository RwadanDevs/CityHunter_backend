import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'stops',
    [
      // 1
      {
        id:'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd5bed',
        name: 'Remera_DownTown',
        route_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        longitude: -9.6984733,
        latitude: -20.980645,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b9dcb6d',
        name: 'Gikondo_DownTown',
        route_id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        longitude: -9.6984733,
        latitude: -20.980645,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('stops', null, {});
}
