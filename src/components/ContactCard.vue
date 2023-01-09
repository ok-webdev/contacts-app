<template>
 <v-card class="mb-3" color="#efefef">
  <div class="d-flex align-center justify-space-between pb-3">
   <div class="d-flex align-start">
    <v-icon
     icon="mdi-chevron-right"
     :class="['mt-3 mx-3 icon', { rotate: expand }]"
     @click="expand = !expand"
    />

    <div>
     <v-card-title>
      {{ props.firstName + ' ' + props.lastName }}
     </v-card-title>
     <v-card-subtitle>
      {{ props.jobTitle }} at {{ props.company }}
     </v-card-subtitle>
    </div>
   </div>
   <v-menu>
    <template v-slot:activator="{ props }">
     <v-icon icon="mdi-dots-horizontal" class="mr-3" v-bind="props" />
    </template>
    <v-list>
     <v-btn variant="plain" color="primary" size="small" @click="editContact"
      >Edit</v-btn
     >

     <v-btn variant="plain" color="error" size="small" @click="deleteContact"
      >Delete</v-btn
     >
    </v-list>
   </v-menu>
  </div>
  <v-expand-transition>
   <div v-if="expand" class="ml-9 mr-3">
    <v-divider />
    <v-card-text>
     <p><strong>Country:</strong> {{ props.country }}</p>
     <p><strong>Email:</strong> {{ props.email }}</p>
     <p><strong>Phone:</strong> {{ props.phone }}</p>
    </v-card-text>
   </div>
  </v-expand-transition>
 </v-card>
</template>

<script setup>
 import { ref } from 'vue';

 const emit = defineEmits(['edit', 'delete']);
 const props = defineProps({
  id: {
   type: Number,
   required: true,
  },
  firstName: {
   type: String,
   required: true,
  },
  lastName: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
  },
  company: {
   type: String,
   required: false,
   default: 'No company',
  },
  jobTitle: {
   type: String,
   required: false,
   default: 'No title',
  },
  country: {
   type: String,
   required: false,
   default: 'No country',
  },
  phone: {
   type: String,
   required: true,
  },
 });

 const expand = ref(false);
 function deleteContact() {
  emit('delete', {id: props.id, name: `${props.firstName} ${props.lastName}`});
 }

 function editContact() {
  emit('edit', props.id);
 }
</script>

<style scoped>
 .icon {
  cursor: pointer;
  transition: all 0.3s ease;
 }
 .rotate {
  transform: rotate(90deg);
 }
</style>
