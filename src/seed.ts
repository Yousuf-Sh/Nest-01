import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { UserRole } from './users/enums/user-role.enum';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: false,
});

AppDataSource.initialize().then(async () => {
  const userRepo = AppDataSource.getRepository(User);

  await userRepo.clear(); // Wipes the table

  await userRepo.save([
    {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "role": UserRole.USER,
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "role": UserRole.ADMIN,
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "role": UserRole.USER,
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "email": "Julianne.OConner@kory.org",
        "role": UserRole.USER,
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "email": "Lucio_Hettinger@annie.ca",
        "role": UserRole.STAFF,
    }
  ]);

  console.log('✅ Seeded users');
  process.exit(0);
});
