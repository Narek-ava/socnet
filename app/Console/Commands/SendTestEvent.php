<?php

namespace App\Console\Commands;

use App\Events\SomeTestEvent;
use App\Events\SomeTestPrivateEvent;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Broadcast;

class SendTestEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-test-event';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        event(new SomeTestEvent());
        event(new SomeTestPrivateEvent());
        $this->info('Event sent!');
    }
}
