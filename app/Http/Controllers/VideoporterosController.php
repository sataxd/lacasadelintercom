<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class VideoporterosController extends BasicController
{
    public $reactView = 'Videoporteros';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $generals = General::all();
        return [
            'generals' => $generals
        ];
    }
}
