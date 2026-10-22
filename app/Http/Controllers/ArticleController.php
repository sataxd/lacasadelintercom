<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class ArticleController extends BasicController
{
    public $reactView = 'BlogArticle';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $identifier = $request->articleId;
        if (!$identifier) return redirect()->route('Blog.jsx');

        // Buscar primero por slug, o en su defecto por ID
        $currentArticle = Post::with(['category', 'tags'])
            ->where('slug', $identifier)
            ->first();

        if (!$currentArticle) {
            $currentArticle = Post::with(['category', 'tags'])->find($identifier);
            // Si se accede por ID y existe un slug amigable, redirigir 301 permanentemente
            if ($currentArticle && !empty($currentArticle->slug)) {
                return redirect('/blog/' . $currentArticle->slug, 301);
            }
        }

        if (!$currentArticle) {
            return redirect()->route('Blog.jsx');
        }

        $nextArticle = Post::select(['name', 'id', 'slug'])
            ->where('post_date', '>', $currentArticle->post_date ?? now())
            ->orderBy('post_date', 'asc')
            ->first();

        $previousArticle = Post::select(['name', 'id', 'slug'])
            ->where('post_date', '<', $currentArticle->post_date ?? now())
            ->orderBy('post_date', 'desc')
            ->first();

        return [
            'previousArticle' => $previousArticle,
            'article' => $currentArticle,
            'nextArticle' => $nextArticle
        ];
    }
}
