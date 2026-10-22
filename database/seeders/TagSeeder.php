<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            [
                'id' => 'a1655538-f7de-4a88-a9d7-eb4b606862d5',
                'name' => 'Tecnología',
                'description' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-03-26 22:58:55',
                'updated_at' => '2026-04-08 18:48:39',
            ],
            [
                'id' => 'a1ab6adf-0356-4125-9317-1d351667afd1',
                'name' => '',
                'description' => NULL,
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-04-30 19:07:24',
                'updated_at' => '2026-04-30 19:07:24',
            ],
        ];

        foreach ($tags as $item) {
            DB::table('tags')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}