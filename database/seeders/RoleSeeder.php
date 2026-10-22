<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::updateOrCreate(
            ['name' => 'Admin'],
            [
                'guard_name' => 'web',
                'relative_id' => 'a4fb411c-9d28-442f-8e37-d85354ab6da3'
            ]
        );

        $customer = Role::updateOrCreate(
            ['name' => 'Customer'],
            [
                'guard_name' => 'web',
                'relative_id' => '89dc59b7-8fb5-4440-a79c-cf625bfc9b67'
            ]
        );

        Permission::updateOrCreate(['name' => 'Admin'], ['guard_name' => 'web'])
            ->syncRoles([$admin]);
        Permission::updateOrCreate(['name' => 'Customer'], ['guard_name' => 'web'])
            ->syncRoles([$customer]);
    }
}