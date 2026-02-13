<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Category::truncate();

        $categories = [
            ['id' => 'a10c346b-7f2b-49b2-9444-1e588a2f24ef', 'name' => 'Sistemas de Intercomunicadores'],
            ['id' => 'a10c346b-8201-4a0c-b917-95f72946d805', 'name' => 'Sistemas de Videporteros'],
            ['id' => 'a10c346b-8309-4751-aab8-dd206bcab5e4', 'name' => 'Sistemas de Alarma contra Incendios'],
            ['id' => 'a10c346b-8512-4238-9a5b-61690f40d5b2', 'name' => 'Sistemas de Alarma contra Robo'],
            ['id' => 'a10c346b-8605-4060-9ded-0e9094ff9721', 'name' => 'Intercomunicador Hospitalario'],
            ['id' => 'a10c346b-8fb4-4e7a-87a0-a8d897f17c29', 'name' => 'Sistemas de Cerco Eléctrico'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'id'   => $category['id'],
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}