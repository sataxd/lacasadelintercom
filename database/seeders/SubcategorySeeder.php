<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubcategorySeeder extends Seeder
{
    public function run(): void
    {
        $subcategories = [
            [
                'id' => 'a1292707-a827-4e18-a770-b46deb86ef18',
                'category_id' => 'a10c346b-7f2b-49b2-9444-1e588a2f24ef',
                'name' => 'Edificios Grandes',
                'slug' => 'edificios-grandes',
                'description' => 'eeeeeeeeeeee',
                'image' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-25 01:00:05',
                'updated_at' => '2026-02-25 09:00:40',
            ],
            [
                'id' => 'a1296d24-01e6-48e9-bf76-49f8ad22f92a',
                'category_id' => 'a10c346b-7f2b-49b2-9444-1e588a2f24ef',
                'name' => 'Edificios Medianos y Pequeños',
                'slug' => 'edificios-medianos-y-pequenos',
                'description' => 'aaaaaaaaaaaaaa',
                'image' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-25 04:16:08',
                'updated_at' => '2026-02-25 09:00:44',
            ],
            [
                'id' => 'a1296d3e-efa6-404c-9c89-5405c20dc9b0',
                'category_id' => 'a10c346b-8201-4a0c-b917-95f72946d805',
                'name' => 'Residenciales',
                'slug' => 'residenciales',
                'description' => NULL,
                'image' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-25 04:16:25',
                'updated_at' => '2026-02-25 08:18:16',
            ],
            [
                'id' => 'a148ffc7-8727-4d0e-81b1-2ef9ac3ff5c9',
                'category_id' => 'a10c346b-7f2b-49b2-9444-1e588a2f24ef',
                'name' => 'Edificios Grandes y Medianos',
                'slug' => 'edificios-grandes-y-medianos',
                'description' => NULL,
                'image' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-03-12 20:56:49',
                'updated_at' => '2026-03-12 20:56:49',
            ],
        ];

        foreach ($subcategories as $item) {
            DB::table('subcategories')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}