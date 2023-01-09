import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContactsStore = defineStore('contactsStore', () => {
 const contacts = ref([
  {
   id: 1,
   firstName: 'John',
   lastName: 'Doe',
   email: 'no-email@no-email.net',
   company: 'Nothing',
   jobTitle: 'Nobody',
   country: 'Neverland',
   phone: '0000000000',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'no-email@no-email.net',
    country: 'Neverland',
    phone: '0000000000',
   },
 ]);

 function addContact (contact) {
  console.log(contact);
  contacts.value.push(contact)
 }

 function deleteContact (id) {
  const idx = contacts.value.findIndex(i => id === i.id)
  contacts.value.splice(idx, 1)
 }

 return {
  contacts,
  addContact,
  deleteContact
 };
});
