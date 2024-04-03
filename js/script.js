import contacts from './data/contacts.js';

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts
        }
    },
    methods: {

    },
    mounted(){
        console.log(this.contacts)
    }
}).mount('#app');