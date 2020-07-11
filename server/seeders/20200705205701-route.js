import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'routes',
    [
      // 1
      {
        id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        PointA: 'GIKONDO',
        PointB:'DOWNTOWN',
        routeNumber:205,
        status:'active',
        company:'ROYAL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //dormant bus route
      {
        id:'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        PointA: 'KIMIRONKO',
        PointB:'GIKONDO',
        routeNumber:215,
        status:'Dormant',
        company:'ROYAL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //active bus route with no bus stops
      {
        id:'1b5d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        PointA: 'REMERA',
        PointB:'GIKONDO',
        status:'active',
        routeNumber:109,
        company:'KBS',
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
