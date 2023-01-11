<template>
  <header class="d-flex justify-space-between align-center">
    <h1>Contacts</h1>

    <v-btn
      variant="tonal"
      color="primary"
      @click="$emit('btnClick')"
      class="align-center"
      ><v-icon aria-hidden="false"> mdi-plus </v-icon><span>Add</span></v-btn
    >
  </header>
</template>

<script setup></script>

<style scoped></style>
