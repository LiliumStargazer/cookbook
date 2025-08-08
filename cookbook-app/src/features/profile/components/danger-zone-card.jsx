import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import DeleteAccountDialog from "./delete-account-dialog.jsx";

export default function DangerZoneCard({ onDeleteAccount, loading = false }) {
    return (
        <Card className="border-red-200 bg-red-50/50 mt-6">
            <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                    ⚠️ Zona Pericolosa
                </CardTitle>
                <CardDescription className="text-red-700">
                    Le azioni in questa sezione sono irreversibili
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="font-medium text-red-800 mb-2">Elimina Account</h4>
                        <p className="text-sm text-red-600 mb-4">
                            Eliminando il tuo account perderai definitivamente tutti i tuoi dati,
                            ricette salvate e recensioni. Questa azione non può essere annullata.
                        </p>
                        <DeleteAccountDialog onConfirm={onDeleteAccount} loading={loading}>
                            <Button
                                variant="destructive"
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Elimina Account Definitivamente
                            </Button>
                        </DeleteAccountDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
