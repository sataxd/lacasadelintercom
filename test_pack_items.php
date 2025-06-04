<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Item;
use App\Models\Sale;

echo "=== PROBANDO SISTEMA DE PACKS ===\n\n";

// 1. Crear un item de prueba con pack_items
echo "1. Creando item de prueba con pack_items...\n";
$testItem = new Item();
$testItem->pack_items = [
    ['id' => 'uuid-1', 'name' => 'Shampoo Hidratante'],
    ['id' => 'uuid-2', 'name' => 'Acondicionador Reparador'],
    ['id' => 'uuid-3', 'name' => 'Mascarilla Nutritiva']
];

echo "✓ Pack items creados:\n";
foreach ($testItem->pack_items as $item) {
    echo "  - {$item['name']}\n";
}

// 2. Probar método isPack()
echo "\n2. Probando método isPack()...\n";
echo "¿Es pack? " . ($testItem->isPack() ? "Sí" : "No") . "\n";

// 3. Probar método getPackItems()
echo "\n3. Probando método getPackItems()...\n";
$packItems = $testItem->getPackItems();
echo "Items en el pack:\n";
foreach ($packItems as $item) {
    echo "  - ID: {$item['id']}, Nombre: {$item['name']}\n";
}

// 4. Probar método getPackItemsDisplay()
echo "\n4. Probando método getPackItemsDisplay()...\n";
echo "Display: " . $testItem->getPackItemsDisplay() . "\n";

// 5. Verificar formato para WhatsApp
echo "\n5. Simulando formato WhatsApp...\n";
$productos = '';
$mockDetail = (object)[
    'name' => 'Pack Cuidado Completo',
    'size' => 'M',
    'color' => 'Azul',
    'item' => $testItem
];

if ($mockDetail->item && $mockDetail->item->isPack()) {
    $packTitle = "+ *PACK: {$mockDetail->name}*";
    
    // Agregar talla y color al pack si los tiene
    if ($mockDetail->size || $mockDetail->color) {
        $packTitle .= ' (';
        if ($mockDetail->size) $packTitle .= 'Talla ' . strtoupper($mockDetail->size);
        if ($mockDetail->size && $mockDetail->color) $packTitle .= ' - ';
        if ($mockDetail->color) $packTitle .= 'Color ' . strtoupper($mockDetail->color);
        $packTitle .= ')';
    }
    
    $productos .= $packTitle . "\n";
    
    $packItemsData = $mockDetail->item->pack_items;
    if ($packItemsData && is_array($packItemsData)) {
        foreach ($packItemsData as $packItem) {
            if (is_array($packItem) && isset($packItem['name'])) {
                $productos .= "  - *{$packItem['name']}*\n";
            }
        }
    }
}

echo "Resultado WhatsApp:\n";
echo $productos;

echo "\n=== PRUEBA COMPLETADA ===\n";
