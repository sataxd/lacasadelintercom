<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonySeeder extends Seeder
{
    public function run(): void
    {
        $testimonies = [
            [
                'id' => 'a071d169-1783-43d7-901d-40874beed065',
                'name' => 'Línea Premiun',
                'correlative' => '',
                'description' => 'asdasdasdasd',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:10',
                'updated_at' => '2026-02-25 08:51:19',
            ],
            [
                'id' => 'a071d169-3e0d-4288-8c90-bddd89aa45f3',
                'name' => 'Línea Intercambiable',
                'correlative' => '',
                'description' => 'aaaaa',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:10',
                'updated_at' => '2026-02-25 08:51:27',
            ],
            [
                'id' => 'a128d2d4-a2b4-4d56-b47e-d919c1d77509',
                'name' => 'Línea Estándar',
                'correlative' => NULL,
                'description' => 'wwwwwwwwwww',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-24 21:04:39',
                'updated_at' => '2026-03-12 18:23:49',
            ],
        ];

        foreach ($testimonies as $item) {
            DB::table('testimonies')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}