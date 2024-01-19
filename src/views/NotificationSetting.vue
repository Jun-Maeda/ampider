<template>
  <v-container>
    <v-row justify="start">
      <v-breadcrumbs :items="link">
        <template #divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <div class="mt-4">
      <h2>過去の災害詳細</h2>
    </div>
    <div>
      <v-row>
        <v-col cols="12" md="6">
          <v-data-table-virtual :headers="headers" :items="disaster" disable-pagination item-key="name">
            <template #[`item.standard`]="{ value }">
              <v-select :items="value" density="compact" variant="underlined"></v-select>
            </template>
            <template #[`item.timing`]="{ value }">
              <v-select :items="value" density="compact" variant="underlined"></v-select>
            </template>
            <template #[`item.hour`]="{ value }">
              <v-select :items="value" density="compact" variant="underlined"></v-select>
            </template>
            <template #[`item.minutes`]="{ value }">
              <v-select :items="value" density="compact" variant="underlined"></v-select>
            </template>
          </v-data-table-virtual>
          <div class="mt-5">
            <v-row justify="end">
              <v-btn color="orange"> Button </v-btn>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: {
      earthquake: ['震度1', '震度2', '震度3'],
      heavyrain: ['注意報', '警報', '特別警報'],
    },
    link: [
      {
        title: '通知設定',
        disabled: false,
        href: 'disaster_list',
      },
    ],
    headers: [
      { title: '災害', key: 'type', sortable: false, align: 'center' },
      { title: '安否確認実施基準', key: 'standard', sortable: false, align: 'center' },
      { title: 'リマインド確認', key: 'timing', sortable: false, align: 'center' },
      {
        title: '安否確認タイミング',
        key: 'remind',
        sortable: false,
        align: 'center',
        children: [
          { title: '時間', key: 'hour', sortable: false, align: 'center' },
          { title: '分', key: 'minutes', sortable: false, align: 'center' },
        ],
      },
    ],
    disaster: [
      {
        type: '地震',
        standard: ['震度1', '震度2', '震度3'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
      {
        type: '大雨',
        standard: ['注意報', '警報', '特別警報'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
      {
        type: '強風',
        standard: ['注意報', '警報', '特別警報'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
      {
        type: '洪水',
        standard: ['注意報', '警報', '特別警報'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
      {
        type: '津波',
        standard: ['注意報', '警報', '特別警報'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
      {
        type: '大雪',
        standard: ['注意報', '警報', '特別警報'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
      {
        type: '雷',
        standard: ['注意報', '警報', '特別警報'],
        timing: ['0', '15', '30','45'],
        hour: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','18','19','20','21','22','23','24'],
        minutes: ['0', '15', '30','45'],
      },
    ],
  }),
  mounted() {},
  methods: {},
}
</script>
