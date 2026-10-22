<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IndicatorSeeder extends Seeder
{
    public function run(): void
    {
        $indicators = [
            [
                'id' => 'a1267ab1-96dd-404e-a1b9-c440c0fb14e0',
                'symbol' => '+',
                'name' => '12,587',
                'description' => 'Residencias y Asociaciones',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-23 17:06:32',
                'updated_at' => '2026-02-23 17:06:32',
            ],
            [
                'id' => 'a1267ab1-9ae8-4783-b2d1-e4ce82c99e47',
                'symbol' => '+',
                'name' => '5,620',
                'description' => 'Proyectos terminados',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-23 17:06:32',
                'updated_at' => '2026-02-23 17:06:32',
            ],
            [
                'id' => 'a1267ab1-9c3f-4df7-875e-86bfd0927d09',
                'symbol' => '+',
                'name' => '233',
                'description' => 'Constructoras partners',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-23 17:06:32',
                'updated_at' => '2026-02-23 17:06:32',
            ],
        ];

        foreach ($indicators as $item) {
            DB::table('indicators')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}