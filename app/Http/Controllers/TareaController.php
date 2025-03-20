<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    // Obtener todas las tareas
    public function index()
    {
        return response()->json(Tarea::all());
    }

    // Crear una nueva tarea
    public function store(Request $request)
    {
        $tarea = Tarea::create($request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'completado' => 'boolean'
        ]));

        $tarea = Tarea::create($request->all());

        return response()->json($tarea, 201);
    }

    // Mostrar una tarea específica
    public function show($id)
    {
        $tarea = Tarea::find($id);

        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        return response()->json($tarea, 200);
    }

    // Actualizar una tarea
    public function update(Request $request, Tarea $tarea)
    {
        $request->validate([
            'titulo' => 'sometimes|required|string|max:255', // Asegura que solo se valide si está presente
            'descripcion' => 'nullable|string',
            'completado' => 'required|boolean'
        ]);

        $tarea->update($request->all());

        return response()->json($tarea);
    }

    // Eliminar una tarea
    public function destroy($id)
    {
        $tarea = Tarea::find($id);

        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        $tarea->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente'], 200);
    }

}
