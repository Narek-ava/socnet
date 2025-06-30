<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Stevebauman\Location\Facades\Location;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->session()->has('locale')) {
            $locale = $request->session()->get('locale');
        } else {
            // Автоопределение по IP
            $locale = $this->determineLocaleByGeo($request);
            $request->session()->put('locale', $locale);
        }

        app()->setLocale($locale);
        LaravelLocalization::setLocale($locale);
        Inertia::share([
            'translations' =>  Lang::get('static'),
        ]);
        return $next($request);
    }

    public function determineLocaleByGeo(Request $request): string
    {
        $ip = request()->ip();

        if ($ip === '172.18.0.1' || $ip === '127.0.0.1') {
            $ip = '146.70.52.62';
        }
        Log::info('Referer IP',[$ip]);
        try {
            $position = Location::get($ip);
            $country = $position?->countryCode ?? null;
		Log::info('Referer IP',[$ip,$country]);
        } catch (\Exception $e) {
            $country = null;
        }

        return match ($country) {
            'RU', 'AM', 'KZ', 'UA', 'BY' => 'ru',
            'CN', 'HK', 'TW' => 'zh',
            default => 'en',
        };
    }
}
