<template>
 <v-form class="form bg-white rounded-lg pa-3">
  <h2>Add contact</h2>
  <v-text-field
   v-model="formData.name"
   :rules="nameRules"
   label="First name"
   required
  />
  <v-text-field
   v-model="formData.name"
   :rules="nameRules"
   label="Last name"
   required
  />
  <v-text-field
   v-model="formData.name"
   :rules="nameRules"
   label="Email"
   required
  />
  <v-text-field
   v-model="formData.name"
   :rules="nameRules"
   label="Company"
  />
  <v-text-field
   v-model="formData.name"
   :rules="nameRules"
   label="Job title"
  />
  <v-text-field
   v-model="formData.name"
   :rules="nameRules"
   label="Phone"
  />
  <div class="d-flex justify-center">
    <v-btn color="error">Cancel</v-btn>
    <v-btn color="primary" class="ml-3">Submit</v-btn>
  </div>
 </v-form>
</template>

<script setup>
 import { ref } from 'vue';
 const formData = ref({
  firstName: '',
  lastNmae: '',
  email: '',
  company: '',
  jobTille: '',
  phone: ''
 });

 const nameRules = [
  (v) => !!v || 'Name is required'
 ];
</script>

<style scoped>
  .form {
    min-width: 300px;
    width: 450px;
    background-color: aliceblue;
  }
</style>
