<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Event extends Model
{


    protected $table = 'events';

    protected $fillable = [
        'name',
        'date_time',
        'duration',
        'location',
        'capacity',
        'waitlist_capacity',
        'status', // live/draft
        'user_id',
    ];

    protected $casts = [
        'status' => Status::class,
        'date_time' => 'datetime',
    ];

    /**
     * Get the organizer that owns the Event
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The attendees that belong to the Event
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function attendees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
}
