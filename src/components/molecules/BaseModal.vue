<template>
  <section class="modal-overlay" v-show="showModal">
    <div class="modal-container">
      <h1 class="modal-title">{{ titleModal }}</h1>
  
      <body class="modal-body">
        <p>{{ textModal }}</p>
        <span class="modal-content">{{ content }}</span>
      </body>
      <BaseButton :buttonText='"Play Again"' @click="closeModal" />
    </div>
  </section>
</template>

<script>
import BaseButton from '../atoms/BaseButton.vue';

export default {
  name: "BaseModal",
  components: { BaseButton },
  props: {
    showModal: Boolean,
    titleModal: {
      type: String,
      default: "Title"
    },
    textModal: {
      type: String,
      default: "Text"
    },
    content: {
      type: String,
      default: "Content"
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  cursor: pointer;
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.modal-container:hover {
  transform: scale(1.1);
}

.modal-container:hover .modal-content {
  animation: fizz 0.5s infinite alternate;
}


.modal-title {
  font-size: 36px;
}

.modal-content {
  font-size: 32px;
}

.modal-body {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

@keyframes fizz {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-5px);
  }
}
</style>
