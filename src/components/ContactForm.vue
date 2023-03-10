<template>
  <v-form
    @submit.prevent="submitHandler"
    @reset="cancelHandler"
    class="form bg-white rounded-lg pa-6"
  >
    <div class="mb-3">
      <h2>{{ props.contact ? 'Edit' : 'Add' }} contact</h2>
    </div>
    <v-text-field
      v-model="formData.firstName"
      :rules="[rules.required]"
      label="First name"
      color="primary"
      variant="underlined"
      required
      hint="required"
      persistent-hint
    />
    <v-text-field
      v-model="formData.lastName"
      :rules="[rules.required]"
      label="Last name"
      color="primary"
      variant="underlined"
      required
      hint="required"
      persistent-hint
    />
    <v-text-field
      v-model="formData.email"
      :rules="[rules.required, rules.email]"
      label="Email"
      color="primary"
      variant="underlined"
      required
      hint="Example: mail@mail.com (required)"
      persistent-hint
    />
    <v-text-field
      v-model="formData.phone"
      :rules="[rules.required, rules.phone]"
      label="Phone"
      color="primary"
      variant="underlined"
      hint="digits only required"
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
      label="Country"
      v-model="formData.country"
      :items="countries"
      item-title="name"
      color="primary"
      variant="underlined"
      hint="Select country (not required)"
      persistent-hint
    />

    <div class="d-flex justify-center mt-3">
      <v-btn type="reset" variant="plain" color="error" class="btn mr-1"
        >Cancel</v-btn
      >
      <v-btn type="submit" variant="tonal" color="primary" class="btn ml-1">{{
        props.contact ? 'edit' : 'add'
      }}</v-btn>
    </div>
  </v-form>
</template>

<script setup>
  import countries from '../assets/countries.json';
  import { ref, onMounted } from 'vue';
  const props = defineProps({
    contact: {
      type: Object,
      required: false,
      default: null,
    },
  });
  const emit = defineEmits(['submit', 'edit', 'cancel']);
  const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    country: undefined,
    company: undefined,
    jobTitle: undefined,
    phone: '',
  });

  const rules = {
    required: (value) => (!!value && !!value.trim()) || 'Required.',
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Invalid e-mail! (email@email.com)';
    },
    phone: (value) => {
      const pattern = /^\d+$/;
      return (
        pattern.test(value) || 'Invalid phone number (digits only required)'
      );
    },
  };

  onMounted(() => {
    if (props.contact) {
      formData.value = {
        firstName: props.contact.firstName,
        lastName: props.contact.lastName,
        email: props.contact.email,
        country: props.contact.country,
        company: props.contact.company,
        jobTitle: props.contact.jobTitle,
        phone: props.contact.phone,
      };
    }
  });

  function submitAddHandler() {
    if (
      formData.value.firstName.length > 0 &&
      formData.value.lastName.length > 0 &&
      formData.value.email.length > 0 &&
      formData.value.phone.length > 0
    ) {
      emit('submit', { ...formData.value });
    }
  }

  function submitEditHandler() {
    emit('edit', { id: props.contact.id, ...formData.value });
  }

  function submitHandler() {
    if (!props.contact) {
      submitAddHandler();
    }
    if (props.contact) {
      submitEditHandler();
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
    width: 310px;
    background-color: aliceblue;
  }
  .btn {
    width: 100px;
  }
</style>
