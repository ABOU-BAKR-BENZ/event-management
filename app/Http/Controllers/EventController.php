<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Mail\EventRegistrationMail;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class EventController extends BaseController
{


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $request->validate([
            'search' => 'sometimes|string',
            'order_by' => 'sometimes|string|in:id,status,title_en,title_ar,created_at,updated_at',
            'order_direction' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
            'page' => 'sometimes|integer|min:1',
        ]);

        $search = $request->query('search', null);
        $query = Event::query();

        if (Auth::user()->hasRole('user')) {
            $query->where('status', 'live');
        }

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        // Apply sorting if provided
        $sortBy = $request->query('order_by', 'created_at');
        $sortDirection = $request->query('order_direction', 'desc');

        $query->orderBy($sortBy, $sortDirection);

        // Get the pagination parameters
        $perPage = $request->query('per_page', 15);
        $page = $request->query('page', 1);

        // Paginate the results
        $events = $query->paginate($perPage, ['*'], 'page', $page);

        $responseData = [
            'events' => EventResource::collection($events),
            'pagination' => [
                'current_page' => $events->currentPage(),
                'total' => $events->total(),
                'per_page' => $events->perPage(),
                'last_page' => $events->lastPage(),
                'first_item' => $events->firstItem(),
                'last_item' => $events->lastItem(),
                'has_more_pages' => $events->hasMorePages(),
                'prev_page_url' => $events->previousPageUrl(),
                'next_page_url' => $events->nextPageUrl(),
                'on_first_page' => $events->onFirstPage(),
            ],
        ];

        return $this->sendResponse($responseData, 'Events retrieved successfully!');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id(); // Assign event creator

        $event = Event::create($data);

        return $this->sendResponse(new EventResource($event), 'Event created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return $this->sendResponse(new EventResource($event), 'Event retrieved successfully!');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $data = $request->validated();
        // Ensure only the creator can edit
        if ($event->user_id !== Auth::id()) {
            return $this->sendError('Unauthorized', 403);
        }
        $event->update($data);

        return $this->sendResponse(new EventResource($event), 'Event updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return $this->sendResponse(new EventResource($event), 'Event deleted Successfully!');
    }

    /**
     * Get attendees of an event.
     */
    public function attendees($id)
    {
        $event = Event::findOrFail($id);
        return $this->sendResponse($event->attendees, 'Attendees retrieved Successfully!');
    }

    /**
     * Allow a user to join an event.
     */
    public function join($id)
    {
        $event = Event::findOrFail($id);
        $user = Auth::user();

        // Attach user to event
        $event->attendees()->attach($user->id);

        $formData = [
            'sender_email' => config('mail.from.address'),
            'sender_full_name' => 'Event Organizer',
            'email_subject' => 'Event Registration Confirmation',
            'event_name' => $event->name,
            'event_date' => $event->date_time->format('Y-m-d H:i'),
            'event_duration' => $event->duration,
            'user_name' => $user->name,
        ];

        // Send email
        Mail::to($user->email)->send(new EventRegistrationMail($formData));

        return $this->sendResponse(new EventResource($event), 'You have successfully joined the event!');
    }

    /**
     * Change event status (Live/Draft).
     */
    public function changeStatus($id, Request $request)
    {
        $event = Event::findOrFail($id);

        // Ensure only the creator can change status
        if ($event->user_id !== Auth::id()) {
            return $this->sendError('Unauthorized!',  403);
        }

        $event->update(['status' => $request->status]);
        return $this->sendResponse(new EventResource($event), 'Event status updated successfully!!');
    }
}
