<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        $coupons = [
            [
                'id' => '3731a0e9-921f-4b25-8bdb-f887cba960e5',
                'name' => '1ER_VUA',
                'description' => 'Cupón de descuento para la primera compra',
                'type' => 'percentage',
                'amount' => '10.00',
                'sale_amount' => '0.00',
                'initial_stock' => NULL,
                'stock' => NULL,
                'date_begin' => NULL,
                'date_end' => NULL,
                'one_time_use' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2025-11-25 21:44:12',
            ],
        ];

        foreach ($coupons as $item) {
            DB::table('coupons')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}