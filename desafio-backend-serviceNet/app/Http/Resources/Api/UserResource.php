<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'birth_date' => $this->birth_date->format('Y-m-d'),
            'email' => $this->email,
            'registration' => $this->registration
        ];
    }
}
