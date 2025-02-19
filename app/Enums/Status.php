<?php


namespace App\Enums;

enum Status: string
{
    case LIVE = 'live';
    case DRAFT = 'draft';


    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
