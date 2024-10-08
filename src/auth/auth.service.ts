import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            ...authCredentialsDto,
            password: hashedPassword,
        });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
       
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });
        
        if(user && (await bcrypt.compare(password, user.password))) {
            // create User token( Secret + Payload )
            const payload = { username }
            const accessToken = await this.jwtService.sign(payload);
            
            return { accessToken };
        } else {
            throw new UnauthorizedException('logIn failed')
        }
    
    }
     
}
