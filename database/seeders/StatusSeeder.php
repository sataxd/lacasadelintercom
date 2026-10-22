<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            [
                'id' => '312f9a91-d3f2-4672-a6bf-678967616cac',
                'name' => 'Procesando',
                'description' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2025-11-25 21:44:12',
                'color' => '#2BA824',
                'reversible' => 1,
                'editable' => 0,
            ],
            [
                'id' => 'bc012ef5-96e8-4bbb-867b-061c4090d9d2',
                'name' => 'Concluido',
                'description' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2025-11-25 21:44:12',
                'color' => '#108CC4',
                'reversible' => 0,
                'editable' => 1,
            ],
            [
                'id' => 'c063efb2-1e9b-4a43-8991-b444c14d30dd',
                'name' => 'Cancelado',
                'description' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2025-11-25 21:44:12',
                'color' => '#323a46',
                'reversible' => 0,
                'editable' => 1,
            ],
            [
                'id' => 'f13fa605-72dd-4729-beaa-ee14c9bbc47b',
                'name' => 'Pendiente',
                'description' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2025-11-25 21:44:12',
                'color' => '#6c757d',
                'reversible' => 1,
                'editable' => 0,
            ],
        ];

        foreach ($statuses as $item) {
            DB::table('statuses')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}