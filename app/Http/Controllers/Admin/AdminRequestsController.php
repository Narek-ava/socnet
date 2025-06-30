<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRequestsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Requests/Index');
    }
}
