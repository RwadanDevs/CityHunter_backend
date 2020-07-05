import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'users',
    [
      // 1
      {
        firstname: 'Kabundege',
        lastname: 'Christophe',
        email: process.env.Super_Admin_Email,
        role: 'Super Administrator',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2
      {
        firstname: 'NDOLI',
        lastname: 'Jack',
        email: process.env.Manager_Email,
        isVerified: true,
        role:'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {});
}
