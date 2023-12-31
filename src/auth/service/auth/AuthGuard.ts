import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate  {

    constructor(private jwtService : JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try{
            const request = context.switchToHttp().getRequest();

            const token = this.extractheaderInfo(request);
            console.log(token)

            if (!token) {
                throw new UnauthorizedException('Token not present');
            }

            const payload = await this.jwtService.verifyAsync(
                token,
                {
                secret: 'secret'
                });

                request['user'] = payload;

                return true;

            }catch(e){
                throw new UnauthorizedException(e);
            }
    }


    private extractheaderInfo(request : Request): string | undefined{
        console.log(request.headers.authorization)
        const [type , token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;

    }

}