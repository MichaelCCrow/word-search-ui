<script setup>
import { ref, computed } from 'vue'
import wordsfile from '@/assets/words.txt?raw'

const len = ref(5)
const beg = ref('')
const mid = ref('')
const end = ref('')

const words = wordsfile.split('\n').filter(word => word.length === len.value)

const count = computed(() => beg.value.length + mid.value.length + end.value.length)
// const max = computed(() => len.value - beg.value.length + mid.value.length + end.value.length)
const withinMax = computed(() => beg.value.length + mid.value.length + end.value.length < len.value)

const results = computed(() => beg.value||mid.value||end.value ? words.filter(word => word.startsWith(beg.value) && word.substring(beg.value.length).includes(mid.value) && word.endsWith(end.value)) : [])

const errors = computed(() => withinMax.value || `Cannot input more letters than max length: ${len.value}`)
const textFieldDefaults = ref({
  VTextField: {
    errorMessages: errors,
    class: 'v-col-4',
  },
})

const query = ref('')
const anything = computed(() => query.value ? words.filter(word => [...query.value].every(q=>word.includes(q))) : [])
</script>

<template>
  <v-form v-model="withinMax" class="v-container">

    <v-card>
      <v-card-title class="v-row">
        <h2 class="v-col-3">Word Search</h2>
        <v-col cols="1" offset="2" class="mt-1">
          <v-btn v-tooltip="'Clear'" color="warning" icon="mdi-nuke" @click="[beg='', mid='', end='']" />
        </v-col>
        <v-number-input v-model.number="len" label="Word Length" class="v-col-3 offset-3" />
      </v-card-title>
      <v-divider/>
      <v-card-item>
        <v-row>
          <v-defaults-provider :defaults="textFieldDefaults">
            <v-text-field v-model.trim="beg" label="Beginning Letters" :maxlength="len+beg.length-count" append-inner-icon="mdi-arrow-expand-right" />
            <v-text-field v-model.trim="mid" label="Middle Letters"    :maxlength="len+mid.length-count" append-inner-icon="mdi-arrow-expand-horizontal" />
            <v-text-field v-model.trim="end" label="Ending Letters"    :maxlength="len+end.length-count" prepend-inner-icon="mdi-arrow-expand-left" />
          </v-defaults-provider>
        </v-row>
      </v-card-item>
    </v-card>

    <v-divider/>

    <v-list :items="results" />

    <v-expansion-panels class="mt-16" @click="[beg='', mid='', end='']">
      <v-expansion-panel title="Super Easy Search">
        <v-expansion-panel-text class="v-row">
          <v-text-field v-model="query" label="Search anything" class="v-col" />
          <v-divider/>
          <v-list :items="anything" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-form>
</template>

<style scoped>

</style>
