<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->put('user/{user}/online', 'UserOnlineController');
