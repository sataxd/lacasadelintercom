<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteStatistic;
use Illuminate\Support\Carbon;

class WebsiteStatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Poblar con 30 días de visitas aleatorias
        for ($i = 0; $i < 30; $i++) {
            WebsiteStatistic::create([
                'visits' => rand(50, 500),
                'date' => Carbon::now()->subDays($i)->toDateString(),
                // Agrega aquí otros campos si existen, por ejemplo:
                // 'user_id' => 1,
                // 'page' => 'home',
            ]);
        }
    }
}
