import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor() {}

    async getBoardById(id: number): Promise<Board> {
        const found = await Board.findOneBy({id});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log('found', found);

        return found;
    }

    async createBoarad(createBoardDto: CreateBoardDto, user: User): Promise<Board> {

        return await Board.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await Board.delete(id);
        
        console.log('result', result);
    } 

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await Board.save(board);

        return board;
    }

    async getAllBoard(): Promise<Board[]> {
        return Board.find();
    }
}
