import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'busses',
    [
      // 1
      {
        routeNumber:215,
        plateNumber:'RAC900B',
        origin:'GIKONDO',
        destination:'KIMIRONKO',
        company:'ROYAL',
        status:'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        routeNumber:205,
        plateNumber:'RAB500B',
        origin:'DOWNTOWN',
        destination:'GIKONDO',
        company:'ROYAL',
        status:'dormant',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('busses', null, {});
}
