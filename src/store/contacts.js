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

 const filteredContacts = ref([]);

 function addContact(contact) {
  contacts.value.push(contact);
 }

 function editContact(contact) {
  const idx = contacts.value.findIndex((i) => i.id === contact.id);
  contacts.value[idx] = contact;
 }

 function deleteContact(id) {
  const idx = contacts.value.findIndex((i) => id === i.id);
  contacts.value.splice(idx, 1);
 }

 function filterContacts(e) {
  if (e) {
   const filtered = contacts.value.filter((contact) => {
    return Object.values(contact).some(
     (contactValue) =>
      !Number.isInteger(contactValue) &&
      contactValue
       ?.toString()
       ?.toLowerCase()
       .trim()
       .includes(e.toLowerCase().trim())
    );
   });
   filteredContacts.value = filtered;
  } else {
   filteredContacts.value = [];
  }
 }
 return {
  contacts,
  filteredContacts,
  addContact,
  editContact,
  deleteContact,
  filterContacts,
 };
});
