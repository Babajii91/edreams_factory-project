const express = require("express");

const app = express();
const PORT = 3000;

function getChatReply(message) {
    const text = message.toLowerCase();

    // ========== QUESTIONS QUI NÉCESSITENT L'ÉQUIPE - VÉRIFIÉES EN PREMIER ==========

    // Question Budget
    // Car ce sont des questions qui demandent une réponse personnalisée
    if (text.includes("budget") || text.includes("prix") || text.includes("tarif") || text.includes("coût") || text.includes("devis") || text.includes("coûts") || text.includes("facturation")) {
        return "Excellente question ! Pour vous proposer un devis ou discuter de nos tarifs et options de facturation adaptés à votre projet, notre équipe vous contactera rapidement pour étudier votre demande.";
    }

    // Utilisateurs SIMPLES
    if (text.includes("client") || text.includes("personne")) {
        return "Le nombre d'utilisateurs aide à estimer la charge et la performance du projet. Y a-t-il une croissance attendue dans le temps ?";
    }

    // Maquettes avec "non"
    if (text.includes("maquette") || text.includes("non") || text.includes("pas") || text.includes("aucune")) {
        return "Pas de souci ! Nous pouvons partir de votre besoin et définir une première version fonctionnelle avant de finaliser le design. Avez-vous une charte graphique à respecter ? sinon, nous pouvons vous aider à créer des maquettes adaptées à votre projet.";
    }

    // Maquettes/design
    if (text.includes("schéma") || text.includes("design")) {
        return "Avoir des maquettes est un atout, car cela réduit les ambiguïtés et accélère la conception. Si vous en avez, montrez-nous votre style préféré. Sinon, nous pouvons vous aider à créer des maquettes adaptées à votre projet.";
    }

    // Mobile
    if (text.includes("mobile") || text.includes("application mobile")) {
        return "Une application mobile est pertinente si vos utilisateurs y accèdent régulièrement depuis leur smartphone. Selon votre cible, nous pourrons vous conseiller sur la meilleure approche (web app, native ou hybride).";
    }

    // Projet/besoin/description
    if (text.includes("projet") || text.includes("besoin") || text.includes("description")) {
        return "Pour mieux qualifier le projet, il faut comprendre votre objectif, votre cible, votre budget ainsi que les fonctionnalités prioritaires.";
    }

    // QUESTIONS COMPLEXES/TECHNIQUES - ÉQUIPE TECHNIQUE
    if (text.includes("intégration") || text.includes("architecture") || text.includes("système existant") || text.includes("api") || text.includes("base de données") || text.includes("technologie")) {
        return "Excellente question technique ! Pour bien évaluer la complexité des intégrations, notre équipe technique doit comprendre votre infrastructure existante. Elle vous contactera rapidement pour en discuter.";
    }

    if (text.includes("croissance") || text.includes("charge") || text.includes("performance") || text.includes("trafic") || text.includes("utilisateurs")) {
        return "Bonne question ! Pour estimer la croissance et les besoins de performance, notre équipe technique doit comprendre vos projections. Elle reviendra vers vous pour affiner cela.";
    }

    if (text.includes("maintenance") || text.includes("support") || text.includes("évolution") || text.includes("mise à jour") || text.includes("correctif") || text.includes("bug")) {
        return "C'est important ! Pour discuter du modèle de maintenance et de support post-lancement, notre équipe vous contactera pour déterminer la meilleure formule.";
    }

    if (text.includes("hébergement") || text.includes("infrastructure") || text.includes("sécurité") || text.includes("données") || text.includes("cloud") || text.includes("serveur")) {
        return "Très pertinent ! Pour la sécurité et l'infrastructure, notre équipe vous proposera les meilleures solutions. Elle vous appellera pour explorer ces besoins en détail.";
    }

    // QUESTIONS GÉNÉRALES - RÉPONSES AUTOMATIQUES
    const randomReplies = [
        "Ha ha, je pense que cela n'a pas grand rapport avec votre projet ! Pouvez-vous plutôt me parler de votre besoin, votre budget ou vos utilisateurs ?",
        "C'est sympathique, mais parlons de votre projet ! Dites-moi ce que vous souhaitez réaliser.",
        "Oups, je pense que nous sortons du sujet ! Revenons à votre projet. Qu'est-ce que vous aimeriez développer ?",
        "Je ne comprends pas, mais pour bien vous aider, parlons de votre projet. Quel est votre besoin principal ?"
    ];
    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Le message est invalide." });
    }

    const reply = getChatReply(message);
    res.json({ reply });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});