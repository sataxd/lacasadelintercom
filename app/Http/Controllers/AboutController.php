<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\General;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\Strength;
use App\Models\Testimony;
use Illuminate\Http\Request;

class AboutController extends BasicController
{
    public $reactView = 'About';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();
        $strengths = Strength::where('status', true)->where('visible', true)->get();
        $dataAbout = Aboutus::all();
        $posts = InstagramPost::all();
        $indicators = Indicator::all();

        return [
            'testimonies' => $testimonies,
            'dataAbout' => $dataAbout,
            'strengths' => $strengths,
            'posts' => $posts,
            'indicators' => $indicators,
        ];
    }
}
