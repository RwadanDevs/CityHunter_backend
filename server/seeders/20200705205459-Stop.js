 import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'stops',
    [
      // 1
      {
        id:'5b1deb2d-3b1d-4bad-9bdd-2b0d7b9dcb6d',
        name: 'Merez-1',
        longitude: -9.6984733,
        latitude: 20.980645,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:'9b4d6bcd-bbfd-2b2d-1b5d-ab3dfbbd9bed',
        name: 'RWANDEX',
        longitude: -5.6982033,
        latitude: 10.980704,
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
