<template>
  <v-card>
    <v-card-title>
      {{ props.title }}
    </v-card-title>
    <v-card-subtitle v-if="props.subtitle">
      {{ props.subtitle }}
    </v-card-subtitle>
    <v-card-text> {{ props.text }} {{ props.name }}? </v-card-text>
    <v-card-actions>
      <v-btn variant="plain" color="error" size="small" @click="$emit('cancel')"
        >Cancel</v-btn
      >
      <v-btn
        variant="plain"
        color="primary"
        size="small"
        @click="$emit('submit')"
        >Submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: [String, null],
      required: false,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: [String, undefined],
      required: false,
      default: '',
    },
  });
</script>

<style lang="scss" scoped></style>
