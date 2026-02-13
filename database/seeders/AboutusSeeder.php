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
            ]
        ];

        foreach ($aboutuses as $aboutus) {
            Aboutus::updateOrCreate(['correlative' => $aboutus['correlative']], $aboutus);
        }
    }
}
