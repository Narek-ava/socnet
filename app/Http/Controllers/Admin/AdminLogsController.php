<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLogsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Logs/Index');
    }
}
