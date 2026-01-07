<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class IntercomunicatorController extends BasicController
{
    public $reactView = 'Intercomunicadores';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $generals = General::all();
        return [
            'generals' => $generals
        ];
    }
}
