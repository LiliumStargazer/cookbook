import NavBar from "@/shared/components/navbar.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useProfile } from "@/features/profile/hooks/use-profile.js";

export default function ProfilePage(){
    const {
        user,
        formData,
        isEditing,
        handleInputChange,
        handleSave,
        handleCancel,
        startEditing
    } = useProfile();


    return (
        <div className="w-full">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Avatar className="w-24 h-24 border-4 !border-primary">
                                    <AvatarImage src="https://github.com/evilrabbit.png" alt={user.name} />
                                    <AvatarFallback className="text-2xl">
                                        {user.name?.[0]?.toUpperCase() || 'U'}
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
                                        value={formData.favoriteDishes}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="test hotreload: I tuoi piatti preferiti"
                                        style={{ resize: 'none' }}
                                        rows={6}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                {!isEditing ? (
                                    <Button
                                        onClick={startEditing}
                                        className="w-full"
                                        variant="destructive"
                                    >
                                        Modifica Profilo
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleSave}
                                            className="flex-1"
                                            variant="destructive"
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