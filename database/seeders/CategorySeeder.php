<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $storageDir = storage_path('app/images/category');
        if (!File::isDirectory($storageDir)) {
            File::makeDirectory($storageDir, 0755, true);
        }

        // Mapeo de respaldo para imágenes de categorías si faltaran en storage
        $backups = [
            '8125f8f0-9621-4160-88ea-ba32fbe97b55.webp' => 'cat_intercomunicador.webp',
            '678d42fb-fbcc-415f-b6c0-437267af8853.webp' => 'cat_videoporteros.webp',
            'c2c77ea1-fa8d-4386-906f-431d8bdd7179.webp' => 'cat_incendio.webp',
            '3b1a94c4-36ec-4a16-919a-2a5adddf8065.webp' => 'cat_alarmacontrarobo.webp',
            'f6e69af4-f9d2-40f5-8b1b-a93652abb4d8.webp' => 'cat_hospitalario.webp',
            '690ffcae-a8e3-452e-8a06-4240875268f8.webp' => 'cat_cercoelectrico.webp',
        ];
        foreach ($backups as $targetFile => $srcFile) {
            $tPath = $storageDir . '/' . $targetFile;
            $sPath = public_path('assets/img/' . $srcFile);
            if (!File::exists($tPath) && File::exists($sPath)) {
                File::copy($sPath, $tPath);
            }
        }

        $categories = [
            [
                'id' => 'a10c346b-7f2b-49b2-9444-1e588a2f24ef',
                'name' => 'Sistemas de Intercomunicadores',
                'description' => NULL,
                'slug' => 'intercomunicadores',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 17:12:55',
                'updated_at' => '2026-02-27 10:47:43',
                'image' => '8125f8f0-9621-4160-88ea-ba32fbe97b55.webp',
            ],
            [
                'id' => 'a10c346b-8201-4a0c-b917-95f72946d805',
                'name' => 'Sistemas de Videporteros',
                'description' => NULL,
                'slug' => 'videoporteros',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 17:12:55',
                'updated_at' => '2026-02-27 10:47:57',
                'image' => '678d42fb-fbcc-415f-b6c0-437267af8853.webp',
            ],
            [
                'id' => 'a10c346b-8309-4751-aab8-dd206bcab5e4',
                'name' => 'Sistemas de Alarma contra Incendios',
                'description' => NULL,
                'slug' => 'alarma-contra-incendios',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 17:12:55',
                'updated_at' => '2026-02-27 10:48:21',
                'image' => 'c2c77ea1-fa8d-4386-906f-431d8bdd7179.webp',
            ],
            [
                'id' => 'a10c346b-8512-4238-9a5b-61690f40d5b2',
                'name' => 'Sistemas de Alarma contra Robo',
                'description' => NULL,
                'slug' => 'sistema-de-alarma-contra-robo',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 17:12:55',
                'updated_at' => '2026-02-27 10:48:32',
                'image' => '3b1a94c4-36ec-4a16-919a-2a5adddf8065.webp',
            ],
            [
                'id' => 'a10c346b-8605-4060-9ded-0e9094ff9721',
                'name' => 'Intercomunicador Hospitalario',
                'description' => NULL,
                'slug' => 'intercomunicador-hospitalario',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 17:12:55',
                'updated_at' => '2026-02-27 10:48:42',
                'image' => 'f6e69af4-f9d2-40f5-8b1b-a93652abb4d8.webp',
            ],
            [
                'id' => 'a10c346b-8fb4-4e7a-87a0-a8d897f17c29',
                'name' => 'Sistemas de Cerco Eléctrico',
                'description' => NULL,
                'slug' => 'sistema-de-cerco-electrico',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 17:12:55',
                'updated_at' => '2026-02-27 10:48:54',
                'image' => '690ffcae-a8e3-452e-8a06-4240875268f8.webp',
            ],
        ];

        foreach ($categories as $item) {
            DB::table('categories')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}