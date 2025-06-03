<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\Sale;
use Illuminate\Support\Facades\View;
use SoDe\Extend\Fetch;
use SoDe\Extend\Text;

class WhatsAppController extends Controller
{
    static function sendSale(Sale $sale, bool $send2client = true, bool $send2group = true)
    {
        try {
            $jpa  = Sale::with([
                'status',
                'details',
                'details.item',
                'coupon'
            ])->find($sale->id);

            $data =  [
                'sale' => $jpa
            ];
            $content = View::make('mailing.sale-done-wefem', $data)->render();
            $onlyName = \explode(' ', $sale->name)[0];

            // Construir lista de productos
            $productos = '';
            foreach ($jpa->details as $detail) {
                $linea = '+ ' . $detail->name;
                if ($detail->size || $detail->color) {
                    $linea .= ' ';
                    if ($detail->size) $linea .= strtoupper($detail->size);
                    if ($detail->color) $linea .= ' ' . strtoupper($detail->color);
                }
                $productos .= $linea . "\n";
            }

            // Monto y método de pago
            $monto = 'S/' . number_format($jpa->amount, 2) . ' CULQI';

            // Dirección y datos
            $isLima = ($jpa->department == 'Lima Metropolitana');
            $direccion = $jpa->address . ($jpa->number ? ' ' . $jpa->number : '');
            $referencia = $jpa->reference ? "\nReferencia: {$jpa->reference}" : '';
            $provincia = $isLima ? 'LIMA METROPOLITANA' : ($jpa->province ? strtoupper($jpa->province) : '') . ($jpa->department ? ' - ' . strtoupper($jpa->department) : '') . ' - SHALOM';

            $mensaje = "PEDIDO #{$jpa->code}. {$jpa->name} {$jpa->lastname}\n";
            $mensaje .= $productos . "\n";
            $mensaje .= $isLima
                ? ("LIMA METROPOLITANA  $referencia\nDNI: {$jpa->dni}\nDirección: $direccion\nCorreo: {$jpa->email}\nCelular: {$jpa->phone}\n$monto")
                : ("PROVINCIA $provincia\nDNI: {$jpa->dni}\nDirección: $direccion\n" . ($jpa->district ? $jpa->district . "\n" : '') . ($jpa->department ? strtoupper($jpa->department) . "\n" : '') . "Correo: {$jpa->email}\nCelular: {$jpa->phone}\n$monto");

            try {
                if ($send2client) {
                    $phone = ltrim($sale->phone, '+');
                    new Fetch(env('WA_URL') . '/api/send', [
                        'method' => 'POST',
                        'headers' => [
                            'Content-Type' => 'application/json'
                        ],
                        'body' => [
                            'from' => env('APP_CORRELATIVE'),
                            'to' => [$phone],
                            'content' => $mensaje,
                            'html' => $content
                        ]
                    ]);
                    if ($sale->status_id == 'f13fa605-72dd-4729-beaa-ee14c9bbc47b') {
                        new Fetch(env('WA_URL') . '/api/send', [
                            'method' => 'POST',
                            'headers' => [
                                'Content-Type' => 'application/json'
                            ],
                            'body' => [
                                'from' => env('APP_CORRELATIVE'),
                                'to' => ['51' . Text::keep($sale->phone, '0123456789')],
                                'content' => 'Deseas realizar el pago por yape, plin o tarjeta?'
                            ]
                        ]);
                    }
                }
            } catch (\Throwable $th) {}
            try {
                if ($send2group)
                    new Fetch(env('WA_URL') . '/api/send', [
                        'method' => 'POST',
                        'headers' => [
                            'Content-Type' => 'application/json'
                        ],
                        'body' => [
                            'from' => env('APP_CORRELATIVE'),
                            'to' => [env('WAGROUP_VENTAS_ID')],
                            'content' => $mensaje,
                            'html' => $content
                        ]
                    ]);
            } catch (\Throwable $th) {}
        } catch (\Throwable $th) {
            dump($th->getMessage());
        }
    }
}
