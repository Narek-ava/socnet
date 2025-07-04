<?php

namespace App\Http\Controllers;

use App\Events\UserOnline;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->paginate(10);
        $users->getCollection()->transform(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'role' => $user->roles->first()?->name,
            ];
        });

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

}
