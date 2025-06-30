<?php

namespace App\Console\Commands;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Enums\RoleHasPermissionEnum;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SyncRolesAndPermissions extends Command
{
    protected $signature = 'sync:roles-permissions';
    protected $description = 'Sync roles and permissions based on enums';

    public function handle()
    {
        $this->info('Syncing permissions...');

        // Создаём или обновляем все права из PermissionEnum
        foreach (PermissionEnum::cases() as $permissionEnum) {
            Permission::firstOrCreate(['name' => $permissionEnum->value]);
        }

        $this->info('Syncing roles and assigning permissions...');

        // Создаём или обновляем роли и их права
        foreach (RoleEnum::cases() as $roleEnum) {
            $role = Role::firstOrCreate(['name' => $roleEnum->value]);

            // Получаем список PermissionEnum для роли из RoleHasPermissionEnum
            $permissions = RoleHasPermissionEnum::permissionsFor($roleEnum);

            // Массив названий прав для передачи в syncPermissions()
            $permissionNames = array_map(fn($permEnum) => $permEnum->value, $permissions);

            // Обновляем права у роли (удаляет лишние и добавляет нужные)
            $role->syncPermissions($permissionNames);

            $this->info("Synced role '{$roleEnum->value}' with permissions: " . implode(', ', $permissionNames));
        }

        // Удаляем роли и права, которых нет в enum (опционально)
        Permission::whereNotIn('name', array_map(fn($p) => $p->value, PermissionEnum::cases()))->delete();
        Role::whereNotIn('name', array_map(fn($r) => $r->value, RoleEnum::cases()))->delete();

        $this->info('✅ Roles and permissions synced successfully.');
    }
}
