<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404 - Página no encontrada | La Casa del Intercomunicador</title>

    <!-- Regla SEO fundamental: páginas 404 nunca deben indexarse -->
    <meta name="robots" content="noindex, follow">

    <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png">

    <!-- Fuentes corporativas -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">

    <style>
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #0b0b0b;
            color: #f1f5f9;
            font-family: 'DM Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            position: relative;
        }

        /* Efecto de resplandor ambiental */
        .ambient-glow {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(248, 182, 44, 0.12) 0%, rgba(2, 132, 199, 0.05) 50%, transparent 70%);
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 0;
            filter: blur(60px);
        }

        header {
            position: relative;
            z-index: 10;
            padding: 24px 5%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(11, 11, 11, 0.8);
            backdrop-filter: blur(12px);
        }

        .logo-link img {
            height: 48px;
            width: auto;
            object-fit: contain;
            display: block;
        }

        .header-btn {
            color: #f8b62c;
            border: 1px solid rgba(248, 182, 44, 0.3);
            background: rgba(248, 182, 44, 0.05);
            padding: 10px 20px;
            border-radius: 9999px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .header-btn:hover {
            background: #f8b62c;
            color: #0b0b0b;
            box-shadow: 0 0 20px rgba(248, 182, 44, 0.35);
        }

        main {
            position: relative;
            z-index: 5;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            text-align: center;
        }

        .error-code {
            font-family: 'Sora', sans-serif;
            font-size: clamp(80px, 16vw, 170px);
            font-weight: 800;
            line-height: 1;
            background: linear-gradient(135deg, #ffffff 30%, #f8b62c 70%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.04em;
            margin-bottom: 16px;
            text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .badge {
            display: inline-block;
            background: rgba(239, 68, 68, 0.15);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.3);
            padding: 6px 16px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        h1 {
            font-family: 'Sora', sans-serif;
            font-size: clamp(24px, 4vw, 36px);
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }

        p.description {
            color: #94a3b8;
            font-size: clamp(15px, 2vw, 18px);
            max-width: 580px;
            line-height: 1.6;
            margin-bottom: 36px;
        }

        .buttons-group {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 48px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #f8b62c, #e09f1a);
            color: #0b0b0b;
            font-weight: 700;
            padding: 14px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(248, 182, 44, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(248, 182, 44, 0.45);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.05);
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.15);
            font-weight: 600;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            font-size: 16px;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        /* Sección de enlaces sugeridos */
        .suggestions {
            max-width: 820px;
            width: 100%;
            margin-top: 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 36px;
        }

        .suggestions-title {
            color: #64748b;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .suggestions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 14px;
        }

        .suggestion-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            padding: 16px;
            border-radius: 12px;
            text-decoration: none;
            color: #cbd5e1;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .suggestion-card:hover {
            background: rgba(248, 182, 44, 0.08);
            border-color: rgba(248, 182, 44, 0.3);
            color: #f8b62c;
            transform: translateY(-2px);
        }

        footer {
            position: relative;
            z-index: 5;
            padding: 24px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            color: #64748b;
            font-size: 13px;
        }

        footer a {
            color: #94a3b8;
            text-decoration: none;
        }

        footer a:hover {
            color: #f8b62c;
        }
    </style>
</head>

<body>
    <div class="ambient-glow"></div>

    <header>
        <a href="/" class="logo-link">
            <img src="/assets/img/lacasadelintercom_whitered.webp" alt="La Casa del Intercomunicador">
        </a>
        <a href="/contacto" class="header-btn">Cotizar o Soporte</a>
    </header>

    <main>
        <span class="badge">Error 404</span>
        <div class="error-code">404</div>
        <h1>Página no encontrada</h1>
        <p class="description">
            Lo sentimos, la página que buscas no existe, ha cambiado de nombre o fue removida. Te sugerimos regresar al inicio o explorar nuestras secciones principales.
        </p>

        <div class="buttons-group">
            <a href="/" class="btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Ir a la Página Principal
            </a>
            <a href="/intercomunicadores" class="btn-secondary">
                Ver Catálogo de Equipos
            </a>
            <a href="/contacto" class="btn-secondary">
                Contactar Asesor
            </a>
        </div>

        <div class="suggestions">
            <div class="suggestions-title">Secciones más visitadas</div>
            <div class="suggestions-grid">
                <a href="/intercomunicadores" class="suggestion-card">Intercomunicadores</a>
                <a href="/videoporteros" class="suggestion-card">Videoporteros IP</a>
                <a href="/alarma-contra-incendios" class="suggestion-card">Alarmas de Incendio</a>
                <a href="/sistema-de-alarma-contra-robo" class="suggestion-card">Alarmas de Robo</a>
                <a href="/sistema-de-cerco-electrico" class="suggestion-card">Cercos Eléctricos</a>
                <a href="/blog" class="suggestion-card">Blog y Consejos</a>
            </div>
        </div>
    </main>

    <footer>
        <p>© {{ date('Y') }} La Casa del Intercomunicador. Más de 28 años brindando seguridad en Lima, Perú. | <a href="/contacto">Contacto: +51 922 480 484</a></p>
    </footer>
</body>

</html>
