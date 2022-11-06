<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\UsersResource;
use App\Models\Auth\User;

class UserController extends Controller
{

    private $users;


    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function index(Request $request)
    {
        $query = $this->users;

        if ($request->filled('name')) {
            $query = $query->where('name', 'LIKE', '%' . $request->name . '%');
        }

        $results = $query->paginate(10);

        return ($results->count() == 0) ?
            $this->notFoundResponse() :
            UsersResource::collection($results);
    }

    public function store(StoreUserRequest $request)
    {
        try {

            $request->merge([
                'password' => bcrypt($request->password),
                'registration' => $this->generateRegistration()
            ]);

            $this->users->create($request->all());

            return response()->json([
                'message' => 'Usuário criado com sucesso.'
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Falha ao adicionar Usuário'
            ], 500);
        }
    }

    public function update(UpdateUserRequest $request, int $id)
    {
        $result = $this->users->find($id);

        try {
            $request->merge(['password' => bcrypt($request->password)]);

            $result->fill($request->all());

            $result->save();

                return response()->json([
                    'message' => 'Usuário atualizado com sucesso.'
                ], 200);


        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Falha ao atualizar Usuário'
            ], 500);
        }
    }

    public function delete(int $id)
    {
        $result = $this->users->find($id);

        try {

            $result->delete();

            return response()->json([
                'message' => 'Usuário excluido com sucesso!'
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Falha ao excluir usuário'
            ], 500);

        }
    }

    public function generateRegistration()
    {
        do {
            $registration  = random_int(200000, 999999);

        } while (User::where("registration", $registration)->first());

        return $registration;
    }
}
