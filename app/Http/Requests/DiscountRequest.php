<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiscountRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        $rules = [];
        $rules['campaign_name'] = 'required|string|max:255';
        $rules['campaign_code'] = 'nullable|string|max:255';
        $rules['campaign_type'] = 'required|string';
        
        // Xác thực cho các quy tắc discount
        $rules['rules'] = 'required|array';
        foreach ($this->rules as $index => $rule) {
            $rules["rules.$index.buy_from"] = 'required|numeric';
            $rules["rules.$index.buy_to"] = 'required|numeric|gt:rules.' . $index . '.buy_from'; 
            $rules["rules.$index.discount_value"] = 'required|numeric';
            $rules["rules.$index.discount_type"] = 'required|string';
            $rules["rules.$index.discount_unit"] = 'required|string';
        }

        return $rules;
    }

    // protected function prepareForValidation()
    // {
    //     
    // }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $rules = $this->rules;

            
            for ($i = 0; $i < count($rules); $i++) {
                $currentBuyFrom = $rules[$i]['buy_from'];
                $currentBuyTo = $rules[$i]['buy_to'];

                for ($j = 0; $j < $i; $j++) {
                    $previousBuyFrom = $rules[$j]['buy_from'];
                    $previousBuyTo = $rules[$j]['buy_to'];

                  
                    if (($currentBuyFrom >= $previousBuyFrom && $currentBuyFrom <= $previousBuyTo) ||
                        ($currentBuyTo >= $previousBuyFrom && $currentBuyTo <= $previousBuyTo) ||
                        ($currentBuyFrom <= $previousBuyFrom && $currentBuyTo >= $previousBuyTo)) {
                        $validator->errors()->add("rules.$i", "The buy_from and buy_to values for rule $i cannot overlap with rule $j.");
                    }
                }
            }
        });
    }
}