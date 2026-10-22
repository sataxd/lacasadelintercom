<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CoreValueSeeder extends Seeder
{
    public function run(): void
    {
        $storageDir = storage_path('app/images/core_value');
        if (!File::isDirectory($storageDir)) {
            File::makeDirectory($storageDir, 0755, true);
        }

        $coreValues = [
            [
                'id' => 'a11cd47d-a193-45d8-90f4-5fe906100004',
                'name' => 'Bosh',
                'description' => NULL,
                'image' => '163e8044-0115-4d83-b819-491e3d14d040.jpg',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 21:59:21',
                'updated_at' => '2026-03-17 14:55:31',
            ],
            [
                'id' => 'a11cd705-e092-4365-8db1-7b4d32389241',
                'name' => 'Mircom',
                'description' => NULL,
                'image' => '24b3d4f5-4649-4294-88fd-f52eab187dec.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:06:26',
                'updated_at' => '2026-02-18 22:06:26',
            ],
            [
                'id' => 'a11cd722-37fd-4d74-b9a8-73399104bcd3',
                'name' => 'Honeywell',
                'description' => NULL,
                'image' => 'f16e7490-fb0a-4945-9689-b1f74978f699.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:06:45',
                'updated_at' => '2026-02-18 22:06:45',
            ],
            [
                'id' => 'a11cd734-7260-4162-b957-47880044dee5',
                'name' => 'Dsc',
                'description' => NULL,
                'image' => '1758ce9b-3a39-42b5-9494-d7f7f6807bc3.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:06:56',
                'updated_at' => '2026-02-18 22:06:56',
            ],
            [
                'id' => 'a11cd740-05c8-4de8-a1ba-18504c8d739e',
                'name' => 'Belcom',
                'description' => NULL,
                'image' => '03f1c83b-a246-43dc-ae46-579ac97c2819.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:07:04',
                'updated_at' => '2026-02-18 22:07:04',
            ],
            [
                'id' => 'a11cd74f-6d10-4c02-aa6d-db3482f930fa',
                'name' => 'Linseng',
                'description' => NULL,
                'image' => 'bb5712c8-7ae4-43bd-b74d-edd77cf30bf1.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:07:14',
                'updated_at' => '2026-02-18 22:07:14',
            ],
            [
                'id' => 'a11cd75f-045f-4b3f-9f64-1ff4d7f34e3a',
                'name' => 'Hagroy',
                'description' => NULL,
                'image' => '38b3225a-c992-44bf-9844-6ede6299b1c3.jpg',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:07:24',
                'updated_at' => '2026-02-18 22:07:24',
            ],
            [
                'id' => 'a11cd76b-7672-44b1-9a21-be50644b73ce',
                'name' => 'Paradox',
                'description' => NULL,
                'image' => '0062ad1f-af95-4876-bc16-8c3ea0081e2f.jpg',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:07:33',
                'updated_at' => '2026-02-18 22:07:33',
            ],
            [
                'id' => 'a11cd77c-2976-4664-af12-17168b9c5873',
                'name' => 'Commax',
                'description' => NULL,
                'image' => 'efb17d8c-135a-4b52-ad30-efd6b379e476.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:07:43',
                'updated_at' => '2026-02-18 22:07:43',
            ],
            [
                'id' => 'a11cd78a-ba50-4051-a270-084748a84404',
                'name' => 'Itower',
                'description' => NULL,
                'image' => '1709544b-4efa-44e7-b6aa-3c8ec289a046.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:07:53',
                'updated_at' => '2026-02-25 07:28:22',
            ],
            [
                'id' => 'a11cd799-0543-40a1-ae02-bf804525604b',
                'name' => 'Bticino',
                'description' => NULL,
                'image' => '5b7ea541-7978-4631-ae6f-1f542a1be60c.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-18 22:08:02',
                'updated_at' => '2026-02-18 22:08:02',
            ],
        ];

        foreach ($coreValues as $item) {
            DB::table('core_values')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}