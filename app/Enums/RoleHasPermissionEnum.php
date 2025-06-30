<?php

namespace App\Enums;

class RoleHasPermissionEnum
{
    /**
     * Возвращает массив прав (PermissionEnum[]) для переданной роли (RoleEnum)
     *
     * @param RoleEnum $role
     * @return PermissionEnum[]
     */
    public static function permissionsFor(RoleEnum $role): array
    {
        return match ($role) {
            RoleEnum::ADMIN => PermissionEnum::cases(), // все права

            RoleEnum::CLIENT => [
                PermissionEnum::CREATE_TICKETS,
                PermissionEnum::VIEW_DASHBOARD,
            ],

            RoleEnum::MODERATOR => [
                PermissionEnum::VIEW_USERS,
                PermissionEnum::REPLY_TICKETS,
                PermissionEnum::CREATE_TICKETS,
            ],

            RoleEnum::SELLER => [
                PermissionEnum::VIEW_DASHBOARD,
            ],

            RoleEnum::OWNER => [
                PermissionEnum::VIEW_USERS,
                PermissionEnum::VIEW_DASHBOARD,
            ],

            default => [],
        };
    }

    /**
     * Возвращает все роли с их разрешениями в виде массива:
     * [
     *     'admin' => ['manage.users', 'view.users', ...],
     *     'client' => ['create.tickets', 'view.dashboard'],
     *     ...
     * ]
     *
     * @return array<string, string[]>
     */
    public static function all(): array
    {
        $result = [];

        foreach (RoleEnum::cases() as $role) {
            $permissions = self::permissionsFor($role);
            $result[$role->value] = array_map(fn(PermissionEnum $p) => $p->value, $permissions);
        }

        return $result;
    }
}
