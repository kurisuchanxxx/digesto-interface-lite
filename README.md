# Digesto AI – Interfaccia Lite

Repo dedicato alla versione "snella" di Digesto AI: una singola pagina full-screen con hero minimale, suggerimenti rapidi, chat stile app mobile e cronologia delle conversazioni. È pensata per demo veloci e test UX, mantenendo la stessa integrazione backend della landing completa.

## Requisiti

- Node.js 18+
- npm (o pnpm / yarn)

## Setup locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:3000` per vedere l'interfaccia Lite.

## Configurazione delle API

| Variabile | Descrizione |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL pubblico dell'endpoint `/chat` del backend. Imposta `https://api.miodominio.tld` per la chiamata diretta oppure `/api/chat` per usare il proxy lato Next.js. |
| `BACKEND_URL` | URL privato usato dal proxy server-side (`/api/chat`). Non viene mai esposto al client. |

### Modalità disponibili

1. **Mock** (default): se `NEXT_PUBLIC_API_URL` è vuota, la chat entra in modalità demo, mostra il badge *“Modalità demo”* e risponde dopo ~600 ms con un testo fittizio.
2. **Chiamata diretta**: imposta `NEXT_PUBLIC_API_URL=https://api.miodominio.tld`; la richiesta POST include `{ message, history }`.
3. **Proxy sicuro**: imposta `NEXT_PUBLIC_API_URL=/api/chat` e `BACKEND_URL=https://api.miodominio.tld`; il proxy inoltra la chiamata replicando l'header `Authorization` se presente.

> Se il backend restituisce un campo diverso da `answer`, modifica la costante `ANSWER_FIELD` in `app/components/LiteChatExperience.tsx`.

## Gestione dei contenuti

TUTTI i testi visibili (hero, prompt rapidi, messaggi di stato, disclaimer…) sono centralizzati in `content/digesto-ai.ts` e tipizzati tramite `content/schema.ts`. Per aggiornare i copy:

1. Apri `content/digesto-ai.ts`.
2. Modifica le stringhe nella sezione `lite` (titolo, sottotitolo, quick prompts, cronologia…).
3. Salva: l'interfaccia utilizzerà automaticamente i nuovi testi.

Per verificare eventuali stringhe hard-coded residue puoi usare:

```bash
rg '"[A-Z][^\n]*"' --glob '!content/digesto-ai.ts'
```

## Componenti principali

- `app/components/LiteChatExperience.tsx`: UI principale (hero + quick prompts + sezione chat + cronologia). Gestisce mock mode, badge demo, errore rete e archiviazione in-memory delle conversazioni.
- `app/components/ChatAssist.tsx`: componente legacy della landing completa (non montato in questa versione, ma tenuto per eventuali confronti/riuso).
- `content/digesto-ai.ts`: unica fonte di verità per brand e testi (landing classica + lite). Puoi rimuovere le sezioni non usate se vuoi alleggerire ulteriormente.
- `app/api/chat/route.ts`: proxy opzionale che inoltra la POST al backend configurato tramite `BACKEND_URL`.

## Deploy su Vercel

1. Collega **questo** repository (`digesto-interface-lite`) su Vercel.
2. Imposta le environment variables per Production e Preview:
   - `NEXT_PUBLIC_API_URL`
   - (opzionale) `BACKEND_URL`
3. Clicca **Deploy**. Dopo ~2 minuti l'URL sarà pronto.

Puoi assegnare un dominio dedicato (es. `lite.digesto.ai`) da Project → Settings → Domains.

## Troubleshooting

- **CORS / mixed content**: usa il proxy `/api/chat` o abilita i domini permessi sul backend.
- **401 / 403**: verifica token/API key inviati dal client o dal proxy.
- **404**: controlla il path dell'endpoint (`/chat`).
- **500**: inspecta i log del backend; il componente mostra i primi 300 caratteri della risposta per debug rapido.
- **Modalità demo sempre attiva**: assicurati che `NEXT_PUBLIC_API_URL` sia valorizzata e che l'URL risponda correttamente.

## Note

- Questo repo nasce come fork alleggerito: eventuali componenti/asset della landing sono ancora presenti ma non montati. Puoi rimuoverli in base alle esigenze del team.
- Se vuoi mantenere anche la landing estesa, usa il repo originale `Digesto-Interface`.

## Credits

- Template originale: [Cruip – Open React Template](https://github.com/cruip/open-react-template)
- Hosting consigliato: [Vercel](https://vercel.com/)
