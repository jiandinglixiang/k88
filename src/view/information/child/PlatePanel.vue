<template>
  <div class="plate-panel">
    <plate-table
      :index="index"
      :item="item"
      :key="index"
      :type="type"
      v-for="(item, index) in data">
    </plate-table>
  </div>
</template>

<script>//
import PlateTable from './PlateTable.vue'

export default {
  name: 'platePanel',
  props: ['data', 'type'],
  components: { PlateTable }
}
</script>

<style>

</style>
