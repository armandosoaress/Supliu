<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Faixa;

class DiscografiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discografia = Album::all();
        return view('discografia.index', compact('discografia'));
    }

    public function list()
    {



        $faixas = Faixa::all();
        $response = [];

        foreach ($faixas as $faixa) {
            $discografia = Album::find($faixa->album_id);

            // Verifica se o álbum já existe no array $response
            $albumExistente = array_filter($response, function ($album) use ($discografia) {
                return $album['id'] == $discografia->id;
            });

            if (empty($albumExistente)) {
                // Álbum não existe, adiciona-o ao array $response
                $response[] = [
                    'id' => $discografia->id,
                    'nome' => $discografia->nome,
                    'ano' => $discografia->ano,
                    'capa' => $discografia->capa,
                    'faixas' => [
                        [
                            'id' => $faixa->id,
                            'nome' => $faixa->nome,
                            'duracao' => $faixa->duracao
                        ]
                    ]
                ];
            } else {
                // Álbum existe, adiciona apenas a nova faixa ao array de faixas desse álbum
                $albumIndex = key($albumExistente);
                $response[$albumIndex]['faixas'][] = [
                    'id' => $faixa->id,
                    'nome' => $faixa->nome,
                    'duracao' => $faixa->duracao
                ];
            }
        }

        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createalbum(Request $request)
    {

        $request->validate([
            'nome' => 'required',
        ]);

        try {
            $album = new Album();
            $album->nome = $request->nome;
            $album->save();
            return response()->json([
                'message' => 'sucess',
                'cad' => $album
            ]);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function createfaixa(Request $request)
    {

        $request->validate([
            'nome' => 'required',
            'id' => 'required',
            'duracao' => 'required',
        ]);

        try {
            $album = new Faixa();
            $album->nome = $request->nome;
            $album->album_id = $request->id;
            $album->duracao = $request->duracao;
            $album->save();
            return response()->json([
                'message' => 'sucess',
                'cad' => $album
            ]);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */

    public function listalbums()
    {
        $albums = Album::all();
        return response()->json($albums);
    }
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
