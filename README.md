# Digesto AI – Landing + Chat Assist

Progetto basato sul template open source di [Cruip](https://github.com/cruip/open-react-template) e adattato per **Digesto AI**, startup legal-tech che integra un assistente conversazionale collegato a un backend esistente.

## Requisiti

- Node.js 18+
- npm (o pnpm / yarn)

## Setup locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:3000` per vedere l'app.

## Configurazione delle API

| Variabile | Descrizione |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL pubblico dell'endpoint `/chat` del backend. Imposta `https://api.miodominio.tld` per la chiamata diretta oppure `/api/chat` per usare il proxy lato Next.js. |
| `BACKEND_URL` | URL privato usato dal proxy server-side (`/api/chat`). Non viene mai esposto al client. |

### Modalità disponibili

1. **Mock** (default): se `NEXT_PUBLIC_API_URL` è vuota, il componente `ChatAssist` entra in modalità demo, mostra il badge *“Modalità demo”* e risponde dopo ~600 ms con un testo fittizio.
2. **Chiamata diretta**: imposta `NEXT_PUBLIC_API_URL=https://api.miodominio.tld`; la richiesta POST include `{ message, history }`.
3. **Proxy sicuro**: imposta `NEXT_PUBLIC_API_URL=/api/chat` e `BACKEND_URL=https://api.miodominio.tld`; il proxy inoltra la chiamata replicando l'header `Authorization` se presente.

> Se il backend restituisce un campo diverso da `answer`, modifica la costante `ANSWER_FIELD` in `app/components/ChatAssist.tsx`.

## Gestione dei contenuti

TUTTI i testi visibili (hero, chat, CTA, footer, ecc.) sono centralizzati in `content/digesto-ai.ts` e tipizzati tramite `content/schema.ts`. Per aggiornare i copy:

1. Apri `content/digesto-ai.ts`.
2. Modifica le stringhe (titoli, CTA, testimonial, disclaimer…).
3. Salva: nessun componente necessita di modifiche.

Per verificare eventuali stringhe hard-coded residue puoi usare:

```bash
rg '"[A-Z][^\n]*"' --glob '!content/digesto-ai.ts'
```

## Componenti principali

- `app/components/ChatAssist.tsx`: client component con history in memoria, placeholder *“Sto pensando…”*, gestione errori (`Errore backend: …` e `Errore di rete/CORS…`) e TODO per futura modalità streaming SSE.
- `content/digesto-ai.ts`: singola fonte di verità per brand, navigazione, sezioni, disclaimer.
- `app/api/chat/route.ts`: proxy opzionale che inoltra la POST al backend configurato tramite `BACKEND_URL`.

## Deploy su Vercel

1. Collega il repository su Vercel.
2. Imposta le environment variables per Production e Preview:
   - `NEXT_PUBLIC_API_URL`
   - (opzionale) `BACKEND_URL`
3. Esegui il deploy (`vercel --prod` o tramite dashboard).

## Troubleshooting

- **CORS / mixed content**: usa il proxy `/api/chat` o abilita i domini permessi sul backend.
- **401 / 403**: verifica token/API key inviati dal client o dal proxy.
- **404**: controlla il path dell'endpoint (`/chat`).
- **500**: inspecta i log del backend; il componente mostra i primi 300 caratteri della risposta per debug rapido.
- **Campo di risposta diverso**: aggiorna `ANSWER_FIELD` in `ChatAssist`.

## Credits

- Template originale: [Cruip – Open React Template](https://github.com/cruip/open-react-template)
- UI animazioni: [AOS](https://michalsnik.github.io/aos/)
- Hosting consigliato: [Vercel](https://vercel.com/)
