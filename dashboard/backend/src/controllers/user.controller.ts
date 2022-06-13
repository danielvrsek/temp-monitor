import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from '@nestjs/common';
import * as fs from 'fs';
import { UserService } from 'services/user.service';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { User } from 'dataLayer/entities/user.entity';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { UserRequest } from 'common/request';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ControllerBase } from './controllerBase';
import { CookieHelper } from 'utils/cookieHelper';
import { TokenType } from 'shared/src/authorization';
import { CreateUserDto, UserViewModel } from 'shared/src/dto';
import { UserMapper } from '../mappers/user.mapper';

@Controller('users')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class UserController extends ControllerBase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userService: UserService,
        cookieHelper: CookieHelper
    ) {
        super(cookieHelper, null, userRepository);
    }

    @Get()
    async findAllAsync(): Promise<UserViewModel[]> {
        const data = await this.userRepository.findAllAsync();
        return data.map(UserMapper.mapToViewModel);
    }

    @Get('profile-photo/:filename')
    getProfilePhotoFromFilename(@Param('filename') filename: string, @Res() res) {
        const path = join(process.cwd(), 'public/profile-photos/', filename);
        if (!fs.existsSync(path)) {
            res.status(404);
            res.end();
            return;
        }

        res.set({
            'Content-Type': 'image/jpeg',
        });

        const file = createReadStream(path);
        file.pipe(res);
    }

    @Get('profile')
    getProfile(@Req() request: UserRequest<void>) {
        return request.user;
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id): Promise<UserViewModel> {
        const user = await this.userRepository.findByIdAsync(id);
        return UserMapper.mapToViewModel(user);
    }

    @Post()
    async createAsync(@Body() createUserDto: CreateUserDto): Promise<UserViewModel> {
        const user = await this.userService.createAsync(createUserDto);
        return UserMapper.mapToViewModel(user);
    }
}
