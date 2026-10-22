<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SliderSeeder extends Seeder
{
    public function run(): void
    {
        $storageDir = storage_path('app/images/slider');
        if (!File::isDirectory($storageDir)) {
            File::makeDirectory($storageDir, 0755, true);
        }

        // Recuperar video del slider si no existe en storage
        $videoTarget = $storageDir . '/e3e2bff8-0a38-403d-97a0-8df23682f270.mp4';
        $videoSource = public_path('assets/img/videologin.mp4');
        if (!File::exists($videoTarget) && File::exists($videoSource)) {
            File::copy($videoSource, $videoTarget);
        }

        $sliders = [
            [
                'id' => 'a12dfe3a-482a-44fd-bbfe-2d4b80b7e71c',
                'name' => 'Seguridad Electrónica',
                'description' => 'En La Casa del Intercomunicador cada producto, cada acto, de atención y servicio obedece a un criterio de perfección, compartido por más de 28 años, comprometiendo el verdadero significado de servicio al cliente.',
                'image' => '3ac9548b-cf1a-4245-b573-9b95cdc27fe1.webp',
                'video' => 'e3e2bff8-0a38-403d-97a0-8df23682f270.mp4',
                'button_text' => 'Ver productos',
                'button_link' => '/intercomunicadores',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 10:45:08',
                'updated_at' => '2026-03-11 15:03:31',
                'esimagen' => 0,
            ],
        ];

        foreach ($sliders as $item) {
            DB::table('sliders')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}