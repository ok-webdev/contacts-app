<template>
  <v-card class="mb-4 pb-3 pt-1" color="#f8f6f9">
    <div class="d-flex align-center justify-space-between pb-3">
      <div class="d-flex align-start">
        <v-icon
          icon="mdi-chevron-right"
          :class="['mt-3 ml-3 icon', { rotate: expand }]"
          @click="expand = !expand"
        />

        <div>
          <v-card-title>
            <p class="name body-1 font-weight-light">
              {{ props.firstName }} {{ props.lastName }}
            </p>
          </v-card-title>
          <v-card-subtitle>
            {{ props.jobTitle }} at {{ props.company }}
          </v-card-subtitle>
        </div>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon
            icon="mdi-dots-horizontal"
            class="menu-icon mr-3"
            v-bind="props"
          />
        </template>
        <v-list class="px-2">
          <v-btn
            variant="plain"
            color="primary"
            size="small"
            @click="editContact"
            >Edit</v-btn
          >

          <v-btn
            variant="plain"
            color="error"
            size="small"
            @click="deleteContact"
            >Delete</v-btn
          >
        </v-list>
      </v-menu>
    </div>
    <v-expand-transition>
      <div v-if="expand">
        <v-divider />
        <table class="ml-12 mt-2">
          <tr>
            <td class="pr-2">Full name:</td>
            <td>{{ props.firstName }} {{ props.lastName }}</td>
          </tr>
          <tr>
            <td class="pr-3">Country:</td>
            <td>{{ props.country }}</td>
          </tr>
          <tr>
            <td class="pr-3">Email:</td>
            <td>
              <a :href="'mailto:' + props.email">{{ props.email }}</a>
            </td>
          </tr>
          <tr>
            <td class="pr-3">Phone:</td>
            <td>
              <a :href="'tel:' + props.phone">{{
                props.phone
                  .replace(/\D+/g, '')
                  .replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
              }}</a>
            </td>
          </tr>
        </table>
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
    
    emit('delete', {
      id: props.id,
      name: `${props.firstName} ${props.lastName}`,
    });
  }

  function editContact() {
    emit('edit', { ...props });
  }
</script>

<style scoped>
  .name {
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .icon {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .rotate {
    transform: rotate(90deg);
  }
  @media (max-width: 400px) {
    .menu-icon {
      transform: rotate(90deg);
    }
  }
</style>
