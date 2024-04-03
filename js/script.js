import {contacts} from './data.js';

const { createApp } = Vue;

createApp({
    data(){
        return {
            contacts: contacts,
            activeContactId: 1
        }
    },
    methods: {

    },
    mounted(){
        console.log(this.contacts)
    },
    computed: {
        activeContact(){
            return this.contacts.find(contact => contact.id === this.activeContactId)
        }
    }
}).mount('#app');