<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends BasicController
{
    public $reactView = 'Blog';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $categories = CategoryPost::select([
            DB::raw('DISTINCT(category_posts.id)'),
            'category_posts.name'
        ])
            ->join('posts', 'posts.category_id', 'category_posts.id')
            ->where('category_posts.visible', true)
            ->where('category_posts.status', true)
            ->get();
        return [
            'categories' => $categories
        ];
    }
}
