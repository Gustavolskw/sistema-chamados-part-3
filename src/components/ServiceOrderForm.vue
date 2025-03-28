<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const categories = [
  'Manutenção',
  'Instalação',
  'Suporte Técnico',
  'Consultoria',
  'Outros'
]

const priorities = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' }
]

const technicians = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Maria Santos' },
  { id: 3, name: 'Pedro Oliveira' }
]

const formData = ref({
  category: '',
  description: '',
  priority: '',
  scheduledDate: '',
  technician: ''
})

const submitForm = () => {
  // Here you would typically make an API call to save the service order
  console.log('Form submitted:', formData.value)
  toast.success('Pedido de serviço criado com sucesso!')
  
  // Reset form
  formData.value = {
    category: '',
    description: '',
    priority: '',
    scheduledDate: '',
    technician: ''
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-white">
            <h4 class="card-title mb-0 text-primary">Novo Pedido de Serviço</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="category" class="form-label">Categoria do Serviço</label>
                <select 
                  id="category" 
                  class="form-select"
                  v-model="formData.category"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Descrição do Problema</label>
                <textarea 
                  id="description" 
                  class="form-control" 
                  v-model="formData.description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="priority" class="form-label">Prioridade</label>
                <select 
                  id="priority" 
                  class="form-select"
                  v-model="formData.priority"
                  required
                >
                  <option value="">Selecione a prioridade</option>
                  <option v-for="priority in priorities" :key="priority.value" :value="priority.value">
                    {{ priority.label }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="scheduledDate" class="form-label">Data Agendada</label>
                <input 
                  type="datetime-local" 
                  id="scheduledDate" 
                  class="form-control"
                  v-model="formData.scheduledDate"
                  required
                >
              </div>

              <div class="mb-4">
                <label for="technician" class="form-label">Técnico</label>
                <select 
                  id="technician" 
                  class="form-select"
                  v-model="formData.technician"
                  required
                >
                  <option value="">Selecione um técnico</option>
                  <option v-for="tech in technicians" :key="tech.id" :value="tech.id">
                    {{ tech.name }}
                  </option>
                </select>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">
                  Criar Pedido de Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.card-header {
  border-bottom: 1px solid #eee;
  padding: 1.5rem;
}

.card-body {
  padding: 2rem;
}

.form-label {
  font-weight: 500;
  color: #333;
}

.form-control, .form-select {
  padding: 0.75rem;
  border-color: #e0e0e0;
}

.form-control:focus, .form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>