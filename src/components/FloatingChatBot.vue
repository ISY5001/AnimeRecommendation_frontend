
<template>
    <div class="chatbot-container" v-if="showIcon" @click="toggleChatbot">
      <!-- SVG 或图像可以放在这里表示 chatbot 的图标 -->
      <img src="../assets/chatbot-icon.svg" alt="Chatbot Icon" />
    </div>
    


    <div v-if="showDialog" class="chatbot-dialog" @click="showIcon">
      <div class="chatbot-header">
        <h4>Chatbot Assistant</h4>
        <button @click="closeDialog">X</button>
      </div>
  
      <div class="chatbot-messages">
        <div class="message" v-for="message in messages" :key="message.id">
          <span :class="message.sender">{{ message.text }}</span>
        </div>
      </div>
  
      <div class="chatbot-input">
        <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";


  export default {
    data() {
      return {
        showIcon: true,
        showChatbot: false,
        showDialog: false,
        inputMessage: '',
        messages: [
          { id: 1, text: 'Hello! How can I assist you today?', sender: 'chatbot' },
          // Add more messages as needed
        ],

      };
    },
    methods: {
      toggleChatbot() {
        this.showIcon = !this.showIcon;
        this.showChatbot = !this.showChatbot;
        this.showDialog = true;
      },
      showChatbot() {
        this.showChatbot = true;
      },
      showIcon() {
        this.showIcon = true;
      },
      closeDialog() {
        this.showDialog = false;
        this.showChatbot = true;
        this.showIcon = true;
      },
      sendMessage() {
        if (this.inputMessage.trim() !== '') {
          this.messages.push({
            id: this.messages.length + 1,
            text: this.inputMessage,
            sender: 'user',
          });
          
          this.sendToServer(this.inputMessage);  // 发送用户输入到服务器
          this.inputMessage = '';
          // Here, you can also add a function to handle user's message and generate chatbot's response
        }
      },
      async sendToServer(message) {
      try {
        
        const response = await axios.post(`${"http://127.0.0.1:8282"}/chatbot`, {
          userMessage: message
        });
        console.log(response.data);  // 打印服务器的响应

        // 你可以在这里添加处理服务器响应的代码，例如添加 chatbot 的回复到 messages 数组
        if (response.data.botReply) {
            this.messages.push({
                id: this.messages.length + 1,
                text: response.data.botReply,
                sender: 'chatbot',
            });
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    cursor: pointer;
  }
  
  .chatbot-dialog {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: 300px;
    height: 500px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
  }

  .chatbot-dialog {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .chatbot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #eee;
    border-bottom: 1px solid #ccc;
  }
  
  .chatbot-messages {
    flex-grow: 1;
    padding: 10px;
    overflow-y: scroll;
  }
  
  .message.chatbot {
    color: blue;
  }
  
  .message.user {
    color: green;
    text-align: right;
  }
  
  .chatbot-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
    background-color: #eee;
  }
  
  input[type='text'] {
    flex-grow: 1;
    margin-right: 10px;
    padding: 5px;
  }
  </style>
  