<?php

namespace App\Http\Middleware;

use App\Models\Event;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class EventRegistrationChecking
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $eventId = $request->route('id');
        $event = Event::findOrFail($eventId);

        if ($user->hasRole('admin')) {
            return response()->json(['error' => "You can't join an event as an admin!"], 400);
        }

        $overlappingEvent = $user->events()
            ->whereDate('date_time', $event->date_time->toDateString()) // Same day
            ->where(function ($query) use ($event) {
                $query->whereBetween('date_time', [$event->date_time, $event->date_time->copy()->addMinutes($event->duration)])
                    ->orWhereBetween(DB::raw("DATE_ADD(date_time, INTERVAL duration MINUTE)"), [$event->date_time, $event->date_time->copy()->addMinutes($event->duration)]);
            })
            ->exists();

        if ($overlappingEvent) {
            return response()->json(['error' => 'You are already attending an event that overlaps with this one.'], 400);
        }

        if ($event->attendees()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'You are already attending this event!'], 400);
        }

        if ($event->attendees()->count() >= $event->capacity) {
            return response()->json(['error' => 'Event is full!'], 400);
        }
        return $next($request);
    }
}
