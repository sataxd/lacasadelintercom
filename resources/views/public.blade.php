@php
    $component = Route::currentRouteName();
    
    $props = $page['props'] ?? [];
    // Crear una instancia del trait para obtener datos SEO y píxeles
    $trackingHelper = new class {
        use App\Traits\TrackingPixelsTrait;
    };
    
    // Obtener datos SEO y píxeles de seguimiento
    $seoData = $trackingHelper->getSeoData();
    $trackingPixels = $trackingHelper->getTrackingPixels();
    
    // Extraer datos SEO
    $seoTitle = $props['seo_title'] ?? $seoData['seo_title'];
    $seoDescription = $props['seo_description'] ?? $seoData['seo_description'];
    $seoKeywords = $props['seo_keywords'] ?? $seoData['seo_keywords'];
    $seoImage = $props['seo_image'] ?? asset('assets/img/casadelintercom_nosotros_1.webp');
    $ogType = $props['og_type'] ?? 'website';
    $canonicalBase = rtrim(config('app.url', 'https://casadelintercom.com'), '/');
    $canonicalUrl = $canonicalBase . (request()->getPathInfo() === '/' ? '' : request()->getPathInfo());
    
    // Extraer píxeles de seguimiento
    $facebookPixel = $trackingPixels['FACEBOOK_PIXEL'];
    $metaPixel = $trackingPixels['META_PIXEL'];
    $googleAnalytics = $trackingPixels['GOOGLE_ANALYTICS'];
    $gtmContainer = $trackingPixels['GTM_CONTAINER'];
    $tiktokPixel = $trackingPixels['TIKTOK_PIXEL'];
    $microsoftClarity = $trackingPixels['MICROSOFT_CLARITY'];
@endphp


<!DOCTYPE html>
<html lang="es">

<head>
    @viteReactRefresh
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $seoTitle }}</title>

    <meta name="title" content="{{ $seoTitle }}" />
    <meta name="description" content="{{ $seoDescription }}" />
    @if(!empty($seoKeywords))
        <meta name="keywords" content="{{ $seoKeywords }}" />
    @endif
    <meta name="robots" content="index, follow" />

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ $canonicalUrl }}" />

    <!-- Open Graph / Redes Sociales -->
    <meta property="og:locale" content="es_PE" />
    <meta property="og:type" content="{{ $ogType }}" />
    <meta property="og:title" content="{{ $seoTitle }}" />
    <meta property="og:description" content="{{ $seoDescription }}" />
    <meta property="og:url" content="{{ $canonicalUrl }}" />
    <meta property="og:site_name" content="La Casa del Intercomunicador" />
    <meta property="og:image" content="{{ $seoImage }}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $seoTitle }}" />
    <meta name="twitter:description" content="{{ $seoDescription }}" />
    <meta name="twitter:image" content="{{ $seoImage }}" />

    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png">

    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />

    <!-- Preconnect para Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <!-- Google Fonts con pesos optimizados y display=swap para Core Web Vitals -->
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Sora:wght@400..700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <meta name="google-site-verification" content="TsjJ6R6l7vGrnPtUDLPdnC4Nvy0IeYMc32GA3FLAuWk" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

    <!-- Schema.org JSON-LD (SecurityService / LocalBusiness) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SecurityService",
      "name": "La Casa del Intercomunicador",
      "alternateName": "Casadelintercom",
      "url": "{{ config('app.url', 'https://casadelintercom.com') }}",
      "logo": "{{ asset('assets/img/lacasadelintercom_whitered.webp') }}",
      "image": "{{ $seoImage }}",
      "description": "{{ $seoDescription }}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Morelli 341",
        "addressLocality": "San Borja",
        "addressRegion": "Lima",
        "postalCode": "15036",
        "addressCountry": "PE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-12.091651",
        "longitude": "-77.003758"
      },
      "telephone": "+51922480484",
      "priceRange": "$$",
      "areaServed": {
        "@type": "City",
        "name": "Lima"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
    </script>

    @php
        $article = $props['article'] ?? null;
        $service = $props['servicios'] ?? null;
        $faqs = $props['faqs'] ?? null;
    @endphp

    @if (!empty($article))
    @php
        $artName = is_array($article) ? ($article['name'] ?? '') : ($article->name ?? '');
        $artSummary = is_array($article) ? ($article['summary'] ?? '') : ($article->summary ?? '');
        $artDesc = is_array($article) ? ($article['description'] ?? '') : ($article->description ?? '');
        $artDate = is_array($article) ? ($article['post_date'] ?? $article['created_at'] ?? null) : ($article->post_date ?? $article->created_at ?? null);
        $artMod = is_array($article) ? ($article['updated_at'] ?? null) : ($article->updated_at ?? null);
        $articleSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'BlogPosting',
            'headline' => $artName,
            'description' => !empty($artSummary) ? strip_tags($artSummary) : (!empty($artDesc) ? \Illuminate\Support\Str::limit(strip_tags($artDesc), 155) : ''),
            'image' => $seoImage,
            'datePublished' => !empty($artDate) ? date('c', strtotime($artDate)) : date('c'),
            'dateModified' => !empty($artMod) ? date('c', strtotime($artMod)) : date('c'),
            'author' => [
                '@type' => 'Organization',
                'name' => 'La Casa del Intercomunicador'
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'La Casa del Intercomunicador',
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('assets/img/lacasadelintercom_whitered.webp')
                ]
            ],
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $canonicalUrl
            ]
        ];
    @endphp
    <script type="application/ld+json">
    {!! json_encode($articleSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    @endif

    @if (!empty($service))
    @php
        $srvName = is_array($service) ? ($service['name'] ?? '') : ($service->name ?? '');
        $srvDesc = is_array($service) ? ($service['description'] ?? '') : ($service->description ?? '');
        $serviceSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => $srvName,
            'description' => !empty($srvDesc) ? strip_tags($srvDesc) : '',
            'provider' => [
                '@type' => 'LocalBusiness',
                'name' => 'La Casa del Intercomunicador',
                'url' => config('app.url')
            ],
            'areaServed' => [
                '@type' => 'City',
                'name' => 'Lima'
            ],
            'hasOfferCatalog' => [
                '@type' => 'OfferCatalog',
                'name' => 'Servicios de Seguridad Electrónica'
            ]
        ];
    @endphp
    <script type="application/ld+json">
    {!! json_encode($serviceSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    @endif

    @if (!empty($faqs) && (is_countable($faqs) ? count($faqs) > 0 : true))
    @php
        $faqItems = [];
        foreach ($faqs as $faq) {
            $q = is_array($faq) ? ($faq['name'] ?? '') : ($faq->name ?? '');
            $a = is_array($faq) ? ($faq['description'] ?? '') : ($faq->description ?? '');
            if (!empty($q) && !empty($a)) {
                $faqItems[] = [
                    '@type' => 'Question',
                    'name' => $q,
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => strip_tags($a)
                    ]
                ];
            }
        }
    @endphp
    @if (count($faqItems) > 0)
    <script type="application/ld+json">
    {!! json_encode([
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => $faqItems
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    @endif
    @endif
    <style>
        * {

            box-sizing: border-box;
        }
    </style>

    <!-- Google Tag Manager -->
    @if($gtmContainer)
        <script>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{ $gtmContainer }}');
        </script>
    @endif

    <!-- Google Analytics -->
    @if($googleAnalytics)
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $googleAnalytics }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '{{ $googleAnalytics }}');
        </script>
    @endif

    <!-- Microsoft Clarity -->
    @if($microsoftClarity)
        <script type="text/javascript">
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "{{ $microsoftClarity }}");
        </script>
    @endif

    <!-- Variables globales para tracking -->
    <script>
        window.global = {
            FACEBOOK_PIXEL: '{{ $facebookPixel }}',
            META_PIXEL: '{{ $metaPixel }}',
            GOOGLE_ANALYTICS: '{{ $googleAnalytics }}',
            GTM_CONTAINER: '{{ $gtmContainer }}',
            TIKTOK_PIXEL: '{{ $tiktokPixel }}',
            MICROSOFT_CLARITY: '{{ $microsoftClarity }}'
        };
    </script>

    @if ($component == 'Checkout.jsx')
        <script type="application/javascript" src="https://checkout.culqi.com/js/v4"></script>
    @elseif ($component == 'MyAccount.jsx')
        <link href="/lte/assets/libs/dxdatagrid/css/dx.light.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
            rel="stylesheet" type="text/css" id="dg-default-stylesheet" />
        <link href="/lte/assets/libs/dxdatagrid/css/dx.dark.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
            rel="stylesheet" type="text/css" id="dg-dark-stylesheet" disabled="disabled" />
    @endif

    @vite(['resources/css/app.css', 'resources/js/' . Route::currentRouteName()])
    @inertiaHead

    <link href="/lte/assets/libs/quill/quill.snow.css" rel="stylesheet" type="text/css" />
    <link href="/lte/assets/libs/quill/quill.bubble.css" rel="stylesheet" type="text/css" />
    <style>
        .ql-editor blockquote {
            border-left: 4px solid #f8b62c;
            padding-left: 16px;
        }

        .ql-editor * {
            color: #475569;
        }

        .ql-editor img {
            border-radius: 8px;
        }
    </style>

    <!-- Meta/Facebook Pixel Code -->
    @if($metaPixel || $facebookPixel)
        @php
            $pixelId = $metaPixel ?: $facebookPixel;
        @endphp
        <script>
            ! function(f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function() {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '{{ $pixelId }}');
            fbq('track', 'PageView');
        </script>
        <noscript>
            <img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id={{ $pixelId }}&ev=PageView&noscript=1" />
        </noscript>
    @endif
    <!-- End Meta/Facebook Pixel Code -->

    <!-- TikTok Pixel Code -->
    @if($tiktokPixel)
        <script>
            !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('{{ $tiktokPixel }}');
                ttq.page();
            }(window, document, 'ttq');
        </script>
    @endif
    <!-- End TikTok Pixel Code -->

    <style>
        body {
            /*background-image: url('/home-mobile.png');*/
            width: 100%;
            height: auto;
            background-size: 100% auto;
            background-repeat: no-repeat;
            /* Asegura que la imagen no se repita */
            background-position: top center;
            /* Centra la imagen en la parte superior */
        }
    </style>
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    @if($gtmContainer)
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmContainer }}"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
    @endif

    @inertia

    <script src="/lte/assets/js/vendor.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
    <script src="/lte/assets/libs/moment/min/moment.min.js"></script>
    <script src="/lte/assets/libs/moment/moment-timezone.js"></script>
    <script src="/lte/assets/libs/moment/locale/es.js"></script>
    <script src="/lte/assets/libs/quill/quill.min.js"></script>

    @if ($component == 'MyAccount.jsx')
        <script src="/lte/assets/libs/dxdatagrid/js/dx.all.js"></script>
        <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.es.js"></script>
        <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.en.js"></script>
    @endif

    <script src="/lte/assets/libs/tippy.js/tippy.all.min.js"></script>

    <!-- Tracking Pixels Helper -->
    <script src="/assets/js/tracking-pixels.js"></script>

    <script>
        document.addEventListener('click', function(event) {
            const target = event.target;

            if (target.tagName === 'BUTTON' && target.hasAttribute('href')) {
                const href = target.getAttribute('href');

                if (target.getAttribute('target') === '_blank') {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            }
        });
    </script>
</body>

</html>
