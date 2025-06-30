<?php

namespace App\Http\Middleware;

use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'role' => $request->user() ? $request->user()->roles->first()?->name : null,
                'is_admin' => Auth::user()?->hasRole(RoleEnum::ADMIN->value),
                'is_client' => Auth::user()?->hasRole(RoleEnum::CLIENT->value),
                'is_moder' => Auth::user()?->hasRole(RoleEnum::MODERATOR->value),
                'is_seller' => Auth::user()?->hasRole(RoleEnum::SELLER->value),
                'is_owner' => Auth::user()?->hasRole(RoleEnum::OWNER->value),
            ],
        ];
    }
}
