<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case MANAGE_USERS = 'manage.users';
    case VIEW_USERS = 'view.users';
    case CREATE_TICKETS = 'create.tickets';
    case REPLY_TICKETS = 'reply.tickets';
    case VIEW_DASHBOARD = 'view.dashboard';
}
