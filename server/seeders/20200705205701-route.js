import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'routes',
    [
      // 1
      {
        id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        PointA: 'Remera',
        PointB:'DownTown',
        status:'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //dormant bus route
      {
        id:'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        PointA: 'DownTown',
        PointB:'Gikondo',
        status:'Dormant',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //active bus route with no bus stops
      {
        id:'1b5d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        PointA: 'Remara',
        PointB:'Gikondo',
        status:'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('routes', null, {});
}
