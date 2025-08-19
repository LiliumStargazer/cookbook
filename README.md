# Cookbook

Cookbook è una piattaforma moderna per la gestione di ricette, recensioni e cookbook personali. Il progetto è composto da una API backend (Node.js/Express) e una web app frontend (React + Vite), con supporto a database MongoDB.

## Struttura del progetto

- **cookbook-api/**  
  Backend RESTful API per autenticazione, gestione ricette, recensioni e utenti.
- **cookbook-app/**  
  Frontend React con UI moderna, gestione cookbook, ricerca ricette, recensioni e dashboard utente.
- **data/**  
  Dati persistenti MongoDB (esclusi dal versionamento tramite `.gitignore`).

## Funzionalità principali

- Autenticazione utente (login, registrazione, profilo)
- Ricette: visualizzazione, aggiunta, modifica, rimozione
- Cookbook personale: aggiungi/rimuovi ricette preferite
- Recensioni: scrivi, modifica, elimina recensioni sulle ricette
- Statistiche: utenti attivi, ricette totali, recensioni totali
- Ricetta casuale, ricette più votate, ultime recensioni
- UI moderna e responsiva (Shadcn UI)

## Requisiti

- Node.js >= 18
- MongoDB
- Docker (opzionale, per sviluppo locale)

## Installazione

1. Clona il repository:
   ```
   git clone <repo-url>
   cd cookbook
   ```

2. Installa le dipendenze:
   ```
   cd cookbook-api && npm install
   cd ../cookbook-app && npm install
   ```

3. Avvia il backend:
   ```
   cd cookbook-api
   npm start
   ```

4. Avvia il frontend:
   ```
   cd ../cookbook-app
   npm run dev
   ```

5. (Opzionale) Avvia con Docker:
   ```
   docker-compose up
   ```

## Configurazione

- Modifica le variabili d'ambiente in `cookbook-api/.env` per la connessione a MongoDB e le chiavi segrete.
- Personalizza la UI in `cookbook-app/src/`.

## Struttura delle cartelle principali

- `cookbook-api/src/`  
  - `controllers/` - logica API
  - `models/` - modelli Mongoose
  - `routes/` - definizione endpoint
  - `middleware/` - autenticazione e validazione
- `cookbook-app/src/`  
  - `features/` - funzionalità modulari (auth, cookbook, recipe, reviews, ecc.)
  - `components/` - componenti UI riutilizzabili
  - `lib/` - utilities globali
  - `shared/` - hooks, servizi e componenti condivisi

## Contribuire

1. Forka il progetto
2. Crea un branch feature: `git checkout -b feature/nome-feature`
3. Fai commit e push delle modifiche
4. Apri una Pull Request

## Licenza

MIT

---

Se vuoi aggiungere dettagli specifici (API endpoints, screenshots, ecc.) fammi sapere!
