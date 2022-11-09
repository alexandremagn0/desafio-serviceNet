<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Auth\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Alexandre Magno',
            'birth_date' => '2022-11-04',
            'registration' => '123456',
            'email' => 'alexandre@email.com.br',
            'password' => bcrypt('senha123')
        ]);
    }
}
