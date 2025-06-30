<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SomeTestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    /**
     * Create a new event instance.
     */
    public function __construct()
    {
    }

    // Канал для вещания
    public function broadcastOn()
    {
        Log::info('Broadcasted SomeTestEvent');

        return new Channel('some-channel');
    }

    public function broadcastAs()
    {
        return 'SomeTestEvent';
    }
    public function broadcastWith()
    {
        return ['data' => 'Testing websocket'];
    }
}
