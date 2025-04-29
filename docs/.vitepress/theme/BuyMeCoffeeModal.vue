<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}
</script>

<template>
  <div>
    <button class="coffee-btn" @click="openModal">☕ Buy me a coffee</button>

    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>
        <img src="/bank.jpg" alt="Bank Transfer Details" class="bank-img" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.coffee-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: #FF813F;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  margin-left: 16px;
}

.coffee-btn:hover {
  background: #FF6B1A;
}

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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 90%;
  max-height: 90vh;
  position: relative;
  overflow: auto;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.bank-img {
  max-width: 100%;
  height: auto;
  margin-top: 16px;
}

h2 {
  margin-top: 0;
  color: #333;
}
</style>