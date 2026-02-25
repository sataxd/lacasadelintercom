<?php

namespace Database\Seeders;

use App\Models\Strength;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StrengthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $strengths = [
            [
                'name' => 'Minería',
                'description' => 'out'
            ],
            [
                'name' => 'Fabricas',
                'description' => 'out'
            ],
            [
                'name' => 'Colegios',
                'description' => 'out'
            ],
            [
                'name' => 'Hoteles',
                'description' => 'out'
            ],
            [
                'name' => 'Residencias',
                'description' => 'out'
            ],
            [
                'name' => 'Edificios',
                'description' => 'out'
            ],
            [
                'name' => 'Gobierno',
                'description' => 'in'
            ],
            [
                'name' => 'Empresas',
                'description' => 'in'
            ],
            [
                'name' => 'Mercados',
                'description' => 'in'
            ],
            [
                'name' => 'Oficinas',
                'description' => 'in'
            ]
        ];

        foreach ($strengths as $strength) {
            Strength::updateOrCreate([
                'name' => $strength['name']
            ], [
                'description' => $strength['description']
            ]);
        }
    }
}
