import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useContactsStore = defineStore('contactsStore', () => {
  const contacts = ref([
    // {
    //  id: 1,
    //  firstName: 'John',
    //  lastName: 'Doe',
    //  email: 'no-email@no-email.net',
    //  company: 'Nothing',
    //  jobTitle: 'Nobody',
    //  country: 'Neverland',
    //  phone: '0000000000',
    // },
    // {
    //  id: 2,
    //  firstName: 'Jane',
    //  lastName: 'Doe',
    //  email: 'no-email@no-email.net',
    //  country: 'Neverland',
    //  phone: '0000000000',
    // },
  ]);

  const filteredContacts = ref([]);

  function setLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
  }

  function addContact(contact) {
    contacts.value.push(contact);
    setLocalStorage();
  }

  function editContact(contact) {
    const idx = contacts.value.findIndex((i) => i.id === contact.id);
    contacts.value[idx] = contact;
    setLocalStorage();
  }

  function deleteContact(id) {
    const idx = contacts.value.findIndex((i) => id === i.id);
    contacts.value.splice(idx, 1);
    setLocalStorage();
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

  onMounted(() => {
    if (JSON.parse(localStorage.getItem('contacts'))) {
      contacts.value = JSON.parse(localStorage.getItem('contacts'));
    }
  });
  return {
    contacts,
    filteredContacts,
    addContact,
    editContact,
    deleteContact,
    filterContacts,
  };
});
