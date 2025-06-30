<?php

namespace App\Providers;

use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => fn () => [
                'user' => Auth::user(),
                'role' => Auth::user()?->loadMissing('roles')->roles->first()?->name,
                'is_admin' => Auth::user()?->hasRole(RoleEnum::ADMIN->value),
                'is_client' => Auth::user()?->hasRole(RoleEnum::CLIENT->value),
                'is_moder' => Auth::user()?->hasRole(RoleEnum::MODERATOR->value),
                'is_seller' => Auth::user()?->hasRole(RoleEnum::SELLER->value),
                'is_owner' => Auth::user()?->hasRole(RoleEnum::OWNER->value),
            ],
        ]);

        Vite::prefetch(concurrency: 3);
    }
}
