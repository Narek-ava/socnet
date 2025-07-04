<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('chat.{roomId}', function ($user, $roomId) {
    return ['id' => $user->id, 'name' => $user->name];
});
Broadcast::channel('online-users', function ($user) {
    return ['id' => $user->id, 'name' => $user->name];
});
Broadcast::channel('some-channel', function ($user) {
    return (bool) $user;
});
Broadcast::routes();
