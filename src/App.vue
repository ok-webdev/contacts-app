<script setup>
 import { useContactsStore } from './store/contacts.js';
 import { ref, computed } from 'vue';

 import TheHeader from './components/TheHeader.vue';
 import ContactCard from './components/ContactCard.vue';
 import ContactForm from './components/ContactForm.vue';
 import SubmitCard from './components/SubmitCard.vue';

 const contactsStore = useContactsStore();

 const contacts = computed(() => contactsStore.contacts);
 const filteredContacts = computed(() => contactsStore.filteredContacts);
 const filter = ref('');

 const currentContacts = computed(() => {
  return filter.value?.trim() ? filteredContacts.value : contacts.value;
 });

 const contactsFound = computed(() => {
  return contacts.value.length === 1 ? 'contact' : 'contacts';
 });

 let formMode = ref('add');

 const isModal = ref(false);
 const currentContact = ref(null);
 const isSubmitDeleteContactModal = ref(false);

 function openModal(mode) {
  formMode.value = mode;
  isModal.value = !isModal.value;
 }
 function closeModal() {
  isModal.value = false;
 }
 function formSubmitHandler(e) {
  const now = new Date();
  const id =
   now.getHours() * 3600 +
   now.getMinutes() * 60 +
   now.getSeconds() +
   Math.random();
  contactsStore.addContact({ id, ...e });
  closeModal();
 }

 function deleteContact(e) {
  currentContact.value = e;
  isSubmitDeleteContactModal.value = true;
 }

 function closeSubmitCard() {
  isSubmitDeleteContactModal.value = false;
  setTimeout(() => (currentContact.value = null), 300);
 }

 function submitDeleteContact() {
  contactsStore.deleteContact(currentContact.value.id);
  closeSubmitCard();
 }

 function editContact(e) {
  formMode.value = 'edit';
  currentContact.value = e;
  openModal(formMode.value);
 }

 function editContactHandler(e) {
  contactsStore.editContact(e);
  closeModal();
 }

 function filterContacts() {
  contactsStore.filterContacts(filter.value);
 }
</script>

<template>
 <v-app>
  <v-container>
   <the-header @btnClick="openModal('add')" />
   <v-text-field
    variant="outlined"
    clearable
    append-inner-icon="mdi-magnify"
    label="Search by name, company or email"
    color="primary"
    class="mt-3"
    v-model="filter"
    @input="filterContacts"
    @click:clear="filterContacts"
   />
   <p class="text-center" v-if="contacts?.length">
    {{ currentContacts.length }} {{ contactsFound }} found
   </p>
   <p class="text-center" v-else>No contacts. Add it!</p>
  </v-container>
  <v-main>
   <v-container>
    <contact-card
     v-for="contact in currentContacts"
     :key="contact.id"
     :id="contact.id"
     :first-name="contact?.firstName"
     :last-name="contact?.lastName"
     :job-title="contact?.jobTitle"
     :email="contact?.email"
     :company="contact?.company"
     :country="contact?.country"
     :phone="contact?.phone"
     @delete="deleteContact"
     @edit="editContact"
    />
   </v-container>
  </v-main>
 </v-app>

 <v-overlay
  v-model="isModal"
  scroll-strategy="block"
  class="align-center justify-center"
 >
  <contact-form
   :mode="formMode"
   :contact="currentContact"
   @submit="formSubmitHandler"
   @edit="editContactHandler"
   @cancel="closeModal"
  />
 </v-overlay>
 <v-overlay
  v-model="isSubmitDeleteContactModal"
  scroll-strategy="block"
  class="align-center justify-center"
 >
  <submit-card
   title="Are you sure?"
   text="Delete"
   :name="currentContact?.name"
   @cancel="closeSubmitCard"
   @submit="submitDeleteContact"
  />
 </v-overlay>
</template>

<style scoped></style>
