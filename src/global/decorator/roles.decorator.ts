import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const Role_Str = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(Role_Str, roles);
