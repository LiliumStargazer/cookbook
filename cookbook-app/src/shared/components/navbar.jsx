import { useNavigation } from "@/shared/hooks/use-navigation.js"
import {useNavigate} from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.jsx";
import React from "react";
import {useCurrentUser} from "@/shared/hooks/use-current-user.js";
import {AvatarImage, AvatarFallback, Avatar} from "@/components/ui/avatar.jsx";

export default function NavBar() {
    const { menuItems } = useNavigation()
    const navigate = useNavigate()
    const currentuser = useCurrentUser();
    console.log(currentuser);

    const handleNavigation = (to) => {
        navigate(to)
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
                    <Avatar
                        className="border-2 !border-primary"
                        type="button"
                        style={{ cursor: 'default', textDecoration: 'none' }}
                        onClick={() => handleNavigation('/profile')}
                    >
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div>

            </div>
        </nav>
    )
}
