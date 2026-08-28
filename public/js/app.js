document.addEventListener('alpine:init', () => {
    Alpine.data('projectForm', () => ({
        form: {
            utilisateurs: '',
            budget: '',
            maquettes: '',
            mobile: '',
            description: ''
        },
        successMessage: '',
        errorMessage: '',
        isSubmitted: false,

        submitForm() {
            const requiredFields = [
                this.form.utilisateurs,
                this.form.budget,
                this.form.maquettes,
                this.form.mobile,
                this.form.description
            ];

            if (requiredFields.some(field => !field || field === '')) {
                this.errorMessage = 'Veuillez remplir tous les champs pour envoyer votre demande.';
                this.successMessage = '';
                return;
            }

            this.errorMessage = '';

            const message = [
                'Détails du projet :',
                `- Nombre d'utilisateurs : ${this.form.utilisateurs || 'Non renseigné'}`,
                `- Budget : ${this.form.budget || 'Non renseigné'}`,
                `- Maquettes disponibles : ${this.form.maquettes || 'Non renseigné'}`,
                `- Application mobile : ${this.form.mobile || 'Non renseigné'}`,
                `- Description : ${this.form.description || 'Non renseignée'}`
            ].join('\n');

            console.log(message);
            this.isSubmitted = true;
            this.successMessage = 'Demande envoyée avec succès. Nous reviendrons vers vous dans les plus brefs délais.';
        },

        goBack() {
            this.isSubmitted = false;
            this.successMessage = '';
            this.errorMessage = '';
            this.form = {
                utilisateurs: '',
                budget: '',
                maquettes: '',
                mobile: '',
                description: ''
            };
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        chatbot() {
            return {
                open: false,
                expanded: false,
                input: '',
                messages: [
                    { side: 'bot', text: 'Bonjour ! Je peux vous aider à qualifier votre projet.' },
                    { side: 'bot', text: 'Dites-moi votre nombre d’utilisateurs, votre budget, ou si vous avez des maquettes.' }
                ],

                getBotReply(userMessage) {
                    const text = userMessage.toLowerCase();

                    if (text.includes('utilisateur') || text.includes('personne') || text.includes('500')) {
                        return 'Le nombre d’utilisateurs est important pour estimer la charge et la complexité du projet.';
                    }

                    if (text.includes('budget') || text.includes('prix') || text.includes('combien')) {
                        return 'Le budget permet de cadrer le périmètre fonctionnel et le niveau de design attendu.';
                    }

                    if (text.includes('maquette') || text.includes('design')) {
                        return 'Avoir des maquettes facilite le développement et réduit les changements durant la réalisation.';
                    }

                    if (text.includes('mobile') || text.includes('app')) {
                        return 'Une application mobile peut être ajoutée ou non selon le besoin utilisateur et la stratégie produit.';
                    }

                    if (text.includes('description') || text.includes('projet')) {
                        return 'Décrivez votre besoin, votre cible et le problème que vous souhaitez résoudre. Cela aide à mieux définir la solution.';
                    }

                    return 'Merci pour votre message. Vous pouvez me parler de votre budget, de vos utilisateurs, de vos maquettes ou de votre besoin mobile.';
                },

                async sendMessage() {
                    const message = this.input.trim();

                    if (!message) {
                        return;
                    }

                    this.messages.push({ side: 'user', text: message });
                    this.input = '';

                    try {
                        const response = await fetch('/api/chat', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ message })
                        });

                        const data = await response.json();
                        const reply = data.reply || 'Désolé, je ne peux pas répondre pour le moment.';
                        this.messages.push({ side: 'bot', text: reply });
                    } catch (error) {
                        this.messages.push({ side: 'bot', text: 'Erreur de connexion avec le serveur.' });
                    }
                }
            };
        }
    }));
});

const closeChatbot = () => {
    document.querySelectorAll('.chatbot').forEach((chatEl) => {
        const chatData = Alpine.$data(chatEl);
        if (chatData && typeof chatData.open !== 'undefined') {
            chatData.open = false;
            chatData.expanded = false;
        }
    });
};

document.querySelector('.logo')?.addEventListener('click', () => {
    closeChatbot();
});
