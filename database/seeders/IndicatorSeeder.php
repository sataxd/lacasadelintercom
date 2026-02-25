<?php

namespace Database\Seeders;

use App\Models\Indicator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndicatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $indicators = [
            ['symbol' => '+', 'name' => '12,587', 'description' => 'Residencias y Asociaciones'],
            ['symbol' => '+', 'name' => '5,620', 'description' => 'Proyectos terminados'],
            ['symbol' => '+', 'name' => '233', 'description' => 'Constructoras partners'],
        ];

        Indicator::where('status', true)->delete();
        
        foreach ($indicators as $indicator) {
            Indicator::create($indicator);
        }
    }
}
