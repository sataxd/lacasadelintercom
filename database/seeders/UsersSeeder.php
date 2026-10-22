<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@casadelintercom.com'],
            [
                'name' => 'Usuario',
                'lastname' => 'Admin',
                'fullname' => 'Usuario Admin',
                'password' => Hash::make('r00tme'),
                'status' => 1,
            ]
        );
        $admin->syncRoles(['Admin']);
    }
}