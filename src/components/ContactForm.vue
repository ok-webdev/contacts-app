<template>
 <v-form
  @submit.prevent="submitHandler"
  @reset="cancelHandler"
  class="form bg-white rounded-lg pa-6"
 >
  <div class="mb-3">
   <h2>{{ props.mode === 'add' ? 'Add' : 'Edit' }} contact</h2>
  </div>
  <v-text-field
   v-model="formData.firstName"
   :rules="rules"
   label="First name"
   color="primary"
   variant="underlined"
   required
   hint="required"
   persistent-hint
  />
  <v-text-field
   v-model="formData.lastName"
   :rules="rules"
   label="Last name"
   color="primary"
   variant="underlined"
   required
   hint="required"
   persistent-hint
  />
  <v-text-field
   v-model="formData.email"
   :rules="rules"
   label="Email"
   color="primary"
   variant="underlined"
   required
   hint="required"
   persistent-hint
  />
  <v-text-field
   v-model="formData.phone"
   :rules="rules"
   label="Phone"
   color="primary"
   variant="underlined"
   hint="required"
   persistent-hint
  />
  <v-text-field
   v-model="formData.company"
   label="Company"
   color="primary"
   variant="underlined"
   hint="Fill this field for company (not required)"
   persistent-hint
  />
  <v-text-field
   v-model="formData.jobTitle"
   label="Job title"
   color="primary"
   variant="underlined"
   hint="Fill this field for job title (not required)"
   persistent-hint
  />
  <v-select
   label="Select"
   v-model="formData.country"
   :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
   color="primary"
   variant="underlined"
   hint="Select country (not required)"
   persistent-hint
  />

  <div class="d-flex justify-center mt-3">
   <v-btn type="reset" variant="tonal" color="error">Cancel</v-btn>
   <v-btn type="submit" variant="tonal" color="primary" class="ml-3"
    >Submit</v-btn
   >
  </div>
 </v-form>
</template>

<script setup>
 import { ref } from 'vue';
 const props = defineProps({
  mode: {
   type: String,
   default: 'add',
  },
 });
 const emit = defineEmits(['submit', 'cancel']);
 const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  country: undefined,
  company: undefined,
  jobTitle: undefined,
  phone: '',
 });

 const rules = [(v) => !!v || 'Field is required'];

 function submitHandler() {
  if (
   formData.value.firstName.length > 0 &&
   formData.value.lastName.length > 0 &&
   formData.value.email.length > 0 &&
   formData.value.phone.length > 0
  ) {
   emit('submit', { ...formData.value });
  }
 }

 function cancelHandler() {
  formData.value = {
   firstName: '',
   lastName: '',
   email: '',
   country: undefined,
   company: undefined,
   jobTitle: undefined,
   phone: '',
  };
  emit('cancel');
 }
</script>

<style scoped>
 .form {
  min-width: 200px;
  width: 350px;
  background-color: aliceblue;
 }
</style>
