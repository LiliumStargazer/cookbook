import { useNavigation } from "@/shared/hooks/use-navigation.js"
import {useNavigate} from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import React from "react";
import {AvatarImage, AvatarFallback, Avatar} from "@/components/ui/avatar.jsx";
import useAuth from "@/lib/store.js";

export default function NavBar() {
    const { menuItems } = useNavigation()
    const navigate = useNavigate()
    const { logout, userData } = useAuth()

    const handleNavigation = (to) => {
        navigate(to)
    }

    const handleLogout = () => {
        logout()
        navigate('/auth/login')
    }

    return (
        <nav className="w-full border-b-2 border-gray-200 shadow-b-sm">
            <div className="flex w-full justify-between items-center px-4 py-2">
                <div className="flex items-center gap-4">
                    <img src="/src/assets/recipe.png" alt="logo" style={{ maxHeight: 40 }} />
                    <h1 className="text-sm font-bold !color-back mt-2">
                        CookBook
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <NavigationMenu >
                        <NavigationMenuList className="flex gap-4 mt-4">
                            {menuItems.map((item, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        className="!text-primary hover:!text-primary focus:!text-primary font-medium !no-underline hover:!no-underline focus:!no-underline"
                                        onClick={() => handleNavigation(item.to)}
                                        style={{ cursor: 'default', textDecoration: 'none' }}
                                    >
                                        {item.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="border-2 !border-primary cursor-pointer hover:opacity-80">
                                <AvatarImage
                                    src="https://github.com/evilrabbit.png"
                                    alt={userData?.username}
                                />
                                <AvatarFallback>
                                    {userData?.username?.[0]?.toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                                Il mio Profilo
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}
