<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'date_time' => 'required|date',
            'duration' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'waitlist_capacity' => 'required|integer|min:0',
            'status' => 'required|in:live,draft', // 'live' or 'draft'
        ];
    }
}
