import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Req,
    UnauthorizedException,
    StreamableFile,
    Res,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from 'services/user.service';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { CreateUserDto, UpdateUserDto, UserDto } from 'services/dto/user.dto';
import { User } from 'dataLayer/entities/user.entity';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'auth/common/tokenType';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { UserRequest } from 'common/request';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ControllerBase } from './controllerBase';
import { CookieHelper } from 'utils/cookieHelper';
import * as fs from 'fs';

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
    async findAllAsync(): Promise<UserDto[]> {
        const data = await this.userRepository.findAllAsync();
        return data.map((x) => ({
            userId: x._id.toString(),
            firstName: x.firstName,
            lastname: x.lastname,
            email: x.email,
            username: x.username,
        }));
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
    findByIdAsync(@Param('id') id): Promise<User> {
        return this.userRepository.findByIdAsync(id);
    }

    @Post()
    createAsync(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createAsync(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.userService.deleteAsync(id);
    }

    @Put(':id')
    updateAsync(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateAsync(id, updateUserDto);
    }
}
