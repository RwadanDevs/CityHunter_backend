import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'routeNumbers',
    [
      // 1
      {
        routeNumber:215,
        stop_id:'9b4d6bcd-bbfd-2b2d-1b5d-ab3dfbbd9bed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        routeNumber:205,
        stop_id:'5b1deb2d-3b1d-4bad-9bdd-2b0d7b9dcb6d',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('routeNumbers', null, {});
}
