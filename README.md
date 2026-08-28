# Edreams Factory

Application web de qualification de projet avec un formulaire client et un chatbot d'assistance.

## Prerequis

- Node.js installe

## Installation

Depuis le dossier du projet, installer les dependances :

```powershell
npm install
```

## Lancer le projet

Pour lancer le serveur Express :

```powershell
npm start
```

Pour lancer le serveur en mode developpement avec redemarrage automatique :

```powershell
npm run dev
```

Le serveur est disponible a l'adresse suivante :

```text
http://localhost:3000
```

Ouvrir cette adresse dans le navigateur.

## Utiliser le chatbot

1. Ouvrir `http://localhost:3000`.
2. Cliquer sur le bouton `Assistant`.
3. Ecrire une question dans la zone de texte.
4. Cliquer sur `Envoyer`.
5. La reponse s'affiche automatiquement dans la conversation.

La touche `Entree` permet d'aller a la ligne dans le champ de texte. Pour envoyer rapidement un message, utiliser `Ctrl + Entree`.

## Exemples de reponses

### Question sur le budget

```text
Client : Quel est votre tarif pour ce type de projet ?
```

Le chatbot redirige la demande vers l'equipe commerciale pour obtenir un devis adapte au projet.

### Question sur les utilisateurs

```text
Client : Combien d'utilisateurs sont attendus ?
```

Le chatbot explique que le nombre d'utilisateurs permet d'estimer la charge et demande si une croissance est prevue.

### Question complexe

```text
Client : Peut-on gerer 5000 utilisateurs simultanes ?
```

Le chatbot redirige la question vers l'equipe technique, car elle concerne la performance et la scalabilite.

### Question hors sujet

```text
Client : blabla bliblibli
```

Le chatbot repond de maniere conviviale et ramene la conversation vers le besoin du projet.

## Fonctionnement technique

- `server.js` lance Express et sert le dossier `public`.
- La route `POST /api/chat` recoit le message du client.
- Le serveur analyse les mots-cles et renvoie une reponse coherente.
- `public/js/app.js` envoie le message avec `fetch()` et affiche la reponse sans recharger la page.
- Alpine.js gere l'etat du formulaire et du chatbot.

La reponse semble instantanee car le message est envoye directement au serveur et ajoute a la conversation des que l'API repond.
