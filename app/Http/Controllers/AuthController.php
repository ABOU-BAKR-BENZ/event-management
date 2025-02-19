<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\BaseController as BaseController;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AuthController extends BaseController
{
    public function signup(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user->assignRole($userRole);

        $success['access_token'] = $user->createToken('event-management' . $user->id)->accessToken;
        $success['user_name'] = $user->name;
        $success['user_role'] = $user->getRoleNames();
        return $this->sendResponse($success, 'User registered Successfully!');
    }



    public function login(LoginUserRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('event-management' . $user->id)->accessToken;
            $success['user_name'] = $user->name;
            $success['user_role'] = $user->getRoleNames();
            return $this->sendResponse($success, 'User Login Successfully!');
        } else {
            return $this->sendError('Unauthorised', ['The provided authentication information are invalid.'], 401);
        }
    }
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $user->token()->revoke();
        return $this->sendResponse([], 'Logged out successfully.', 200);
    }

    public function getAdminStat()
    {
        $user = Auth::user();
        if (!$user->hasRole('admin')) {
            return $this->sendError('Unauthorized', 403);
        }
        $allEvents = Event::count();
        $createdEvents = Event::where('user_id', $user->id)->count();
        $allUsers = User::count();

        $result = [
            'allEvents' => $allEvents,
            'createdEvents' => $createdEvents,
            'allUsers' => $allUsers,
        ];

        return $this->sendResponse($result, 'User statistics retrieved successfully');
    }
}
