<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Support\Str;

class CreateAdminUser extends Command
{
    protected $name = 'make:admin'; // ← обязательно
    protected $description = 'Create or update an admin user';

    public function handle(): void
    {
        $email = $this->argument('email');
        $password = $this->argument('password') ?? 'password';

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Admin',
                'password' => bcrypt($password),
                'email_verified_at' => now()
                ]
        );

        $user->syncRoles([RoleEnum::ADMIN->value]);

        $this->info("✅ Admin user created or updated:");
        $this->line("Email: {$email}");
        $this->line("Password: {$password}");
    }

    public function getArguments(): array
    {
        return [
            ['email', \Symfony\Component\Console\Input\InputArgument::REQUIRED, 'Email of the admin user'],
            ['password', \Symfony\Component\Console\Input\InputArgument::OPTIONAL, 'Password for the admin user'],
        ];
    }
}
