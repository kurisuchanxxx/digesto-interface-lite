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

- Apri `http://localhost:3000` per la landing completa
- Apri `http://localhost:3000/lite` per la variante minimale

## Configurazione delle API

| Variabile | Descrizione |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL pubblico dell'endpoint `/chat` del backend. Imposta `https://api.miodominio.tld` per la chiamata diretta oppure `/api/chat` per usare il proxy lato Next.js. |
| `BACKEND_URL` | URL privato usato dal proxy server-side (`/api/chat`). Non viene mai esposto al client. |

### Modalità disponibili

1. **Mock** (default): se `NEXT_PUBLIC_API_URL` è vuota, i componenti di chat entrano in modalità demo, mostrano il badge *“Modalità demo”* e rispondono dopo ~600 ms con un testo fittizio.
2. **Chiamata diretta**: imposta `NEXT_PUBLIC_API_URL=https://api.miodominio.tld`; la richiesta POST include `{ message, history }`.
3. **Proxy sicuro**: imposta `NEXT_PUBLIC_API_URL=/api/chat` e `BACKEND_URL=https://api.miodominio.tld`; il proxy inoltra la chiamata replicando l'header `Authorization` se presente.

> Se il backend restituisce un campo diverso da `answer`, modifica la costante `ANSWER_FIELD` in `app/components/ChatAssist.tsx` e `app/components/LiteChatExperience.tsx`.

## Gestione dei contenuti

TUTTI i testi visibili (hero, chat, CTA, footer, ecc.) sono centralizzati in `content/digesto-ai.ts` e tipizzati tramite `content/schema.ts`. Per aggiornare i copy:

1. Apri `content/digesto-ai.ts`.
2. Modifica le stringhe (titoli, CTA, testimonial, disclaimer, prompt rapidi della variante lite…).
3. Salva: nessun componente necessita di modifiche.

Per verificare eventuali stringhe hard-coded residue puoi usare:

```bash
rg '"[A-Z][^\n]*"' --glob '!content/digesto-ai.ts'
```

## Componenti principali

- `app/components/ChatAssist.tsx`: client component con history in memoria, placeholder *“Sto pensando…”*, gestione errori (`Errore backend: …` e `Errore di rete/CORS…`) e TODO per futura modalità streaming SSE.
- `app/components/LiteChatExperience.tsx`: interfaccia “lite” ispirata al design sperimentale (hero minimale, prompt rapidi, cronologia laterale). Riutilizza la stessa logica di fetch/mock.
- `content/digesto-ai.ts`: singola fonte di verità per brand, navigazione, sezioni, disclaimer **e testi dedicati alla variante lite**.
- `app/api/chat/route.ts`: proxy opzionale che inoltra la POST al backend configurato tramite `BACKEND_URL`.

## Varianti interfaccia

| Route | Descrizione |
| --- | --- |
| `/` | Landing completa basata sul template Cruip con sezioni marketing + `ChatAssist` integrato nella hero |
| `/lite` | Esperienza minimale “DigestoAI” con gradient hero, suggerimenti rapidi, cronologia e chat fullscreen |

Suggerimenti per il deploy su Vercel:

- **Un solo progetto**: deploya il branch `main` e ottieni entrambe le route sullo stesso dominio.
- **Due progetti separati**: crea un branch dedicato (es. `digesto-lite`) e collega un secondo progetto Vercel scegliendo quel branch come Production Branch. Puoi assegnare domini diversi (es. `lite.digesto.ai`). Ricorda di impostare le stesse variabili d'ambiente.

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
- **500**: inspecta i log del backend; i componenti mostrano i primi 300 caratteri della risposta per debug rapido.
- **Campo di risposta diverso**: aggiorna `ANSWER_FIELD` nei componenti di chat.
- **Modalità demo sempre attiva**: assicurati che `NEXT_PUBLIC_API_URL` sia valorizzata e che l'URL risponda correttamente.

## Credits

- Template originale: [Cruip – Open React Template](https://github.com/cruip/open-react-template)
- UI animazioni: [AOS](https://michalsnik.github.io/aos/)
- Hosting consigliato: [Vercel](https://vercel.com/)
