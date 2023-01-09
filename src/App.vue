<script setup>
 import { useContactsStore } from './store/contacts.js';
 import { ref } from 'vue';

 import TheHeader from './components/TheHeader.vue';
 import ContactCard from './components/ContactCard.vue';
 import ContactForm from './components/ContactForm.vue';
 import SubmitCard from './components/SubmitCard.vue';

 const contactsStore = useContactsStore();

 const contacts = ref(contactsStore.contacts);
 let formMode = ref('add');

 const isModal = ref(false);
 const deletingContact = ref(null);
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
  console.log(e);
  deletingContact.value = e;
  isSubmitDeleteContactModal.value = true;
 }

 function closeSubmitCard() {
  isSubmitDeleteContactModal.value = false;
  setTimeout(() => deletingContact.value = null, 300)
 }

 function submitDeleteContact() {
  console.log(deletingContact.value.id);
  contactsStore.deleteContact(deletingContact.value.id);
  closeSubmitCard();
 }

 function editContact(e) {
  console.log(e);
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
   />
   <p class="text-center">{{ contacts.length }} contacts found</p>
  </v-container>
  <v-main>
   <v-container>
    <contact-card
     v-for="contact in contacts"
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
   @submit="formSubmitHandler"
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
   :name="deletingContact?.name"
   @cancel="closeSubmitCard"
   @submit="submitDeleteContact"
  />
 </v-overlay>
</template>

<style scoped></style>
