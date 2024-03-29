<template>
  <div class="main-contents">
    <div class="message_base pb-4">
      <div v-for="message in messages" :key="message.id">
        <div v-bind:class="[message.owner === user.username ? 'message' : 'message_opponent']">
          {{ message.content }}
        </div>
        <div v-bind:class="[message.owner === user.username ? 'username' : 'username_opponent']">
          {{ message.owner }}
        </div>
      </div>
    </div>
    <v-row>
      <!-- <v-col cols="9">
        <input class="message-input" placeholder="Enter a message (send with Shift+Enter)" v-model="content" @keydown.enter.shift="sendMessage" />
      </v-col>
      <v-col cols="3">
        <v-btn class="btn btn-sm btn-outline-success" @click="sendMessage">送信</v-btn>
      </v-col> -->
      <v-text-field v-model="content" hide-details variant="solo" label="メッセージを送信">
        <template #append-inner>
          <v-icon :color="input ? 'primary' : ''" @click="sendMessage" :disabled="!input">mdi-send</v-icon>
        </template>
      </v-text-field>
    </v-row>
    
  </div>
  
</template>

<style scoped>
.main-contents {
  float: left;
  width: 100%;
  height: calc(100vh - 120px);
  padding: 0;
}
.message_base {
  overflow: auto;
  height: calc(100% - var(--amplify-space-xxl));
  background-color: #7493bc;
}

.message-input {
  width: 100%;
  height: var(--amplify-space-xxl);
}

.message {
  width: 40%;
  margin: 10px 10px 10px auto;
  padding: 20px;
  background-color: #7ade40 !important;
  border-radius: 30px;
}
.message_opponent {
  width: 40%;
  margin: 10px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 30px;
  word-wrap: break-word;
}
.username {
  text-align: right;
  margin: -12px 10px 0px 0px;
  font-size: 14px;
}
.username_opponent {
  text-align: left;
  margin: -12px 0px 0px 10px;
  font-size: 14px;
}
</style>
<script>
import { API, graphqlOperation } from '@aws-amplify/api'
import { createMessage } from '@/graphql/mutations'
import { listMessages } from '@/graphql/queries'
import { onCreateMessage } from '@/graphql/subscriptions'
import { ref, onBeforeUnmount, onUpdated } from 'vue'

export default {
  props: {
    user: Object,
  },
  setup(props) {
    const messages = ref([])
    const content = ref('')
    const subscription = ref({})

    const sendMessage = async () => {
      //if (event.keyCode !== 13 || !content.value) return;
      if (!content.value) return;

      const message = {
        id: new Date().getTime() + props.user.username,
        content: content.value,
      }

      // Mutation(createMessage) の実装 ↓
      API.graphql(graphqlOperation(createMessage, { input: message })).catch((error) => console.warn(error))
      // ↑↑↑↑↑↑
      content.value = ''
    }

    const fetch = async () => {
      // Query(listMessages) の実装 ↓
      API.graphql(graphqlOperation(listMessages, { input: 100 }))
        .then((value) => (messages.value = value.data.listMessages.items.sort((a, b) => (a.id > b.id ? 1 : -1))))
        .catch((error) => console.warn(error))
      // ↑↑↑↑↑↑
    }

    const subscribe = async () => {
      // Subscription(onCreateMessages) の実装 1 ↓
      subscription.value = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
        next: (eventData) => {
          const message = eventData.value.data.onCreateMessage
          messages.value = [...messages.value, message]
        },
        error: (error) => console.warn(error),
      })
      // ↑↑↑↑↑↑
    }

    const scrollBottom = () => {
      const container = document.querySelector('.message_base')
      container.scrollTop = container.scrollHeight
    }

    onBeforeUnmount(() => {
      // Subscription(onCreateMessages) の実装 2 ↓
      subscription.value.unsubscribe()
      // ↑↑↑↑↑↑
    })

    onUpdated(() => {
      scrollBottom()
    })

    fetch()
    subscribe()

    return {
      messages,
      content,
      sendMessage,
    }
  },
}
</script>
