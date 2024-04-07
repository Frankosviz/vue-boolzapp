import { contacts } from './data.js';

import Picker from './emoji-picker.js';
// Link alla libreria per Luxon per la formattazione di date orari ecc...

const dt = luxon.DateTime;

const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            messageText: '',
            searchText: '',
            activeMsgIndex: null,
        }
    },
    methods: {
        selectContact(contactId) {
            this.activeContactId = contactId;
            this.showWelcomeMessage = false; // Nasconde il messaggio di benvenuto quando un contatto viene selezionato
        },
        sendMessage() {
                const newMessage = {
                date: new Date().toLocaleString(),
                message: this.messageText,
                status: 'sent'
            }
            if (this.messageText !== '' && this.messageText.trim() !== '') {
                this.activeContact.messages.push(newMessage);
                this.messageText = '';
                setTimeout(() => {
                    const newMessage = {
                        // Utilizziamo il metodo dt che abbiamo creato sopra per la restituzione dell'ora di questo momento
                        date: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                        message: 'ok',
                        status: 'received'
                    }
                    this.activeContact.messages.push(newMessage);
                }, 1000);
            } else {
                this.activeContact.messages.push();
                this.messageText = '';
                setTimeout(() => {
                    const newMessage = {
                        // Utilizziamo il metodo dt che abbiamo creato sopra per la restituzione dell'ora di questo momento
                        date: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                        message: 'Devi inserire un testo, gli spazi vuoti non sono consentiti',
                        status: 'received'
                    }
                    this.activeContact.messages.push(newMessage);
                }, 1000);
            };

        },
        toggleDropdown(index) {
            this.activeMsgIndex = this.activeMsgIndex === index ? null : index;
        },
        deleteMsg(i) {
            this.activeContact.messages.splice(i, 1);
            this.activeMsgIndex = null;
        },
        getLastMessage(id) {
            const index = this.contacts.findIndex((el) => el.id === id);
            const msgLastIndex = this.contacts[index].messages.length - 1;
            return this.contacts[index].messages[msgLastIndex].message;
        },
        getLastMsgDate(id) {
            const index = this.contacts.findIndex((el) => el.id === id);
            const msgLastIndex = this.contacts[index].messages.length - 1;
            return this.contacts[index].messages[msgLastIndex].date;
        },
    },
    mounted() {
    },
    computed: {
        activeContact() {
            return this.contacts.find(contact => contact.id === this.activeContactId)
        },
        filteredContacts() {
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    }
}).component('Picker', Picker).mount('#app');
