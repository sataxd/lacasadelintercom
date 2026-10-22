<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialSeeder extends Seeder
{
    public function run(): void
    {
        $socials = [
            [
                'id' => 'a071d169-8b98-496f-80c5-4eb9dbf4b16b',
                'name' => 'Casa del Intercomunicador',
                'link' => 'https://www.instagram.com/lacasadelintercom/',
                'description' => 'Instagram',
                'icon' => 'fab fa-instagram',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-03-16 22:06:47',
            ],
            [
                'id' => 'a071d169-8ce9-49e2-ad6b-e05b6a64b016',
                'name' => 'Casa del Intercomunicador',
                'link' => 'https://www.facebook.com/casadelintercomunicadorOficial/',
                'description' => 'Facebook',
                'icon' => 'fab fa-facebook-f',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-03-16 22:06:28',
            ],
            [
                'id' => 'a071d169-9018-4204-b66c-3d0cc1fb24e3',
                'name' => 'Casa del Intercomunicador',
                'link' => 'https://api.whatsapp.com/send?phone=+51922480484&text=%C2%A1Hola%21+Quisiera+mayor+informacion+sobre+los+productos.',
                'description' => 'WhatsApp',
                'icon' => 'fab fa-whatsapp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-03-16 22:07:01',
            ],
        ];

        foreach ($socials as $item) {
            DB::table('socials')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}