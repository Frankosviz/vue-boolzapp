import { contacts } from './data.js';

// Link alla libreria per Luxon per la formattazione di date orari ecc...

const dt = luxon.DateTime;

const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            messageText: '',
            searchText: ''
        }
    },
    methods: {
        setActiveContact(id) {
            this.activeContactId = id;
        },
        sendMessage() {
            const newMessage = {
                date: new Date().toLocaleString(),
                message: this.messageText,
                status: 'sent'
            }
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
        },
    },
    mounted() {
        console.log(this.contacts)
    },
    computed: {
        activeContact() {
            return this.contacts.find(contact => contact.id === this.activeContactId)
        },
        filteredContacts() {
            return this.contacts.filter((el)=> el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    }
}).mount('#app');
