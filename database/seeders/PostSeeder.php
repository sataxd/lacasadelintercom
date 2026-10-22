<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $postsDir = storage_path('app/posts');
        if (!File::exists($postsDir)) {
            File::makeDirectory($postsDir, 0755, true);
        }

        $imageMap = [
            'post_intercom.webp' => public_path('assets/img/cat_intercomunicador.webp'),
            'post_videoporteros.webp' => public_path('assets/img/cat_videoporteros.webp'),
            'post_incendio.webp' => public_path('assets/img/cat_incendio.webp'),
        ];

        foreach ($imageMap as $dest => $src) {
            if (File::exists($src)) {
                File::copy($src, $postsDir . '/' . $dest);
            }
        }

        $categoryId = DB::table('category_posts')->value('id') ?? 'a1ab6a57-6613-48b8-8b92-1e545c93ad39';

        $posts = [
            [
                'id' => 'b101a001-1111-4000-8000-000000000001',
                'name' => 'Guía completa sobre sistemas de intercomunicadores para condominios y edificios',
                'slug' => 'sistemas-de-intercomunicadores-para-condominios-y-edificios',
                'summary' => 'Descubre las ventajas de modernizar la red de intercomunicación en condominios residenciales para garantizar mayor seguridad y control de accesos.',
                'description' => '<p>Los sistemas de intercomunicadores representan la primera línea de defensa y comunicación en edificios residenciales y corporativos. Contar con un sistema moderno permite una comunicación clara y sin interferencias entre conserjería y departamentos.</p><h3>¿Por qué modernizar el sistema de intercomunicador?</h3><p>Con el paso de los años, el cableado sulfatado y las centrales analógicas antiguas presentan ruidos y fallas recurrentes. La actualización a sistemas digitales o híbridos asegura audio nítido, apertura remota de cantoneras eléctricas y menor costo de mantenimiento.</p>',
                'image' => 'post_intercom.webp',
                'post_date' => '2026-03-01',
                'category_id' => $categoryId,
                'status' => 1,
                'meta_title' => 'Intercomunicadores para Condominios y Edificios en Lima | Guía',
                'meta_description' => 'Guía técnica para instalar o modernizar intercomunicadores en condominios en Lima. Mejora la seguridad y comunicación conserjería-departamentos.',
                'meta_keywords' => 'intercomunicadores edificios lima, intercomunicador condominios, instalacion de intercomunicadores, cantoneras electricas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'b101a002-2222-4000-8000-000000000002',
                'name' => 'Videoporteros IP: Seguridad visual y apertura de puertas desde tu smartphone',
                'slug' => 'videoporteros-ip-seguridad-y-apertura-desde-smartphone',
                'summary' => 'Aprende cómo los videoporteros IP permiten atender llamadas desde cualquier lugar mediante aplicaciones móviles y registrar capturas de visitantes.',
                'description' => '<p>La tecnología de videoporteros IP ha transformado la seguridad residencial. Ahora es posible ver, hablar y abrir la puerta principal desde el celular sin importar si te encuentras dentro de casa o fuera de la ciudad.</p><h3>Principales beneficios de los videoporteros IP</h3><ul><li>Cámaras gran angular con visión nocturna infrarroja.</li><li>Integración con cerraduras inteligentes y porteros eléctricos.</li><li>Notificaciones en tiempo real al teléfono móvil.</li></ul>',
                'image' => 'post_videoporteros.webp',
                'post_date' => '2026-03-10',
                'category_id' => $categoryId,
                'status' => 1,
                'meta_title' => 'Videoporteros IP y Smart en Lima | Control Móvil y Seguridad',
                'meta_description' => 'Descubre las ventajas de instalar un videoportero IP: visualización HD, audio bidireccional y apertura remota desde tu teléfono inteligente.',
                'meta_keywords' => 'videoporteros ip lima, videoportero wifi, videoportero para edificios, cerradura inteligente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'b101a003-3333-4000-8000-000000000003',
                'name' => 'Importancia del mantenimiento preventivo en sistemas contra incendios y alarmas',
                'slug' => 'mantenimiento-preventivo-sistemas-contra-incendios-y-alarmas',
                'summary' => 'Conoce la normativa y protocolos indispensables para mantener operativas las estaciones manuales, detectores de humo y paneles centrales.',
                'description' => '<p>El mantenimiento preventivo en sistemas de detección y alarma contra incendios salva vidas y evita sanciones municipales. Una inspección semestral garantiza que cada sensor y sirena responda adecuadamente ante una emergencia.</p><h3>Puntos clave en la inspección técnica</h3><p>Pruebas de lazo, verificación de baterías de respaldo y calibración de detectores fotoeléctricos para evitar falsas alarmas.</p>',
                'image' => 'post_incendio.webp',
                'post_date' => '2026-03-18',
                'category_id' => $categoryId,
                'status' => 1,
                'meta_title' => 'Mantenimiento de Sistemas Contra Incendios en Lima | Normativa',
                'meta_description' => 'Protocolos de mantenimiento preventivo y correctivo para alarmas contra incendios en edificios y empresas de Lima. Cumple con INDECI.',
                'meta_keywords' => 'mantenimiento contra incendios lima, alarmas de incendio indeci, detectores de humo edificios, estaciones manuales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($posts as $post) {
            DB::table('posts')->updateOrInsert(['id' => $post['id']], $post);
        }
    }
}
