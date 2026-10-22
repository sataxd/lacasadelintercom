<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralSeeder extends Seeder
{
    public function run(): void
    {
        $generals = [
            [
                'id' => 'a071d169-ad6d-4865-b623-2499c5e12071',
                'correlative' => 'phone_contact',
                'name' => 'Teléfono de contacto',
                'description' => '223 7730,223 2685',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-03-16 23:19:39',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-af86-4c05-bfda-0b0d1371cfeb',
                'correlative' => 'email_contact',
                'name' => 'Correo de contacto',
                'description' => 'soporte@trasciende.com',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-02-19 05:42:19',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-b2ae-4a8a-8b37-5e193b64ff07',
                'correlative' => 'address',
                'name' => 'Dirección',
                'description' => 'Calle Morelli 341',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-02-19 06:47:30',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-b411-4108-beab-9eefec57294f',
                'correlative' => 'opening_hours',
                'name' => 'Horarios de atención',
                'description' => 'De lunes a viernes - 10 am a 7pm',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2025-11-25 21:44:11',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-b57a-42ef-a1f4-9ca79ee8a186',
                'correlative' => 'support_phone',
                'name' => 'Número de soporte',
                'description' => '+51 922 480 484',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-03-16 22:04:21',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-b742-4a16-accb-d251d3d2d878',
                'correlative' => 'support_email',
                'name' => 'Correo de soporte',
                'description' => 'ventas@casadelintercom.com',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-03-16 21:56:57',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-b923-46d3-beb5-88296a55108a',
                'correlative' => 'privacy_policy',
                'name' => 'Política de privacidad',
                'description' => 'Nuestra política de privacidad protege la información personal de nuestros usuarios...',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2025-11-25 21:44:11',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-bb73-479a-841f-c86a2155c262',
                'correlative' => 'terms_conditions',
                'name' => 'Términos y condiciones',
                'description' => '<p><strong>1. Condiciones de Uso</strong></p><p>
</p><p>Todo usuario que ingresa al sitio web <strong>casadelintercom.com</strong> se compromete a leer detenidamente y aceptar –si estuviera de
  acuerdo con el texto leído– los términos y condiciones generales antes de utilizar los portales y servicios web que
  ofrece la empresa. De no estar de acuerdo o no aceptarlos, deberá abstenerse de navegar por dicho sitio web y/o
  manipular cualquier tipo de información contenida en él, bajo responsabilidad propia.
</p><p>
</p><p>El propósito del sitio web es brindar información, así como promocionar y divulgar los servicios y/o productos que
  ofrece <strong>La Casa del Intercomunicador SAC</strong> (en adelante, “La Casa del Intercomunicador”). Está dirigido a clientes y público en general.
</p><p>
</p><p>Para dejar sugerencias y/o comentarios sobre los términos y condiciones de uso de nuestro sitio web pueden ir a
  <strong>casadelintercom.com</strong>.
</p><p>
</p><p><strong>2. Derechos de propiedad industrial e intelectual</strong></p><p>
</p><p>Todos los derechos de propiedad industrial e intelectual contenidos en la página web son de propiedad de <strong>La Casa del Intercomunicador</strong>.
  Se prohíbe el uso de cualquier derecho de propiedad industrial e intelectual sin contar con el consentimiento previo,
  expreso y por escrito de La Casa del Intercomunicador.
</p><p>
</p><p><strong>2.1. Derechos de autor</strong></p><p>
</p><p>Este sitio se encuentra protegido por la normativa peruana vigente sobre derechos de autor. Todos los derechos
  involucrados, como por ejemplo su contenido y su diseño visual, son de titularidad de <strong>La Casa del Intercomunicador</strong>, por lo que se
  encuentra estrictamente prohibido por parte de terceros el empleo, modificación, reproducción, distribución,
  transmisión o comercialización de los derechos involucrados sin el permiso previo, expreso y por escrito de La Casa del Intercomunicador.
</p><p>
</p><p><strong>2.2. Signos distintivos</strong></p><p>
</p><p>Todos los signos distintivos (marcas de productos y de servicio, lemas comerciales y nombres comerciales) registrados
  de acuerdo a la legislación nacional y supranacional, son propiedad de <strong>La Casa del Intercomunicador</strong>.
</p><p>
</p><p>Se prohíbe el uso de cualquier signo distintivo de titularidad de La Casa del Intercomunicador contenido en el presente sitio web sin el
  consentimiento por escrito previo de La Casa del Intercomunicador.
</p><p>
</p><p><strong>3. Aceptación de términos</strong></p><p>
</p><p>Los sitios web y referencias están disponibles para que el usuario, bajo su responsabilidad, los utilice
  adecuadamente
  sin aprovecharse de alguna falla que ocurra y saque provecho de la misma. Si encuentra alguna falla en nuestro sitio
  web, el usuario se compromete a reportarla a <strong>casadelintercom.com</strong>.
</p><p>
</p><p>Queda prohibido el uso del nombre, logotipos, marcas, diseños o cualquier signo distintivo de autoría de La Casa del Intercomunicador, como
  enlaces de hipertexto o hipervínculos a páginas no controladas por la empresa, sin previa y expresa autorización de
  <strong>La Casa del Intercomunicador</strong>.
</p><p>
</p><p><strong>4. Obligaciones de los usuarios en general</strong></p><p>
</p><p>El usuario se compromete a utilizar los servicios y contenidos que le proporciona el portal conforme a la legislación
  vigente, a los principios de buena fe y usos generalmente aceptados y a no contravenirlos con sus acciones a través de
  la web de La Casa del Intercomunicador. El usuario se compromete a suministrar información <strong>verdadera y exacta</strong> acerca de sí mismo en los
  formularios de registro del portal.
</p><p>
</p><p><strong>5. Modificaciones a los términos y condiciones</strong></p><p>
</p><p><strong>La Casa del Intercomunicador</strong> se reserva el derecho de modificar el contenido y alcance de los presentes términos y condiciones en
  cualquier momento y según lo considere necesario. El usuario declara tener conocimiento de la presente cláusula y
  autoriza a La Casa del Intercomunicador a efectuar dichos términos y modificaciones. La Casa del Intercomunicador informará al usuario respecto a las modificaciones
  efectuadas en un plazo de <strong>15 días</strong> previos a la entrada en vigor de las mismas con la finalidad de que en dicho
  periodo de tiempo pueda decidir eliminar su inscripción al sitio web <strong>casadelintercom.com</strong>.
</p><p>
</p><p><strong>6. Delimitación de responsabilidad</strong></p><p>
</p><p>El sitio web <strong>casadelintercom.com</strong> es una página que ha sido creada únicamente con fines informativos. En todos los casos de
  discrepancia en la información contenida en esta página y documentos entregados a los clientes prevalecerán estos
  textos frente a los que puedan aparecer en la página web.
</p><p>
</p><p>La Casa del Intercomunicador no garantiza un servicio libre e ininterrumpido de esta página, pero sí declara su voluntad de efectuar los
  esfuerzos que, dentro de lo razonable, permitan alcanzar su disponibilidad por el mayor tiempo posible.
</p><p>
</p><p><strong>7. Leyes vigentes</strong></p><p>
</p><p>El uso de este sitio web se regirá por todas las leyes aplicables de la <strong>República del Perú</strong>.
</p>',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a071d169-bda9-4782-acd9-a6bc39562843',
                'correlative' => 'location',
                'name' => 'Ubicación',
                'description' => '-12.043836411509494,-76.89786196191405',
                'status' => 1,
                'created_at' => '2025-11-25 21:44:11',
                'updated_at' => '2026-02-19 06:09:23',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-df3d-4689-b717-e95888fc48f2',
                'correlative' => 'seo_title',
                'name' => 'Titulo - SEO',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e354-472b-a605-3ccade78d48e',
                'correlative' => 'seo_description',
                'name' => 'Descripcion - SEO',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e47c-4206-8d31-bfc30d6766c0',
                'correlative' => 'seo_keywords',
                'name' => 'Palabras clave - SEO',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e5af-4679-9f89-f991c7c2f397',
                'correlative' => 'facebook_pixel',
                'name' => 'Facebook Pixel ID',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e6c2-4e2d-80b0-66cdbf1ff9fb',
                'correlative' => 'google_analytics',
                'name' => 'Google Analytics ID',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e7d5-4d2d-95a4-a844a3da6e16',
                'correlative' => 'gtm_container',
                'name' => 'Google Tag Manager ID',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e8d4-48bf-8a5b-16e802fd07b8',
                'correlative' => 'tiktok_pixel',
                'name' => 'TikTok Pixel ID',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-e9db-436f-8a8b-fbd40a5c45f0',
                'correlative' => 'meta_pixel',
                'name' => 'Meta Pixel ID',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d79f9-eb0d-4d14-8f51-f03acbab148e',
                'correlative' => 'microsoft_clarity',
                'name' => 'Microsoft Clarity ID',
                'description' => NULL,
                'status' => 1,
                'created_at' => '2026-02-19 05:42:05',
                'updated_at' => '2026-02-19 05:42:05',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d915e-6043-4d84-8c30-aeba99f9c77b',
                'correlative' => 'district',
                'name' => 'Distrito',
                'description' => 'San Borja, Lima',
                'status' => 1,
                'created_at' => '2026-02-19 06:47:30',
                'updated_at' => '2026-03-16 22:03:37',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d915e-63ca-4de4-b769-e6ba78ab8531',
                'correlative' => 'country',
                'name' => 'País',
                'description' => 'Perú',
                'status' => 1,
                'created_at' => '2026-02-19 06:47:30',
                'updated_at' => '2026-02-19 06:47:30',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d937c-b786-41d6-a504-afad08e51d46',
                'correlative' => 'lat',
                'name' => 'Latitud',
                'description' => '-12.091651054598318',
                'status' => 1,
                'created_at' => '2026-02-19 06:53:25',
                'updated_at' => '2026-03-17 15:33:32',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
            [
                'id' => 'a11d937c-b87f-4a1e-989b-50acfc436953',
                'correlative' => 'long',
                'name' => 'Longitud',
                'description' => '-77.00375865767057',
                'status' => 1,
                'created_at' => '2026-02-19 06:53:25',
                'updated_at' => '2026-03-17 15:33:32',
                'meta_title' => NULL,
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'facebook_pixel' => NULL,
                'meta_pixel' => NULL,
                'tiktok_pixel' => NULL,
                'google_analytics' => NULL,
                'google_tag_manager' => NULL,
                'microsoft_clarity' => NULL,
            ],
        ];

        foreach ($generals as $item) {
            DB::table('generals')->updateOrInsert(['correlative' => $item['correlative']], $item);
        }
    }
}