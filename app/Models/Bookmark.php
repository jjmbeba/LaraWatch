<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookmark extends Model
{
    protected $fillable = [
        'record_id',
        'record_type'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
