<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\BaseFormRequest;

class StoreUserRequest extends BaseFormRequest
{
    protected $modelName = 'Usuário';
    protected $validationAction = 'criar';

    public function rules(): array
    {
        return [
            'name' => "required",
            'birth_date' => 'required',
            'email' => "required|email|unique:users,email"
        ];
    }
}
