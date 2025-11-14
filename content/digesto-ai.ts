import { ContentSchema } from "./schema";

export const content: ContentSchema = {
  brandName: "Digesto AI",
  siteTitle: "Digesto AI — Copilota conversazionale per studi legali",
  siteDescription:
    "Digesto AI automatizza il primo livello di risposta legale con un assistente conversazionale allenato sui tuoi documenti, procedure e clausole.",
  navigation: {
    mainLinks: [
      { label: "Soluzioni", href: "#soluzioni" },
      { label: "Integrazioni", href: "#integrazioni" },
      { label: "Risorse", href: "#risorse" },
    ],
    primaryAction: { label: "Accedi", href: "/signin" },
    secondaryAction: { label: "Crea account", href: "/signup" },
  },
  hero: {
    kicker: "Legal tech conversazionale",
    title: "Digesto AI riduce i tempi di risposta legale da giorni a minuti",
    subtitle:
      "Pianifica, condividi e controlla ogni parere con un assistente addestrato su policy, precedenti e clausolari. Più tempo per la strategia, meno attività ripetitive per il tuo team legale.",
    primaryCta: { label: "Avvia la demo", href: "#chat" },
    secondaryCta: { label: "Scarica la scheda prodotto", href: "#risorse" },
  },
  chat: {
    title: "Prova il copilota legale",
    subtitle:
      "Formula una richiesta e verifica come Digesto AI struttura risposte coerenti con i tuoi documenti di studio.",
    inputLabel: "Messaggio per Digesto AI",
    inputPlaceholder: "Scrivi qui la tua domanda legale o operativa…",
    sendButton: "Invia",
    thinkingLabel: "Sto pensando…",
    demoBadge: "Modalità demo",
    mockResponse:
      "Questo è un esempio di risposta di Digesto AI. Nella versione collegata al tuo backend l'assistente analizzerà atti, contratti e FAQ interne per fornirti passaggi successivi, riferimenti normativi e checklist operative.",
    disclaimer:
      "Strumento informativo. Non è consulenza legale. Per decisioni legali rivolgersi a un avvocato.",
    emptyState:
      "Nessun messaggio ancora. Chiedi a Digesto AI di sintetizzare un contratto o suggerire i documenti da preparare.",
    errorNetwork: "Errore di rete/CORS. Verifica endpoint e permessi.",
  },
  lite: {
    heroTitle: "DigestoAI",
    heroSubtitle:
      "Il tuo assistente intelligente per risposte rapide e approfondimenti",
    promptPlaceholder: "Chiedi qualcosa a DigestoAI…",
    quickActionsTitle: "Suggerimenti rapidi",
    quickPrompts: [
      { label: "Come funziona DigestoAI?", prompt: "Come funziona DigestoAI?" },
      { label: "Riassumi un articolo", prompt: "Riassumi un articolo" },
      { label: "Genera idee", prompt: "Genera idee per un'iniziativa legale" },
      {
        label: "Rispondi a una domanda",
        prompt: "Rispondi a una domanda sui contratti di fornitura",
      },
    ],
    historyTitle: "Cronologia conversazioni",
    historyEmpty:
      "Le chat salvate compariranno qui con titolo e numero di messaggi.",
    newConversationLabel: "Nuova conversazione",
    badgeLabel: "Modalità demo",
  },
  workflows: {
    kicker: "Flussi intelligenti",
    title: "Orchestra procedure e pareri in un'unica dashboard",
    description:
      "Automatizza il triage delle richieste, assegna priorità e mantieni traccia delle risposte approvate in studio.",
    items: [
      {
        tag: "Onboarding rapido",
        title: "Upload guidato di policy e clausole",
        description:
          "Indicizza fascicoli, contratti e FAQ interne per permettere a Digesto AI di rispondere in linea con il tuo modello di studio.",
      },
      {
        tag: "Routing smart",
        title: "Instrada le richieste delicate",
        description:
          "Imposta filtri che segnalano automaticamente le richieste che richiedono intervento umano o approvazione del partner.",
      },
      {
        tag: "Audit trail",
        title: "Log completo e versioning",
        description:
          "Ogni conversazione viene registrata con note interne, allegati e stato di approvazione per audit e conformità.",
      },
    ],
  },
  features: {
    kicker: "Funzionalità avanzate",
    title: "Pensato per uffici legali distribuiti",
    description:
      "Digesto AI si integra con i tuoi sistemi esistenti e ti aiuta a garantire governance, tracciabilità e collaborazione in tempo reale.",
    items: [
      {
        title: "Checklist dinamiche",
        description:
          "Trasforma i flussi ricorrenti in checklist intelligenti che l'assistente propone durante la conversazione.",
      },
      {
        title: "Controllo versioni",
        description:
          "Monitora modifiche e approvazioni sui documenti utilizzati per addestrare il modello conversazionale.",
      },
      {
        title: "Motore citazioni",
        description:
          "Ogni risposta include riferimenti normativi e link diretti alla fonte originale per una verifica immediata.",
      },
      {
        title: "Canali dedicati",
        description:
          "Crea spazi protetti per dipartimenti HR, compliance o procurement, con dataset e policy dedicate.",
      },
      {
        title: "Ruoli e permessi",
        description:
          "Gestisci accessi granulari con Single Sign-On e audit log centralizzato.",
      },
      {
        title: "Monitoraggio qualità",
        description:
          "Analizza metriche di utilizzo, feedback e tasso di escalation per migliorare continuamente la base conoscitiva.",
      },
    ],
  },
  testimonials: {
    title: "La voce degli studi che lo usano",
    description:
      "Studio legale, corporate o public administration: Digesto AI riduce i tempi di risposta e migliora la qualità percepita dai clienti interni.",
    categories: [
      { id: 1, label: "Tutte" },
      { id: 2, label: "Studi legali" },
      { id: 3, label: "Corporate" },
      { id: 4, label: "PA" },
      { id: 5, label: "Compliance" },
    ],
    items: [
      {
        name: "Chiara V.",
        company: "Lexia Partners",
        content:
          "Con Digesto AI abbiamo ridotto del 60% le richieste ripetitive verso il knowledge team. Ogni risposta è tracciata e pronta per l'approvazione del partner.",
        categories: [1, 2, 5],
      },
      {
        name: "Alessandro R.",
        company: "Corporate Legal Europe",
        content:
          "Il reparto procurement ora riceve risposte coerenti con le nostre policy entro pochi minuti. L'escalation automatica ci fa intervenire solo sui casi complessi.",
        categories: [1, 3],
      },
      {
        name: "Marta L.",
        company: "Comune di Milano",
        content:
          "Abbiamo digitalizzato il front-office legale per i cittadini. L'assistente fornisce linee guida e documenti aggiornati senza sovraccaricare gli uffici.",
        categories: [1, 4],
      },
      {
        name: "Federico G.",
        company: "Studio Tributario Galli",
        content:
          "Le risposte includono sempre riferimenti normativi e note operative. È diventato il nostro primo livello di assistenza fiscale interna.",
        categories: [1, 2],
      },
      {
        name: "Elena S.",
        company: "Meridia Group",
        content:
          "Grazie alla modalità collaborativa possiamo validare le bozze e diffonderle ai business partner in tempo reale.",
        categories: [1, 3, 5],
      },
      {
        name: "Paolo D.",
        company: "Agenzia Regionale Trasporti",
        content:
          "Digesto AI ci aiuta a rispettare gli SLA con gli enti locali. Ogni risposta è conservata con log per eventuali controlli.",
        categories: [1, 4, 5],
      },
      {
        name: "Giulia F.",
        company: "Inhouse Services",
        content:
          "L'assistente è integrato con SharePoint e Teams: i colleghi non devono più cercare modelli nei drive condivisi.",
        categories: [1, 3],
      },
      {
        name: "Riccardo M.",
        company: "Studio Notarile Mariani",
        content:
          "La funzione di checklist dinamiche ci permette di non tralasciare alcun passaggio nelle pratiche societarie.",
        categories: [1, 2],
      },
      {
        name: "Sara P.",
        company: "Global Compliance Lab",
        content:
          "Abbiamo uno storico completo delle conversazioni e possiamo dimostrare come vengono prese le decisioni operative.",
        categories: [1, 5],
      },
    ],
  },
  cta: {
    title: "Porta l'intelligenza conversazionale nel tuo studio",
    primaryCta: { label: "Prenota un onboarding", href: "/contatti" },
    secondaryCta: { label: "Ricevi il caso studio", href: "#risorse" },
  },
  footer: {
    columns: [
      {
        title: "Soluzioni",
        links: [
          { label: "Copilota studio legale", href: "#soluzioni" },
          { label: "Compliance automation", href: "#soluzioni" },
          { label: "Servizio clienti interno", href: "#soluzioni" },
          { label: "Aggiornamento normativo", href: "#risorse" },
        ],
      },
      {
        title: "Settori",
        links: [
          { label: "Studi boutique", href: "#settori" },
          { label: "Dipartimenti legali", href: "#settori" },
          { label: "Pubblica amministrazione", href: "#settori" },
        ],
      },
      {
        title: "Risorse",
        links: [
          { label: "Academy", href: "#risorse" },
          { label: "Modello di policy", href: "#risorse" },
          { label: "Webinar", href: "#risorse" },
        ],
      },
      {
        title: "Supporto",
        links: [
          { label: "Centro assistenza", href: "#supporto" },
          { label: "Roadmap prodotto", href: "#supporto" },
          { label: "Segnala un problema", href: "#supporto" },
        ],
      },
    ],
    socials: [
      { label: "Segui Digesto AI su X", href: "#0", icon: "x" },
      { label: "Leggi gli approfondimenti su Medium", href: "#0", icon: "medium" },
      { label: "Visita il repository su GitHub", href: "#0", icon: "github" },
    ],
    legal: {
      copyright: "© " + new Date().getFullYear() + " Digesto AI. Tutti i diritti riservati.",
      termsLabel: "Termini e privacy",
      termsHref: "#termini",
    },
  },
};

export default content;
