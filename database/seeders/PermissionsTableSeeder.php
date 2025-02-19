<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'api']);
        $userRole = Role::create(['name' => 'user', 'guard_name' => 'api']);

        $permissions = [
            ['name' => 'create_event', 'guard_name' => 'api'],
            ['name' => 'edit_event', 'guard_name' => 'api'],
            ['name' => 'delete_event', 'guard_name' => 'api'],
            ['name' => 'view_event', 'guard_name' => 'api'],
            ['name' => 'manage_users', 'guard_name' => 'api'],
            ['name' => 'manage_permissions', 'guard_name' => 'api'],
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission['name'], 'guard_name' => $permission['guard_name']]);
        }

        // Assign all permissions to admin role
        if ($adminRole) {
            $adminRole->syncPermissions(Permission::all());
        }
    }
}
