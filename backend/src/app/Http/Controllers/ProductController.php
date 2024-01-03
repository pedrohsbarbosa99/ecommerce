<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\ProductCollection;

class ProductController extends Controller
{
    public function index()
    {
        return new ProductCollection(Product::all());
    }

    public function show($id)
    {
        return new ProductResource(Product::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $rules = [
            'name' => 'required|string|unique:product|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'reference_code' => 'integer',
            'stock_quantity' => 'required|integer',
            'weight' => 'required|numeric',
            'category_id' => 'required|integer',
        ];
        $validator = Validator::make($data, $rules);
        if ($validator->passes()) {
            $product = Product::create($data);
            return new ProductResource($product);  
        } else {
            $product = Product::where('name', $data["name"])->first();
            if ($product) {
                return response()->json(['error' => 'Produto Ja existe'], JsonResponse::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Payload Invalido'], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $rules = [
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric',
            'reference_code' => 'integer',
            'stock_quantity' => 'integer',
            'weight' => 'numeric',
        ];

        $validator = Validator::make($data, $rules);
        if ($validator->passes()) {
            $product = Product::findOrFail($id);
            $product->update($request->all());
            return new ProductResource($product);
        } else {
            return response()->json(['error' => 'Payload Invalido'], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();

        return response()->json(['message' => 'Produto excluído com sucesso']);
    }

    public function productsByCategory($category)
    {
        return new ProductCollection(Product::where('category_id', $category)->get());
    }
}
