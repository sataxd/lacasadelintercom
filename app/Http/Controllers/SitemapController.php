<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Services;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = rtrim(config('app.url', 'https://casadelintercom.com'), '/');

        // Páginas estáticas principales
        $urls = [
            [
                'loc' => $baseUrl . '/',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'daily',
                'priority' => '1.0'
            ],
            [
                'loc' => $baseUrl . '/nosotros',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.8'
            ],
            [
                'loc' => $baseUrl . '/contacto',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.8'
            ],
            [
                'loc' => $baseUrl . '/blog',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '0.8'
            ],
            [
                'loc' => $baseUrl . '/faqs',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.7'
            ],
        ];

        // Categorías activas
        $categories = Category::where('status', true)->where('visible', true)->get();
        foreach ($categories as $cat) {
            $urls[] = [
                'loc' => $baseUrl . '/' . ltrim($cat->slug, '/'),
                'lastmod' => $cat->updated_at ? $cat->updated_at->format('Y-m-d') : date('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '0.9'
            ];
        }

        // Servicios activos
        $services = Services::where('status', true)->where('visible', true)->get();
        foreach ($services as $service) {
            $urls[] = [
                'loc' => $baseUrl . '/servicio/' . ltrim($service->slug, '/'),
                'lastmod' => $service->updated_at ? $service->updated_at->format('Y-m-d') : date('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '0.9'
            ];
        }

        // Artículos del Blog
        $posts = Post::where('status', true)->get();
        foreach ($posts as $post) {
            $slugOrId = !empty($post->slug) ? $post->slug : $post->id;
            $urls[] = [
                'loc' => $baseUrl . '/blog/' . $slugOrId,
                'lastmod' => $post->updated_at ? $post->updated_at->format('Y-m-d') : date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.7'
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $u) {
            $xml .= "    <url>\n";
            $xml .= "        <loc>" . htmlspecialchars($u['loc']) . "</loc>\n";
            $xml .= "        <lastmod>{$u['lastmod']}</lastmod>\n";
            $xml .= "        <changefreq>{$u['changefreq']}</changefreq>\n";
            $xml .= "        <priority>{$u['priority']}</priority>\n";
            $xml .= "    </url>\n";
        }
        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8'
        ]);
    }
}
