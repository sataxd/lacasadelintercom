<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\Item;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $slider = Slider::where('status', true)->where('visible', true)->orderBy('updated_at', 'desc')->first();
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();
        $items = Item::where('featured', true)->where('visible', true)->where('status', true)->get();
        $supplies = Supply::where('status', true)->where('visible', true)->where('featured', true)->get();
        $popups = Ad::today();
        // $top_sale = Item::where('status', true)->where('visible', true)->where('featured', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->first();

        $top_sale = Item::where('status', true)
            ->where('visible', true)
            ->where('featured', true)
            ->with([
                'colors',
                'sizes',
                'variants' => function ($q) {
                    $q->where('stock', '>', 0)->with(['color', 'zise']);
                }
            ])
            ->orderBy('updated_at', 'DESC')
            ->first();

                // Si el item tiene un ad y ese ad tiene offer_item_id, traemos el producto de oferta
        if ($top_sale && $top_sale->ad && $top_sale->ad->offer_item_id) {
            $offerItem = Item::with([
                'colors',
                'sizes',
                'images',
                'variants' => function ($q) {
                    $q->where('stock', '>', 0)->with(['color', 'zise']);
                }
            ])->find($top_sale->ad->offer_item_id);
            // Adjuntamos el producto de oferta al ad
            $top_sale->ad->offer_item = $offerItem;
        }
        $new_product = Item::where('status', true)->where('visible', true)->where('is_new', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->first();
        $we_lovers = Testimony::all();
        $products_featured = Item::where('status', true)->where('visible', true)->where('featured', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->limit(12)->get();
        if (count($products_featured) < 4) {
            $original_count = count($products_featured);
            $needed = 4 - $original_count;

            for ($i = 0; $i < $needed; $i++) {
                // Duplicar elementos existentes (usando el índice original)
                $products_featured->push($products_featured[$i % $original_count]);
            }
        }
        $posts = InstagramPost::all();

        // dump($top_sale);
        return [
            'slider' => $slider,
            'testimonies' => $testimonies,
            'items' => $items,
            'supplies' => $supplies,
            'popups' => $popups,
            'top_sale' => $top_sale,
            'we_lovers' => $we_lovers,
            'products_featured' => $products_featured,
            'new_product' => $new_product,
            'posts' => $posts
        ];
    }
}
