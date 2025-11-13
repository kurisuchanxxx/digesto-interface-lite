# 🚀 Guida al Deploy di Digesto AI

Questa guida ti accompagna passo-passo per caricare Digesto AI su GitHub e deployarlo su Vercel.

---

## ✅ Prerequisiti

- Account GitHub ([github.com](https://github.com))
- Account Vercel ([vercel.com](https://vercel.com)) - puoi crearlo con GitHub
- Node.js installato (già verificato)

---

## 📦 STEP 1: Preparazione locale

### 1.1 Verifica che tutto sia pronto

```bash
cd "/Users/christian/Desktop/DIGESTO-AI"

# Verifica che il build funzioni
npm run build
```

Se il build va a buon fine, sei pronto! ✅

### 1.2 Inizializza Git (se non già fatto)

```bash
# Verifica lo stato
git status

# Se ci sono file non committati, aggiungili tutti
git add .

# Crea il commit iniziale
git commit -m "Initial commit: Digesto AI landing + chat component"
```

---

## 🐙 STEP 2: Crea repository su GitHub

1. Vai su [github.com](https://github.com) e accedi
2. Clicca su **"+"** in alto a destra → **"New repository"**
3. Compila:
   - **Repository name**: `digesto-ai` (o come preferisci)
   - **Description**: "Digesto AI - Legal tech landing page with chat assistant"
   - **Visibility**: Scegli Public o Private
   - ⚠️ **NON** spuntare "Add a README file" (hai già tutto)
4. Clicca **"Create repository"**

---

## 📤 STEP 3: Collega e pusha su GitHub

GitHub ti mostrerà le istruzioni. Esegui questi comandi:

```bash
cd "/Users/christian/Desktop/DIGESTO-AI"

# Se non hai già un remote, aggiungilo (sostituisci USERNAME con il tuo username GitHub)
git remote add origin https://github.com/USERNAME/digesto-ai.git

# Se il remote esiste già, verifica che sia corretto
git remote -v

# Pusha tutto su GitHub
git branch -M main
git push -u origin main
```

Inserisci le credenziali GitHub quando richiesto.

---

## 🌐 STEP 4: Deploy su Vercel

### 4.1 Importa il progetto

1. Vai su [vercel.com](https://vercel.com)
2. Accedi con il tuo account (puoi usare "Continue with GitHub")
3. Clicca **"Add New..."** → **"Project"**
4. Trova il repository `digesto-ai` e clicca **"Import"**

### 4.2 Configurazione progetto

Vercel rileverà automaticamente:
- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

**NON modificare nulla**, lascia tutto così com'è.

### 4.3 Environment Variables

⚠️ **IMPORTANTE**: Prima di cliccare "Deploy", vai su **"Environment Variables"** e aggiungi:

| Nome | Valore | Note |
|------|--------|------|
| `NEXT_PUBLIC_API_URL` | (lascia vuoto) | Lascia vuoto per modalità mock/demo. Oppure inserisci l'URL del tuo backend (es. `https://api.tuodominio.tld`) |
| `BACKEND_URL` | (opzionale) | Solo se usi il proxy `/api/chat`. URL privato del backend. |

**Per ora lascia `NEXT_PUBLIC_API_URL` vuoto** così funzionerà in modalità demo.

### 4.4 Deploy

1. Clicca **"Deploy"**
2. Aspetta 2-3 minuti mentre Vercel:
   - Installa le dipendenze
   - Esegue il build
   - Deploya l'applicazione
3. Al termine avrai un URL tipo: `digesto-ai-xxxxx.vercel.app`

🎉 **Fatto! Il sito è online!**

---

## 🔗 STEP 5: Dominio personalizzato (opzionale)

Se vuoi usare il tuo dominio (es. `digesto-ai.it`):

1. In Vercel → Il tuo progetto → **Settings** → **Domains**
2. Inserisci il tuo dominio (es. `digesto-ai.it`)
3. Vercel ti mostrerà le istruzioni DNS:
   - **Opzione A (CNAME)**: Aggiungi un record CNAME che punta a `cname.vercel-dns.com`
   - **Opzione B (Nameserver)**: Cambia i nameserver del dominio con quelli forniti da Vercel
4. Vercel rilascerà automaticamente il certificato SSL (HTTPS)

---

## 🔄 Modifiche future

### Aggiornare i contenuti

1. Modifica `content/digesto-ai.ts` con i nuovi testi
2. Committa e pusha:
   ```bash
   git add content/digesto-ai.ts
   git commit -m "Aggiornati testi Digesto AI"
   git push
   ```
3. Vercel rileverà automaticamente il push e farà un nuovo deploy (circa 2 minuti)

### Modificare il codice

Stesso processo: modifica, commit, push → Vercel redeploya automaticamente.

### Modificare Environment Variables

1. Vai su Vercel → Project → **Settings** → **Environment Variables**
2. Modifica i valori
3. Vercel farà un nuovo deploy automaticamente

---

## 🐛 Troubleshooting

### Build fallisce su Vercel

- Controlla i log in Vercel → Deployments → clicca sul deploy fallito
- Verifica che `npm run build` funzioni localmente
- Controlla che non ci siano errori TypeScript (`npm run lint`)

### Il sito non si aggiorna

- Verifica che il push su GitHub sia andato a buon fine
- Controlla che Vercel abbia rilevato il nuovo commit (Dashboard → Deployments)
- Se necessario, fai un redeploy manuale: Vercel → Deployments → "..." → "Redeploy"

### CORS errors

- Se chiami direttamente il backend, usa il proxy `/api/chat`
- Imposta `NEXT_PUBLIC_API_URL=/api/chat` e `BACKEND_URL=https://api.tuodominio.tld`

### Tailwind CSS non funziona

- Verifica che `postcss.config.js` e `tailwind.config.js` siano presenti
- Il build su Vercel include automaticamente Tailwind

---

## 📝 Note finali

- **Tailwind CSS**: Funziona perfettamente su Vercel, nessuna configurazione aggiuntiva necessaria
- **Environment Variables**: Puoi modificarle in qualsiasi momento senza toccare il codice
- **Deploy automatici**: Ogni push su `main` genera un nuovo deploy
- **Preview deployments**: Ogni branch/PR genera un URL di preview separato

---

## 🆘 Supporto

Se hai problemi:
1. Controlla i log in Vercel (Dashboard → Deployments)
2. Verifica che il build funzioni localmente (`npm run build`)
3. Controlla che tutte le variabili d'ambiente siano impostate correttamente

Buon deploy! 🚀

