<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\BaseFormRequest;

class UpdateUserRequest extends BaseFormRequest
{
    protected $modelName = 'Usuário';
    protected $validationAction = 'atualizar';

    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'birth_date' => 'required|date_format:d/m/Y',
            'email' => "required|email|unique:users,email,{$this->id}",
        ];
    }
}
