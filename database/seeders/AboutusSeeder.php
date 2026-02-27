<?php

namespace Database\Seeders;

use App\Models\Aboutus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $aboutuses = [
            [
                'correlative' => 'about-us',
                'name' => 'Nosotros',
                'description' => 'Nos enfocamos en valorar y personalizar la experiencia del *auto cuidado* y del cuidado del *medio ambiente*. Creemos que se puede generar bienestar en las personas mostrándoles la mejor versión de cada *un@* y *empoderándol@s*. Es por eso que apostamos por crear fórmulas únicas a través de experiencias digitales de personalización. Creando productos orgánicos, libre de parabenos, sulfatos y libres de maltrato animal. De las miles de combinaciones que existen, la tuya es única, abrázala.',
            ],
            [
                'correlative' => 'phone',
                'name' => 'Teléfono',
                'description' => '5114605000',
            ],
            [
                'correlative' => 'email',
                'name' => 'Correo',
                'description' => 'hola@vua.pe',
            ],
            [
                'correlative' => 'whatsapp',
                'name' => 'WhatsApp',
                'description' => '5114605000',
            ],
            [
                'correlative' => 'customer-complaints',
                'name' => 'Libro de reclamaciones',
                'description' => 'https://docs.google.com/forms/d/e/1FAIpQLSesYBA7aagw3XFpqZelSLb70mx4qEI4XO2PXh6JcVV5ghnkrQ/viewform'
            ],
            [   
                'correlative' => 'home-about-title',
                'subtitle' =>  'Tu tranquilidad es nuestra prioridad',
                'name' => 'Comunicación y Seguridad en tu Hogar o Espacio de Trabajo',
                'description' => '',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-about-description',
                'subtitle' =>  '',
                'name' => 'Nosotros',
                'description' => '<p>Conocemos las necesidades de nuestros clientes, en términos de seguridad y comunicación electrónica.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-about-cardone',
                'subtitle' =>  '',
                'name' => 'Prestigio a través de los años',
                'description' => '<p>Desde 1988, en La Casa del Intercomunicador, cada solución que ofrecemos lleva el sello de una experiencia perfeccionada durante más de tres décadas, dedicadas enteramente a la mejor atención y servicio en todos los productos.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-about-cardsecond',
                'subtitle' =>  '',
                'name' => 'Empresa líder en el país',
                'description' => '<p>Llevamos seguridad y conectividad a hogares y empresas. Contamos con la fuerza operativa de más de 50 técnicos expertos en seguridad electrónica, listos para implementar las soluciones más avanzadas del mercado.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-category-section',
                'subtitle' =>  '',
                'name' => 'Intercomunicadores y sistemas de seguridad para todo tipo instalaciones',
                'description' => '',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-tecnician-title',
                'subtitle' =>  'Contamos con el personal calificado para',
                'name' => 'Instalaciones y Servicios Técnicos Multimarca',
                'description' => '',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-tecnico-section',
                'subtitle' =>  '',
                'name' => 'Nosotros lo instalamos',
                'description' => '<p>Realizamos instalaciones de todos los productos (Intercomunicadores, Sistemas de Alarma contra Robo, Cercos Eléctricos y Sistemas contra Incendios) de distintas marcas en tendencia, desde los más comerciales hasta alta gama, sujeto a evaluación técnica del proyecto.</p>
                                  <p>Además, brindamos servicios de Reparaciones, Mantenimiento, Ampliaciones, Modificaciones, Traslados, etc.</p>',
                'button_text' =>  'Todos los servicios',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-certified-section',
                'subtitle' =>  '',
                'name' => 'Certificado para INDECI',
                'description' => '<p>Respecto a Sistemas de Alarma contra Incendio cumplimos con todas las exigencias y recomendaciones de los fabricantes para el control, instalacion, y mantenimiento de estos sistemas.</p>
                                  <p>Finalizado el servicio se otorgará un certificado de operatividad que le será de utilidad al momento de la inspección INDECI</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-brands-section',
                'subtitle' =>  'Las mejores marcas comerciales y de alta gama',
                'name' => 'Marcas con las que trabajamos',
                'description' => '',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-contact-section',
                'subtitle' =>  'Tambien puedes enviarnos un mensaje',
                'name' => 'Ponte en contacto',
                'description' => '<p>Enviando un mensaje al correo comunicaciones.compras@gmail.com o completar el formulario de contacto en nuestro sitio web. También puede encontrarnos en las redes sociales, donde compartimos noticias y actualizaciones de la empresa.</p>',
                'button_text' =>  'Enviar mensaje',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'home-clients-section',
                'subtitle' =>  '',
                'name' => 'Nuestros Clientes',
                'description' => '<p>Desde Instituciones públicas hasta grandes corporaciones y proyectos residenciales, La Casa del Intercomunicador provee soluciones estratégicas en comunicación y seguridad electrónica.</p>
                                  <p>Garantizamos un producto de calidad, soporte técnico especializado y atención personalizada. Por ello, la confianza de empresas del estado y clientes particulares respalda nuestra trayectoria.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'services-title-section',
                'subtitle' =>  '',
                'name' => 'Servicio Multimarca',
                'description' => '<p>La Casa del Intercomunicador cuenta con el mejor servicio <b>post-venta</b> y pone a su disposición el personal calificado para desarrollar los servicios a continuación:</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-intercomunicadores-section',
                'subtitle' =>  '',
                'name' => 'Intercomunicadores',
                'description' => '<p>Los sistemas de intercomunicadores permiten identificar a las personas desde el momento en que habla con ellos a través del intercomunicador o portero, de la misma forma que usted se comunica por un teléfono convencional o monitor.</p>',
                'button_text' =>  'Ver todos los productos',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-intercomunicadoressecond-1benefit',
                'subtitle' =>  '',
                'name' => 'Reparaciones',
                'description' => '<p>Restauramos la operatividad de sus equipos con repuestos originales y protocolos técnicos avanzados.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-intercomunicadoressecond-2benefit',
                'subtitle' =>  '',
                'name' => 'Mantenimiento',
                'description' => '<p>Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-intercomunicadoressecond-3benefit',
                'subtitle' =>  '',
                'name' => 'Instalaciones',
                'description' => '<p>Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-videoporteros-section',
                'subtitle' =>  '',
                'name' => 'Videoporteros',
                'description' => '<p>Videoporteros que permiten identificar personas desde el momento que hablas con ellas, obsérvalos  desde el monitor de tu casa, sin riesgos.</p>',
                'button_text' =>  'Ver todos los productos',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-videoporteros-1benefit',
                'subtitle' =>  '',
                'name' => 'Reparaciones',
                'description' => '<p>Restauramos la operatividad de sus equipos con repuestos originales y protocolos técnicos avanzados.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-videoporteros-2benefit',
                'subtitle' =>  '',
                'name' => 'Mantenimiento',
                'description' => '<p>Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-videoporteros-3benefit',
                'subtitle' =>  '',
                'name' => 'Instalaciones',
                'description' => '<p>Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-incendios-section',
                'subtitle' =>  '',
                'name' => 'Videoporteros',
                'description' => '<p>Videoporteros que permiten identificar personas desde el momento que hablas con ellas, obsérvalos  desde el monitor de tu casa, sin riesgos.</p>',
                'button_text' =>  'Ver todos los productos',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-incendios-1benefit',
                'subtitle' =>  '',
                'name' => 'Reparaciones',
                'description' => '<p>Restauramos la operatividad de sus equipos con repuestos originales y protocolos técnicos avanzados.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-incendios-2benefit',
                'subtitle' =>  '',
                'name' => 'Mantenimiento',
                'description' => '<p>Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-incendios-3benefit',
                'subtitle' =>  '',
                'name' => 'Instalaciones',
                'description' => '<p>Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-alarmas-1section',
                'subtitle' =>  '',
                'name' => 'Mantenimiento',
                'description' => '<p>Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-alarmas-2section',
                'subtitle' =>  '',
                'name' => 'Instalaciones',
                'description' => '<p>Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-hospitalario-1section',
                'subtitle' =>  '',
                'name' => 'Mantenimiento',
                'description' => '<p>Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-hospitalario-2section',
                'subtitle' =>  '',
                'name' => 'Instalaciones',
                'description' => '<p>Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-cerco-1section',
                'subtitle' =>  '',
                'name' => 'Mantenimiento',
                'description' => '<p>Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
            [
                'correlative' => 'products-cerco-2section',
                'subtitle' =>  '',
                'name' => 'Instalaciones',
                'description' => '<p>Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.</p>',
                'button_text' =>  '',
                'button_link' =>  '',
            ],
        ];

        foreach ($aboutuses as $aboutus) {
            Aboutus::updateOrCreate(['correlative' => $aboutus['correlative']], $aboutus);
        }
    }
}
