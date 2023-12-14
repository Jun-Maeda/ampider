<template>
  <v-container>
    <h2>お知らせ下書き一覧</h2>
    <v-row justify="end" class="my-4">
      <v-text-field
        v-model="search"
        label="検索"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        class="v-col-sm-10 v-col-md-4 pa-0"
      ></v-text-field>
    </v-row>

    <v-data-table :headers="headers" :items="drafts" :search="search">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center">削除してよろしいですか？</v-card-title>
            <p class="text-center">{{ editedItem.name }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:[`item.text`]="{ item }">
        {{ item.text.slice(0, 12) }}
        <span v-if="item.text.length > 10">...</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'No.',
        key: 'no',
        // width: '100',
      },
      { title: 'タイトル', key: 'title', width: '300', minWidth: '200' },
      { title: '更新日', key: 'date', width: '200', minWidth: '150' },
      { title: '本文', key: 'text', width: '400', minWidth: '200' },
      { title: '', key: 'actions', sortable: false, width: '100', minWidth: '100' },
    ],
    drafts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      // return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      return 'お知らせ編集'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.drafts = [
        {
          no: 1,
          title: '災害が発生しました ',
          date: '2023/12/14 15:00',
          text: '災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました',
        },
        {
          no: 2,
          title: '災害が発生しました',
          date: '2023/12/14 16:00',
          text: '災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました',
        },
        {
          no: 3,
          title: '災害が発生しました',
          date: '2023/12/14 17:00',
          text: '災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました',
        },
        {
          no: 4,
          title: '災害が発生しました',
          date: '2023/12/14 18:00',
          text: '災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました災害が発生しました',
        },
        {
          no: 5,
          title: '災害が発生しました',
          date: '2023/12/14 19:00',
          text: '災害が発生しました',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.drafts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.drafts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.drafts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.drafts[this.editedIndex], this.editedItem)
      } else {
        this.drafts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
