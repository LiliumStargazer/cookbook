import NavBar from "@/shared/components/navbar.jsx";
import { useCurrentUser } from "@/shared/hooks/use-current-user.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useState } from "react";

export default function ProfilePage(){
    const { user, userName, email, isAuthenticated } = useCurrentUser();

    // State per il form
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        username: user?.username || '',
        bio: user?.bio || ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // TODO: Implementare salvataggio dati utente
        console.log('Salvataggio dati:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Ripristina i dati originali
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            username: user?.username || '',
            bio: user?.bio || ''
        });
        setIsEditing(false);
    };

    if (!isAuthenticated) {
        return (
            <div>
                <NavBar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold mb-4">Accesso richiesto</h1>
                    <p className="text-lg">Devi essere loggato per vedere il profilo.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Avatar className="w-24 h-24 border-4 border-primary">
                                    <AvatarImage src="https://github.com/evilrabbit.png" alt={userName} />
                                    <AvatarFallback className="text-2xl">
                                        {userName?.[0]?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="text-2xl">Il mio Profilo</CardTitle>
                            <CardDescription>
                                Gestisci le informazioni del tuo account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Il tuo username"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="La tua email"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Piatti preferiti</Label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="test hotreload: I tuoi piatti preferiti"
                                        rows={3}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                {!isEditing ? (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full"
                                    >
                                        Modifica Profilo
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleSave}
                                            className="flex-1"
                                        >
                                            Salva Modifiche
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="flex-1"
                                        >
                                            Annulla
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}