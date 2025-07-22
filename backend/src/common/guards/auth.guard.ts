import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly httpService: HttpService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const token = req.cookies?.token;

        if (!token) throw new UnauthorizedException('Token not found');

        const url = `${process.env.CORE_ADMIN_BASE_URL}/api/user/verify-employee`;

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Cookie: `token=${token}`,
                    },
                }),
            );

            if (response.status === 200) {
                (req as any).employee = response.data.data;
                return true;
            } else {
                throw new UnauthorizedException(response.data?.message || 'Unauthorized');
            }
        } catch (err) {
            throw new UnauthorizedException('Token invalid or auth server error');
        }
    }
}
