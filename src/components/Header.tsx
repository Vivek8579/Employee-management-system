

          {/* User Menu or Login Prompt */}
          {user && adminProfile ? (
            <div className="flex items-center gap-2">
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 sm:h-10 w-auto px-1 sm:px-3 hover:bg-gray-800">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">{adminProfile.name}</p>
                        <p className="text-xs text-gray-400">{roleNames[adminProfile.role]}</p>
                      </div>
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-gray-600">
                        <AvatarImage 
                          src={adminProfile.avatar || undefined} 
                          alt={adminProfile.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gray-700 text-white text-xs">
                          {adminProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black border-gray-800 shadow-lg">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-white">{adminProfile.name}</p>
                    <p className="text-xs text-gray-400">{adminProfile.email}</p>
                    <p className="text-xs text-gray-400">{roleNames[adminProfile.role]}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="hover:bg-red-900 text-red-400 hover:text-red-300" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => window.location.href = '/login'} className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
