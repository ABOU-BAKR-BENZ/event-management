<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'title' => $this->name,
            'start' => $this->date_time instanceof \DateTime ? $this->date_time->format('Y-m-d H:i') : date('Y-m-d H:i', $this->date_time),
            'end' => $this->date_time instanceof \DateTime
                ? (clone $this->date_time)->modify("+{$this->duration} minutes")->format('Y-m-d H:i')
                : date('Y-m-d H:i', strtotime($this->date_time) + ($this->duration * 60)),

            'duration' => $this->duration,
            'location' => $this->location,
            'capacity' => $this->capacity,
            'waitlist_capacity' => $this->waitlist_capacity,
            'status' => $this->status,
            'is_joined' => $request->user() ? $this->attendees()->where('user_id', $request->user()->id)->exists() : false,
        ];
    }
}
