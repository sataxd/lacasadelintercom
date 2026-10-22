<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryPostSeeder extends Seeder
{
    public function run(): void
    {
        $categoryPosts = [
            [
                'id' => 'a1ab6a57-6613-48b8-8b92-1e545c93ad39',
                'name' => 'Tecnología',
                'description' => NULL,
                'slug' => 'tecnologia',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-04-30 19:05:55',
                'updated_at' => '2026-04-30 19:05:55',
            ],
            [
                'id' => 'a1ab6aa4-74e1-46f9-adf8-14e3a5750a9c',
                'name' => 'Ciencia y Ambiente',
                'description' => NULL,
                'slug' => 'ciencia-y-ambiente',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-04-30 19:06:46',
                'updated_at' => '2026-04-30 19:06:46',
            ],
            [
                'id' => 'a1ab6aac-c372-40d1-919b-919da069427c',
                'name' => 'Social',
                'description' => NULL,
                'slug' => 'social',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-04-30 19:06:51',
                'updated_at' => '2026-04-30 19:06:51',
            ],
            [
                'id' => 'a1ab6ab7-1fb5-4348-a359-7671ad239433',
                'name' => 'Educación',
                'description' => NULL,
                'slug' => 'educacion',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-04-30 19:06:58',
                'updated_at' => '2026-04-30 19:06:58',
            ],
        ];

        foreach ($categoryPosts as $item) {
            DB::table('category_posts')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}