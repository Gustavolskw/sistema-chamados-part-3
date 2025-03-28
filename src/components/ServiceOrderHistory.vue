<script setup lang="ts">
import { ref, computed } from 'vue'

interface ServiceOrder {
  id: number
  userName: string
  company: string
  category: string
  description: string
  priority: string
  scheduledDate: string
  completedDate: string | null
  technician: number
  status: string
  createdAt: string
  observations: string
}

const filters = ref({
  search: '',
  company: '',
  technician: '',
  status: '',
  dateFrom: '',
  dateTo: '',
})

const statuses = [
  { value: 'pending', label: 'Pendente' },
  { value: 'in_progress', label: 'Em Andamento' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' }
]

const technicians = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Maria Santos' },
  { id: 3, name: 'Pedro Oliveira' }
]

// Mock data with more varied examples
const serviceOrders = ref<ServiceOrder[]>([
  {
    id: 1,
    userName: 'Carlos Roberto',
    company: 'Tech Solutions LTDA',
    category: 'Manutenção',
    description: 'Problema com impressora HP LaserJet que não imprime documentos em PDF',
    priority: 'high',
    scheduledDate: '2024-03-20T10:00',
    completedDate: '2024-03-20T14:30',
    technician: 1,
    status: 'completed',
    createdAt: '2024-03-18T08:30',
    observations: 'Substituição da unidade do fusor realizada com sucesso'
  },
  {
    id: 2,
    userName: 'Ana Paula Silva',
    company: 'Consultoria Express',
    category: 'Suporte Técnico',
    description: 'Configuração de rede para novo escritório',
    priority: 'medium',
    scheduledDate: '2024-03-21T14:00',
    completedDate: '2024-03-21T17:00',
    technician: 2,
    status: 'completed',
    createdAt: '2024-03-18T09:15',
    observations: 'Rede configurada e testada. Todos os computadores conectados'
  },
  {
    id: 3,
    userName: 'Roberto Mendes',
    company: 'Indústrias Reunidas',
    category: 'Instalação',
    description: 'Instalação de novo servidor',
    priority: 'high',
    scheduledDate: '2024-03-22T09:00',
    completedDate: null,
    technician: 3,
    status: 'in_progress',
    createdAt: '2024-03-19T10:00',
    observations: 'Hardware instalado, configuração em andamento'
  }
])

const filteredOrders = computed(() => {
  return serviceOrders.value.filter(order => {
    const matchesSearch = !filters.value.search || 
      order.userName.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      order.company.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      order.description.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesCompany = !filters.value.company || 
      order.company.toLowerCase().includes(filters.value.company.toLowerCase())
    
    const matchesTechnician = !filters.value.technician || 
      order.technician.toString() === filters.value.technician
    
    const matchesStatus = !filters.value.status || 
      order.status === filters.value.status
    
    const matchesDateFrom = !filters.value.dateFrom || 
      new Date(order.createdAt) >= new Date(filters.value.dateFrom)
    
    const matchesDateTo = !filters.value.dateTo || 
      new Date(order.createdAt) <= new Date(filters.value.dateTo)
    
    return matchesSearch && matchesCompany && matchesTechnician && 
           matchesStatus && matchesDateFrom && matchesDateTo
  })
})

const getStatusLabel = (value: string) => {
  return statuses.find(s => s.value === value)?.label || value
}

const getTechnicianName = (id: number) => {
  return technicians.find(t => t.id === id)?.name || 'Não atribuído'
}

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-warning',
    in_progress: 'bg-info',
    completed: 'bg-success',
    cancelled: 'bg-secondary'
  }
  return classes[status as keyof typeof classes] || 'bg-light'
}

const clearFilters = () => {
  filters.value = {
    search: '',
    company: '',
    technician: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  }
}
</script>

<template>
  <div class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Histórico de Atendimentos</a>
      </div>
    </nav>

    <div class="container">
      <!-- Filters -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-12 mb-3">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Buscar por cliente, empresa ou descrição..."
                  v-model="filters.search"
                >
              </div>
            </div>

            <div class="col-md-3">
              <label class="form-label">Empresa</label>
              <input
                type="text"
                class="form-control"
                placeholder="Filtrar por empresa"
                v-model="filters.company"
              >
            </div>

            <div class="col-md-3">
              <label class="form-label">Técnico</label>
              <select class="form-select" v-model="filters.technician">
                <option value="">Todos os técnicos</option>
                <option v-for="tech in technicians" :key="tech.id" :value="tech.id">
                  {{ tech.name }}
                </option>
              </select>
            </div>

            <div class="col-md-2">
              <label class="form-label">Status</label>
              <select class="form-select" v-model="filters.status">
                <option value="">Todos os status</option>
                <option v-for="status in statuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>

            <div class="col-md-2">
              <label class="form-label">Data Inicial</label>
              <input
                type="date"
                class="form-control"
                v-model="filters.dateFrom"
              >
            </div>

            <div class="col-md-2">
              <label class="form-label">Data Final</label>
              <input
                type="date"
                class="form-control"
                v-model="filters.dateTo"
              >
            </div>

            <div class="col-12">
              <button class="btn btn-secondary" @click="clearFilters">
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Orders Grid -->
      <div class="row g-4">
        <div v-for="order in filteredOrders" :key="order.id" class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-white">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">#{{ order.id }}</h5>
                <span class="badge" :class="getStatusClass(order.status)">
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>
            </div>
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">{{ order.company }}</h6>
              <h5 class="card-title">{{ order.userName }}</h5>
              
              <p class="card-text">{{ order.description }}</p>
              
              <div class="mt-3">
                <small class="text-muted d-block">
                  <strong>Técnico:</strong> {{ getTechnicianName(order.technician) }}
                </small>
                <small class="text-muted d-block">
                  <strong>Criado em:</strong> {{ new Date(order.createdAt).toLocaleString() }}
                </small>
                <small class="text-muted d-block">
                  <strong>Agendado para:</strong> {{ new Date(order.scheduledDate).toLocaleString() }}
                </small>
                <small v-if="order.completedDate" class="text-muted d-block">
                  <strong>Concluído em:</strong> {{ new Date(order.completedDate).toLocaleString() }}
                </small>
              </div>

              <div class="mt-3" v-if="order.observations">
                <strong class="d-block mb-1">Observações:</strong>
                <p class="card-text">{{ order.observations }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div v-if="filteredOrders.length === 0" class="text-center my-5">
        <p class="text-muted">Nenhum atendimento encontrado com os filtros selecionados.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  border-bottom: 1px solid #eee;
  padding: 1rem;
}

.card-body {
  padding: 1.5rem;
}

.badge {
  padding: 0.5em 0.75em;
}

.form-control:focus, .form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>