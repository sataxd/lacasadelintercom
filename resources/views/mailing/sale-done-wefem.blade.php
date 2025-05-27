<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="background: #7B4EDB; font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 750px; margin: 40px auto; background: #7B4EDB; border-radius: 24px; padding: 0px 32px 40px; color: #fff;">
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                <td style="font-size: 22px; font-weight: 700; background: #fff; color: #7B4EDB; border-radius: 16px; padding: 8px 24px;">
                    Pedido: <span style="font-weight: 400;">{{ $sale->code }}</span>
                </td>
                <td align="right" style="vertical-align: middle;">
                    <img src="https://wefem.atalaya.pe/assets/img/logo.png" alt="wefem" style="height: 40px; display: block;">
                </td>
            </tr>
        </table>
        <!-- Datos cliente -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff; color: #7B4EDB; border-radius: 16px; padding: 0; margin-bottom: 24px;">
            <tr>
                <td style="padding: 24px;">
                    <div style="font-weight: 600; margin-bottom: 4px;">Nombre: <span style="font-weight: 400; color: #333;">{{ $sale->name }} {{ $sale->lastname }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Teléfono: <span style="font-weight: 400; color: #333;">{{ $sale->phone }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Correo: <span style="font-weight: 400; color: #333;">{{ $sale->email }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Dirección: <span style="font-weight: 400; color: #333;">{{ $sale->address }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Referencia: <span style="font-weight: 400; color: #333;">{{ $sale->reference }}</span></div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Comprobante: <span style="font-weight: 400; color: #333;">Boleta</span></div>
                </td>
            </tr>
        </table>
        <!-- Productos -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                @php $count = 0; @endphp
                @foreach ($sale->details as $detail)
                    @if ($count > 0 && $count % 4 == 0)
                        </tr><tr>
                    @endif
                    <td style="background: #fff; border-radius: 16px; width: 140px; padding: 12px; color: #7B4EDB; text-align: center; position: relative; vertical-align: top;">
                        @if ($detail->quantity > 1)
                            <span style="position: absolute; top: 8px; right: 12px; background: #7B4EDB; color: #fff; border-radius: 12px; padding: 2px 10px; font-size: 13px; font-weight: 600;">x{{ $detail->quantity }}</span>
                        @endif
                        <img src="https://wefem.atalaya.pe/api/items/media/{{ $detail->item->image }}" alt="{{ $detail->name }}" style="width: 100%; max-width: 110px; aspect-ratio: 1/1; object-fit: contain; border-radius: 8px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;">
                        <div style="font-weight: 700; font-size: 15px; margin-bottom: 2px;">{{ $detail->name }}</div>
                        @if ($detail->color)
                            <div style="font-size: 13px; color: #333; margin-bottom: 2px;">Talla {{ $detail->size }} - Color {{ $detail->color }}</div>
                        @endif
                    </td>
                    @php $count++; @endphp
                @endforeach
            </tr>
        </table>
        <div style="background: #fff; color: #7B4EDB; border-radius: 16px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
                <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">Status:
                    @if ($sale->status_id == 'f13fa605-72dd-4729-beaa-ee14c9bbc47b')
                        <span style="color: #FF9900; font-weight: 700;"> Pendiente de pago</span>
                    @else
                        <span style="color: #10c469; font-weight: 700;"> Pagado</span>
                    @endif
                </div>
                <div style="font-weight: 700; font-size: 16px;">Tipo de envío:
                    <span style="font-weight: 400; color: #333;">
                        @if ($sale->department == 'Lima Metropolitana')
                            Envío gratis Lima Metropolitana
                        @else
                            Envío por Shalom (pago en destino)
                        @endif
                    </span>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 15px; color: #333;">Subtotal: S/ {{ number_format($sale->amount * 0.82, 2) }}</div>
                <div style="font-size: 15px; color: #333;">IGV: S/ {{ number_format($sale->amount * 0.18, 2) }}</div>
                <div style="font-size: 18px; font-weight: 700; color: #7B4EDB;">Total: S/ {{ number_format($sale->amount, 2) }}</div>
            </div>
        </div>
    </div>
</body>
</html>
