<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'id' => 'a071d16b-16e9-4f24-9f72-03f79edb875f',
                'name' => '¿Qué sucede si se corta la luz y tengo una alarma o cerco eléctrico?',
                'description' => 'Los sistemas de alarmas y cercos eléctricos incluyen una batería de respaldo auto-recargable. Esto garantiza que el equipo siga funcionando con total normalidad durante varias horas ante un corte de energía, manteniendo su propiedad protegida en todo momento.',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2026-03-17 15:29:22',
            ],
            [
                'id' => 'a071d16b-1805-4c14-aa38-508ba7cffca5',
                'name' => '¿Puedo controlar mi sistema de seguridad desde mi celular?',
                'description' => 'Sí. Instalamos sistemas inteligentes que se vinculan a una aplicación móvil. Desde su smartphone podrá armar o desarmar la alarma, recibir notificaciones en tiempo real si se activa un sensor, y en el caso de videoporteros, contestar y abrir la puerta incluso si no se encuentra en casa.',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2026-03-17 15:29:09',
            ],
            [
                'id' => 'a071d16b-1a84-4bd6-89ea-722630ef233a',
                'name' => '¿Es muy difícil usar un intercomunicador iTower o un sistema de alarma?',
                'description' => 'Para nada. Priorizamos equipos con interfaces intuitivas y modernas. Los monitores iTower cuentan con botones claros y pantallas táctiles fáciles de manejar. Además, tras cada instalación, nuestro equipo técnico le brindará una capacitación rápida para que usted y su familia dominen el sistema en pocos minutos.',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2026-03-17 15:29:50',
            ],
            [
                'id' => 'a071d16b-1c67-40df-b867-bdcaaea73feb',
                'name' => '¿Realizan instalaciones en casas ya construidas o solo en proyectos nuevos?',
                'description' => 'Realizamos instalaciones en ambos casos. Contamos con tecnología inalámbrica para alarmas y sensores que evita el cableado invasivo en casas terminadas, y soluciones cableadas estéticas para proyectos en construcción o remodelación, adaptándonos siempre a la arquitectura de su hogar.',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2026-03-17 15:30:12',
            ],
            [
                'id' => 'a071d16b-1d6e-4708-829b-b03662025081',
                'name' => '¿Qué garantía ofrecen sus servicios de instalación y los equipos?',
                'description' => 'Todos nuestros equipos cuentan con garantía de fábrica (generalmente de 1 a 2 años según la marca). Adicionalmente, ofrecemos una garantía técnica por la instalación, asegurando que el cableado y la configuración funcionen perfectamente. Si surge cualquier inconveniente técnico derivado del montaje, nuestro equipo lo resolverá sin costo adicional dentro del periodo de garantía.',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2026-03-17 15:31:58',
            ],
            [
                'id' => 'a071d16b-1e6f-4cb6-a540-ae630fb9951a',
                'name' => '¿Cuentan con stock de repuestos para equipos antiguos o descontinuados?',
                'description' => 'Mantenemos un inventario constante de accesorios y repuestos críticos (baterías, fuentes de poder, aisladores, botones). En caso de que un equipo sea muy antiguo y esté descontinuado, le ofrecemos opciones de modernización o cambio de equipos compatibles para que no tenga que reemplazar todo el sistema desde cero.',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2025-11-25 21:44:12',
                'updated_at' => '2026-03-17 15:32:35',
            ],
        ];

        foreach ($faqs as $item) {
            DB::table('faqs')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}