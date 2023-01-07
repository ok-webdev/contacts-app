<script setup>
 import { useContactsStore } from './store/contacts.js';
 import { ref } from 'vue';

 import TheHeader from './components/TheHeader.vue';
 import ContactCard from './components/ContactCard.vue';
 import ContactForm from './components/ContactForm.vue';

 const contactsStore = useContactsStore();

 const contacts = ref(contactsStore.contacts);

 const isModal = ref(false);
 function openModal() {
  isModal.value = !isModal.value;
 }
</script>

<template>
 <v-app>
  <v-container>
   <the-header @btnClick="openModal" />
   <v-text-field variant="outlined" clearable label="Search by name, company or email" class="mt-3"/>
   <p class="text-center">{{ contacts.length }} contacts found</p>
  </v-container>
  <v-main>
   <v-container>
    <contact-card
     v-for="contact in contacts"
     :key="contact.id"
     :first-name="contact?.firstName"
     :last-name="contact?.lastName"
     :job-title="contact?.jobTitle"
     :email="contact?.email"
     :company="contact?.company"
     :country="contact?.country"
     :phone="contact?.phone"
    />
   </v-container>
  </v-main>
 </v-app>

 <v-overlay
  v-model="isModal"
  scroll-strategy="block"
  class="align-center justify-center"
 >
  <contact-form />
 </v-overlay>
</template>

<style scoped></style>
