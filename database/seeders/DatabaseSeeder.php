<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Asegurar directorios de almacenamiento de medios
        $mediaDirs = [
            'aboutus', 'ad', 'category', 'core_value',
            'instagram_post', 'item', 'item_zise', 'post',
            'services', 'slider', 'strength', 'utils'
        ];
        foreach ($mediaDirs as $dir) {
            $path = storage_path("app/images/{$dir}");
            if (!File::isDirectory($path)) {
                File::makeDirectory($path, 0755, true);
            }
        }

        // 2. Ejecutar seeders en orden de dependencia
        $this->call([
            RoleSeeder::class,
            UsersSeeder::class,
            CategorySeeder::class,
            SubcategorySeeder::class,
            CoreValueSeeder::class,
            ItemSeeder::class,
            ServicesSeeder::class,
            SliderSeeder::class,
            GeneralSeeder::class,
            AboutusSeeder::class,
            StrengthSeeder::class,
            IndicatorSeeder::class,
            SocialSeeder::class,
            FaqSeeder::class,
            TestimonySeeder::class,
            InstagramPostSeeder::class,
            CategoryPostSeeder::class,
            PostSeeder::class,
            TagSeeder::class,
            StatusSeeder::class,
            CouponSeeder::class,
        ]);
    }
}