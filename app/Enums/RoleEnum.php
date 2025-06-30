<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case CLIENT = 'client';
    case MODERATOR = 'moderator';
    case SELLER = 'seller';
    case OWNER = 'owner';
}
