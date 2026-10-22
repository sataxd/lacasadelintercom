<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $storageDir = storage_path('app/images/services');
        if (!File::isDirectory($storageDir)) {
            File::makeDirectory($storageDir, 0755, true);
        }

        $services = [
            [
                'id' => 'a126ad20-3209-4331-ae4f-cec169d3b66b',
                'name' => 'Reparaciones',
                'slug' => 'reparaciones',
                'description' => '<p>Diagn&oacute;stico y correcci&oacute;n de fallos en equipos, cableado o configuraci&oacute;n para restablecer la funcionalidad completa de su sistema de intercomunicadores.&nbsp;</p>

<ul>
	<li>Servicio de reparaci&oacute;n para todos los productos de la marca&nbsp;<strong>Itower</strong></li>
	<li>Para<strong>&nbsp;otras marcas</strong>, servicio de reparaci&oacute;n limitado a disponibilidad de repuestos en el mercado y/o .</li>
</ul>',
                'image' => 'a3ba17eb-f996-4b47-b339-41dc3c5baa96.png',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-23 19:27:33',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a126b9a8-9af6-4310-b531-84261e9cb3d0',
                'name' => 'Mantenimiento',
                'slug' => 'mantenimiento',
                'description' => '<ul>
	<li>Revisi&oacute;n del estado de gabinetes, soportes, puntos de fijaci&oacute;n y protecciones contra la intemperie (especialmente en cercos el&eacute;ctricos y sensores exteriores).</li>
	<li>Retiro de polvo, suciedad e insectos de sensores, sirenas, paneles de control y c&aacute;maras/micr&oacute;fonos de intercomunicadores para evitar falsas alarmas y garantizar la sensibilidad.</li>
</ul>',
                'image' => '6d994609-6a31-4121-a9bf-03b185a2a37d.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-23 20:02:36',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a12e07e9-c660-4af5-af23-89187fd09500',
                'name' => 'Instalaciones',
                'slug' => 'instalaciones',
                'description' => '<ul>
	<li>Evaluaci&oacute;n detallada del espacio (vivienda, comercio, hospital, per&iacute;metro) para identificar puntos cr&iacute;ticos de acceso, zonas ciegas y los mejores lugares para ubicar sensores o c&aacute;maras.</li>
	<li>Determinaci&oacute;n de la cantidad exacta y el tipo de equipos necesarios (detectores, barreras, intercomunicadores) para una cobertura del 100%, evitando la sobre o subestimaci&oacute;n.</li>
	<li>En el caso de alarmas contra incendio o cercos el&eacute;ctricos, aseguramos que la instalaci&oacute;n cumpla con las regulaciones locales y est&aacute;ndares de seguridad vigentes.</li>
</ul>',
                'image' => 'c035666b-e864-4586-99e5-1b3f6912ff22.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 11:12:13',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a12e0830-8ee4-4d02-84a6-f3959520349b',
                'name' => 'Ampliaciones',
                'slug' => 'ampliaciones',
                'description' => '<ul>
	<li>Adici&oacute;n de nuevos componentes o funcionalidades a un sistema existente (ej. m&aacute;s sensores, sirenas, un nuevo sector en el cerco el&eacute;ctrico, m&aacute;s puntos de intercomunicaci&oacute;n).</li>
	<li>
	<p>El servicio de ampliaciones le permite aumentar la cobertura y las funcionalidades de su sistema de seguridad existente de manera eficiente y sin necesidad de sustituir toda la instalaci&oacute;n.</p>
	</li>
</ul>',
                'image' => '53bf3a05-98e6-4863-811d-0b3b0630cc22.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 11:12:59',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a12e084e-5085-4b33-a6ef-b062f0737056',
                'name' => 'Modificaciones',
                'slug' => 'modificaciones',
                'description' => '<ul>
	<li>Reubicaci&oacute;n de equipos o reconfiguraci&oacute;n de zonas y par&aacute;metros operativos dentro del sistema de seguridad ya instalado, sin necesidad de a&ntilde;adir nuevos componentes.</li>
	<li>
	<p>El servicio de Modificaciones se enfoca en&nbsp;<strong>ajustar, reubicar o reconfigurar</strong>&nbsp;elementos clave de su sistema de seguridad ya instalado, en respuesta a cambios estructurales, de uso o por preferencias operativas del cliente.</p>
	</li>
</ul>',
                'image' => '2f9a84d4-7365-46b3-97eb-aea7d69295f3.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 11:13:19',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a12e0862-d635-4fa1-b498-8c113ef84488',
                'name' => 'Traslados',
                'slug' => 'traslados',
                'description' => '<ul>
	<li>
	<p>El servicio de Traslados se encarga del&nbsp;<strong>desmontaje seguro, transporte y reinstalaci&oacute;n completa</strong>&nbsp;de sus sistemas de seguridad electr&oacute;nica (alarmas, cercos, intercomunicadores) desde su ubicaci&oacute;n actual hasta una nueva propiedad.</p>
	</li>
	<li>Evita la inactividad prolongada; su sistema estar&aacute; operativo en el nuevo lugar r&aacute;pidamente.</li>
	<li>Al ser el mismo equipo t&eacute;cnico que conoce el sistema, garantizamos que el sistema operar&aacute; con la misma fiabilidad en la nueva ubicaci&oacute;n.</li>
</ul>',
                'image' => 'e0e11aa7-6d42-4b20-85a8-7ae624ba1351.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 11:13:32',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a12e08aa-22e8-4ef9-be1e-c1d82153671d',
                'name' => 'Cambio de Equipos',
                'slug' => 'cambio-de-equipos',
                'description' => '<ul>
	<li>Sustituci&oacute;n de componentes antiguos, obsoletos o da&ntilde;ados por modelos compatibles de rendimiento superior dentro de su infraestructura de seguridad actual.</li>
	<li>Permite acceder a las ventajas de las nuevas tecnolog&iacute;as (ej. mayor velocidad, m&aacute;s funciones) sin tener que invertir en un sistema completamente nuevo.</li>
	<li>Nos aseguramos de que el nuevo equipo se integre perfectamente a otros sistemas instalados.</li>
</ul>',
                'image' => 'b88febb0-950a-4756-9e01-5ed26831d085.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 11:14:19',
                'updated_at' => '2026-03-30 08:07:28',
            ],
            [
                'id' => 'a12e0940-e0e7-4bf9-ba9f-92c3b2326280',
                'name' => 'Nuevas Tecnologías',
                'slug' => 'nuevas-tecnologias',
                'description' => '<p>Integraci&oacute;n de las &uacute;ltimas innovaciones en seguridad electr&oacute;nica (ej. integraci&oacute;n con IoT, intercomunicadores IP avanzados, alarmas con verificaci&oacute;n de video) para mejorar su protecci&oacute;n.</p>',
                'image' => '223755ff-42c0-4662-b382-0e5f9d0919c3.webp',
                'visible' => 1,
                'status' => 1,
                'created_at' => '2026-02-27 11:15:58',
                'updated_at' => '2026-03-30 08:07:29',
            ],
        ];

        foreach ($services as $item) {
            DB::table('services')->updateOrInsert(['id' => $item['id']], $item);
        }
    }
}