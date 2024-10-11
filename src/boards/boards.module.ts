import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
