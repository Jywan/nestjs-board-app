import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0000',
    database: 'board-app',
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    entities: ['dist/**/*.entity.{js,ts}'],
    synchronize: true
}