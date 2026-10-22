<?php

namespace App\Http\Controllers;

use App\Http\Classes\dxResponse;
use App\Models\Aboutus;
use App\Models\dxDataGrid;
use App\Models\General;
use App\Models\Slider;
use App\Models\Social;
use App\Traits\TrackingPixelsTrait;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;


class BasicController extends Controller
{
  use TrackingPixelsTrait;
  
  public $model = Model::class;
  public $softDeletion = true;
  public $reactView = 'Home';
  public $reactRootView = 'admin';
  public $imageFields = [];
  public $prefix4filter = null;
  public $throwMediaError = false;
  public $reactData = null;
  public $with4get = [];

  public function get(Request $request, string $id)
  {
    $response = Response::simpleTryCatch(function () use ($id) {
      $jpa  = $this->model::with($this->with4get)->find($id);
      if (!$jpa) throw new Exception('El pedido que buscas no existe');
      return $jpa;
    });
    return \response($response->toArray(), $response->status);
  }

  public function media(Request $request, string $uuid)
  {
    try {
      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      if ($snake_case === 'item_image' || $snake_case === 'item_color') {
        $snake_case = 'item';
      }
      //dump($snake_case);
      if (Text::has($uuid, '.')) {
        $route = "images/{$snake_case}/{$uuid}";
      } else {
        $route = "images/{$snake_case}/{$uuid}.img";
      }
      $content = Storage::get($route);
      if (!$content) throw new Exception('Imagen no encontrado');

      $ext = strtolower(pathinfo($route, PATHINFO_EXTENSION));
      $mimeTypes = [
        'webp' => 'image/webp',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif'  => 'image/gif',
        'svg'  => 'image/svg+xml',
        'jfif' => 'image/jpeg',
        'mp4'  => 'video/mp4',
        'webm' => 'video/webm',
        'pdf'  => 'application/pdf',
      ];
      $contentType = $mimeTypes[$ext] ?? 'application/octet-stream';
      $etag = md5($content);

      if ($request->header('If-None-Match') === $etag) {
        return response('', 304);
      }

      return response($content, 200, [
        'Content-Type'  => $contentType,
        'Cache-Control' => 'public, max-age=31536000, immutable',
        'ETag'          => $etag,
      ]);
    } catch (\Throwable $th) {
      if ($this->throwMediaError) return null;
      $content = Storage::get('utils/cover-404.svg');
      return response($content, 404, [
        'Content-Type'  => 'image/svg+xml',
        'Cache-Control' => 'no-cache, private',
      ]);
    }
  }

  public function setPaginationInstance(string $model)
  {
    return $model::select();
  }

  public function setPaginationSummary(Request $request, Builder $builder)
  {
    return [];
  }

  public function setReactViewProperties(Request $request)
  {
    return [];
  }

  public function reactView(Request $request)
  {

    if (Auth::check()) Auth::user()->getAllPermissions();

    // Obtener píxeles de seguimiento de la base de datos usando trait
    $trackingPixels = $this->getTrackingPixels();

    $properties = [
      'session' => Auth::user(),
      'global' => array_merge([
        'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
        'WA_URL' => env('WA_URL'),
        'APP_NAME' => env('APP_NAME', 'La Casa del Intercomunicador'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_CORRELATIVE' => env('APP_CORRELATIVE'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
        'GMAPS_API_KEY' => env('GMAPS_API_KEY')
      ], $trackingPixels),
    ];
    $reactViewProperties = $this->setReactViewProperties($request);
    if (\is_array($reactViewProperties)) {
      foreach ($reactViewProperties as $key => $value) {
        $properties[$key] = $value;
      }
    } else {
      return $reactViewProperties;
    }

    // Resolver SEO contextual automático para cada vista pública si no fue provisto
    if (empty($properties['seo_title'])) {
      $seoResolved = $this->resolveContextualSeo($request, $properties);
      $properties = array_merge($properties, $seoResolved);
    }

    return Inertia::render($this->reactView, $properties)
      ->rootView($this->reactRootView)
      ->withViewData('data', $this->reactData ?? []);
  }

  protected function resolveContextualSeo(Request $request, array $properties): array
  {
    $brandSuffix = ' | La Casa del Intercomunicador';
    $viewName = $this->reactView;
    $title = null;
    $description = null;
    $image = null;
    $type = 'website';

    if ($viewName === 'Home') {
      $title = 'La Casa del Intercomunicador | Sistemas de Seguridad y Comunicación en Lima';
      $description = 'Más de 28 años brindando soluciones de seguridad: venta, instalación y mantenimiento de intercomunicadores, videoporteros, alarmas y cercos eléctricos en Lima.';
      $image = asset('assets/img/casadelintercom_nosotros_1.webp');
    } elseif ($viewName === 'About') {
      $title = 'Nosotros' . $brandSuffix;
      $description = 'Conoce la trayectoria de La Casa del Intercomunicador. Más de 28 años de experiencia e innovación en seguridad electrónica en Perú.';
      $image = asset('assets/img/casadelintercom_nosotros_1.webp');
    } elseif ($viewName === 'Contact') {
      $title = 'Contacto y Cotizaciones' . $brandSuffix;
      $description = 'Comunícate con nuestros asesores comerciales para cotizar la instalación o mantenimiento de sistemas de seguridad en Lima. Atención inmediata.';
      $image = asset('assets/img/casadelintercom_nosotros_1.webp');
    } elseif ($viewName === 'Services') {
      $service = $properties['servicios'] ?? null;
      if ($service) {
        $title = $service->name . $brandSuffix;
        $description = !empty($service->description) ? Str::limit(strip_tags($service->description), 155) : 'Servicio técnico especializado en seguridad electrónica en Lima.';
        if (!empty($service->image)) {
          $image = url("/api/services/media/{$service->image}");
        }
      }
    } elseif ($viewName === 'Intercomunicadores') {
      $title = 'Sistemas de Intercomunicadores para Edificios y Residencias' . $brandSuffix;
      $description = 'Venta, instalación y mantenimiento de intercomunicadores analógicos y digitales multimarca (Commax, BTicino, iTower) para condominios y casas.';
      $image = asset('assets/img/cat_intercomunicador.webp');
    } elseif ($viewName === 'Videoporteros') {
      $title = 'Sistemas de Videoporteros IP y Smart' . $brandSuffix;
      $description = 'Videoporteros con pantalla táctil, visión nocturna y apertura remota desde smartphone. Instalación garantizada en Lima.';
      $image = asset('assets/img/cat_videoporteros.webp');
    } elseif ($viewName === 'AlarmaIncendios') {
      $title = 'Sistemas de Alarma Contra Incendios Normadas' . $brandSuffix;
      $description = 'Detectores de humo, estaciones manuales, sirenas estroboscópicas y paneles certificados para cumplimiento de normativas de Defensa Civil.';
      $image = asset('assets/img/cat_incendio.webp');
    } elseif ($viewName === 'AlarmaRobos') {
      $title = 'Sistemas de Alarma Contra Robo e Intrusión' . $brandSuffix;
      $description = 'Sensores de movimiento, barreras infrarrojas y centrales de alarma cableadas e inalámbricas para proteger su inmueble.';
      $image = asset('assets/img/cat_alarmacontrarobo.webp');
    } elseif ($viewName === 'Hospitalario') {
      $title = 'Sistemas de Intercomunicador Hospitalario y Llamado de Enfermería' . $brandSuffix;
      $description = 'Soluciones de comunicación para clínicas y hospitales. Pulsadores de cama, señalización lumínica y central de monitoreo.';
      $image = asset('assets/img/cat_hospitalario.webp');
    } elseif ($viewName === 'CercoElectrico') {
      $title = 'Sistemas de Cerco Eléctrico Perimétrico de Alta Seguridad' . $brandSuffix;
      $description = 'Instalación de cercos eléctricos perimétricos homologados con batería de respaldo y sirena de alta potencia en Lima.';
      $image = asset('assets/img/cat_cercoelectrico.webp');
    } elseif ($viewName === 'Blog') {
      $title = 'Blog de Seguridad Electrónica y Consejos Técnicos' . $brandSuffix;
      $description = 'Artículos, guías y novedades sobre tecnología en seguridad, videoporteros, normativas contra incendios y mantenimiento preventivo.';
      $image = asset('assets/img/casadelintercom_nosotros_1.webp');
    } elseif ($viewName === 'BlogArticle') {
      $article = $properties['article'] ?? null;
      if ($article) {
        $title = !empty($article->meta_title) ? $article->meta_title : ($article->name . $brandSuffix);
        $description = !empty($article->meta_description) ? $article->meta_description : (!empty($article->summary) ? Str::limit(strip_tags($article->summary), 155) : (!empty($article->description) ? Str::limit(strip_tags($article->description), 155) : 'Artículo informativo de seguridad electrónica.'));
        if (!empty($article->image)) {
          $image = url("/api/posts/media/{$article->image}");
        }
        $type = 'article';
        if (!empty($article->meta_keywords)) {
          $keywords = $article->meta_keywords;
        }
      }
    } elseif ($viewName === 'FAQs') {
      $title = 'Preguntas Frecuentes' . $brandSuffix;
      $description = 'Respuestas y asesoría sobre dudas frecuentes en instalación, soporte técnico, garantías y mantenimiento de intercomunicadores y videoporteros.';
      $image = asset('assets/img/casadelintercom_nosotros_1.webp');
    }

    $result = [];
    if ($title) $result['seo_title'] = $title;
    if ($description) $result['seo_description'] = $description;
    if ($image) $result['seo_image'] = $image;
    if (!empty($keywords)) $result['seo_keywords'] = $keywords;
    $result['og_type'] = $type;

    return $result;
  }

  public function paginate(Request $request): HttpResponse|ResponseFactory
  {
    $response = new dxResponse();
    try {

      //$instance = $this->setPaginationInstance($this->model);
      // Obtener los with desde el request (si no se envían, será un array vacío)
      $withRelations = $request->has('with') ? explode(',', $request->with) : [];

      // Aplicar with dinámicamente
      $instance = $this->setPaginationInstance($this->model)->with($withRelations);

      if ($request->group != null) {
        [$grouping] = $request->group;
        $selector = $grouping['selector'];
        if ($this->prefix4filter && !str_contains($selector, '.')) {
          $selector = $this->prefix4filter . '.' . $selector;
        }
        $instance = $instance->select([
          DB::raw("{$selector} AS 'key'")
        ])
          ->groupBy($selector);
      }

      if (Auth::check()) {
        $table = $this->prefix4filter ? $this->prefix4filter : (new $this->model)->getTable();
        if (Schema::hasColumn($table, 'status')) {
          $instance->whereNotNull($this->prefix4filter ? $this->prefix4filter . '.status' : 'status');
        }
      }

      if ($request->filter) {
        $instance->where(function ($query) use ($request) {
          dxDataGrid::filter($query, $request->filter ?? [], false, $this->prefix4filter);
        });
      }


      if ($request->group == null) {
        if ($request->sort != null) {
          foreach ($request->sort as $sorting) {
            $selector = $sorting['selector'];
            $instance->orderBy(
              $selector,
              $sorting['desc'] ? 'DESC' : 'ASC'
            );
          }
        } else { //MEJORAR IMPLMENTAR ASC O DESC DESDE EL REST, PARA MEJORARLO LA INTERACTIVIDAD CON OTRAS TABLAS
          $instance->orderBy($this->prefix4filter ? $this->prefix4filter . '.id' : 'id', 'ASC');
        }
      }

      $totalCount = 0;
      if ($request->requireTotalCount) {
        $instance4count = clone $instance;
        $instance4count->getQuery()->groups = null;
        if ($request->group != null) {
          // When grouping, count distinct groups
          $totalCount = $instance4count->distinct()->count(DB::raw($selector));
        } else {
          // When not grouping, use the original count logic
          if ($this->prefix4filter) {
            $totalCount = $instance4count->distinct()->count($this->prefix4filter . '.id');
          } else {
            $totalCount = $instance4count->distinct()->count('id');
          }
        }
      }

      $jpas = $request->isLoadingAll
        ? $instance->get()
        : $instance
        ->skip($request->skip ?? 0)
        ->take($request->take ?? 10)
        ->get();

      $response->status = 200;
      $response->message = 'Operación correcta';
      $response->data = $jpas;
      $response->summary = $this->setPaginationSummary($request, $instance);
      $response->totalCount = $totalCount;
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage() . ' Ln.' . $th->getLine();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function beforeSave(Request $request)
  {
    return $request->all();
  }

  public function save(Request $request): HttpResponse|ResponseFactory
  {

    $response = new Response();
    try {

      $body = $this->beforeSave($request);
    

      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      
      if ($snake_case === "item_image" || $snake_case === "item_color" || $snake_case === "item_zise") {
        $snake_case = 'item';
      }

      foreach ($this->imageFields as $field) {
        
        if (!$request->hasFile($field)) continue;
        $full = $request->file($field);
        $uuid = Crypto::randomUUID();
        $ext = $full->getClientOriginalExtension();
        $path = "images/{$snake_case}/{$uuid}.{$ext}";
        Storage::put($path, file_get_contents($full));
        $body[$field] = "{$uuid}.{$ext}";
      }

      $jpa = $this->model::find(isset($body['id']) ? $body['id'] : null);

      $table = (new $this->model)->getTable();
      if (Schema::hasColumn($table, 'slug')) {
        $slugBase = !empty($body['slug']) ? Str::slug($body['slug']) : Str::slug($body['name'] ?? 'item');
        if (empty($slugBase)) {
          $slugBase = Crypto::randomUUID();
        }
        $body['slug'] = $slugBase;
      }

      if (!$jpa) {
        $jpa = $this->model::create($body);
      } else {
        $jpa->update($body);
      }

      if (Schema::hasColumn($table, 'slug')) {
        $slug = !empty($body['slug']) ? Str::slug($body['slug']) : Str::slug($jpa->name ?? 'item');
        $slugExists = $this->model::where('slug', $slug)->where('id', '<>', $jpa->id)->exists();
        if ($slugExists) {
          $slug = $slug . '-' . Crypto::short();
        }
        $jpa->update(['slug' => $slug]);
      }

      $isNew = !isset($body['id']) || !$this->model::find($body['id']);
      $data = $this->afterSave($request, $jpa, $isNew);
      if ($data) {
        $response->data = $data;
      }
      //dump("esto es la data:", $data, "y el response", $response);
      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      // dump($th->getMessage());
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function afterSave(Request $request, object $jpa)
  {
    return null;
  }

  public function status(Request $request)
  {
    $response = new Response();
    try {
      $this->model::where('id', $request->id)
        ->update([
          'status' => $request->status ? 0 : 1
        ]);

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function boolean(Request $request)
  {
    $response = new Response();
    try {
      $data = [];
      $data[$request->field] = $request->value;

      $this->model::where('id', $request->id)
        ->update($data);

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function delete(Request $request, string $id)
  {
    $response = new Response();
    try {
      $deleted =  $this->model::where('id', $id)
        ->delete();
      

      if (!$deleted) throw new Exception('No se ha eliminado ningun registro');

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }
}
