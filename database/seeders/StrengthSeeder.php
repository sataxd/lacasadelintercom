<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StrengthSeeder extends Seeder
{
    public function run(): void
    {
        $strengths = [
            [
                'id' => 'a11e7e97-ccd9-4408-870a-2ddcea1a01aa',
                'name' => 'Minería',
                'description' => 'out',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d08f-4936-93cd-6e9644db4202',
                'name' => 'Fabricas',
                'description' => 'out',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d2ea-444d-bbe4-dc34f6d80416',
                'name' => 'Colegios',
                'description' => 'out',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d4fa-43ec-b555-ab24723719e9',
                'name' => 'Hoteles',
                'description' => 'out',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d62a-4b1a-9822-b044be4215cc',
                'name' => 'Residencias',
                'description' => 'out',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d73f-470f-a8df-9f92b9514673',
                'name' => 'Edificios',
                'description' => 'out',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d86c-424e-9e75-003f1675b83d',
                'name' => 'Gobierno',
                'description' => 'in',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-d99c-4b33-9b78-f154338583dc',
                'name' => 'Empresas',
                'description' => 'in',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-dadc-4f16-a5fd-aef745aa8650',
                'name' => 'Mercados',
                'description' => 'in',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
            [
                'id' => 'a11e7e97-dc4c-478b-9a92-35b72e33cf17',
                'name' => 'Oficinas',
                'description' => 'in',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-19 17:50:49',
                'updated_at' => '2026-02-19 17:50:49',
                'image' => NULL,
            ],
        ];

        foreach ($strengths as $item) {
            DB::table('strengths')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}