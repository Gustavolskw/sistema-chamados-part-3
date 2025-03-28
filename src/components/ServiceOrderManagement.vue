<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

interface ServiceOrder {
  id: number;
  userName: string;
  company: string;
  category: string;
  description: string;
  priority: "low" | "medium" | "high";
  scheduledDate: string;
  technician: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

interface Status {
  value: ServiceOrder["status"];
  label: string;
}

interface Priority {
  value: ServiceOrder["priority"];
  label: string;
}

interface Technician {
  id: number;
  name: string;
}

const statuses: Status[] = [
  { value: "pending", label: "Pendente" },
  { value: "in_progress", label: "Em Andamento" },
  { value: "completed", label: "Concluído" },
  { value: "cancelled", label: "Cancelado" },
];

const priorities: Priority[] = [
  { value: "low", label: "Baixa" },
  { value: "medium", label: "Média" },
  { value: "high", label: "Alta" },
];

const technicians: Technician[] = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "Pedro Oliveira" },
];

const serviceOrders = ref<ServiceOrder[]>([
  {
    id: 1,
    userName: "Carlos Roberto",
    company: "Tech Solutions LTDA",
    category: "Manutenção",
    description:
      "Problema com impressora HP LaserJet que não imprime documentos em PDF",
    priority: "high",
    scheduledDate: "2024-03-20T10:00",
    technician: 1,
    status: "pending",
    createdAt: "2024-03-18T08:30",
  },
  {
    id: 2,
    userName: "Ana Paula Silva",
    company: "Consultoria Express",
    category: "Suporte Técnico",
    description: "Configuração de rede para novo escritório com 5 computadores",
    priority: "medium",
    scheduledDate: "2024-03-21T14:00",
    technician: 2,
    status: "in_progress",
    createdAt: "2024-03-18T09:15",
  },
]);

const selectedOrder = ref<ServiceOrder | null>(serviceOrders.value[0]);

const updateOrderStatus = (
  order: ServiceOrder,
  newStatus: ServiceOrder["status"]
) => {
  order.status = newStatus;
  toast.success("Status atualizado com sucesso!");
};

const updateOrderTechnician = (
  order: ServiceOrder,
  newTechnicianId: number
) => {
  order.technician = newTechnicianId;
  toast.success("Técnico atualizado com sucesso!");
};

const closeOrder = (order: ServiceOrder) => {
  order.status = "completed";
  toast.success("Pedido concluído com sucesso!");
};

const getStatusLabel = (value: ServiceOrder["status"]) => {
  return statuses.find((s) => s.value === value)?.label || value;
};

const getTechnicianName = (id: number) => {
  return technicians.find((t) => t.id === id)?.name || "Não atribuído";
};

const getStatusClass = (status: ServiceOrder["status"]) => {
  const classes: Record<ServiceOrder["status"], string> = {
    pending: "bg-warning",
    in_progress: "bg-info",
    completed: "bg-success",
    cancelled: "bg-secondary",
  };
  return classes[status] || "bg-light";
};

const getPriorityLabel = (value: ServiceOrder["priority"]) => {
  return priorities.find((p) => p.value === value)?.label || value;
};
</script>

<template>
  <div class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-0">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Sistema de Serviços</a>
      </div>
    </nav>

    <div class="d-flex">
      <div
        class="sidebar bg-white border-end"
        style="width: 300px; height: calc(100vh - 56px); overflow-y: auto"
      >
        <div class="p-3 border-bottom">
          <h5 class="mb-0">Pedidos de Serviço</h5>
        </div>
        <div class="list-group list-group-flush">
          <button
            v-for="order in serviceOrders"
            :key="order.id"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedOrder?.id === order.id }"
            @click="selectedOrder = order"
          >
            <div class="d-flex justify-content-between align-items-center">
              <strong>#{{ order.id }} - {{ order.userName }}</strong>
              <span class="badge" :class="getStatusClass(order.status)">
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
            <small class="text-muted d-block">{{ order.company }}</small>
            <small class="text-muted">{{
              new Date(order.scheduledDate).toLocaleDateString("pt-BR")
            }}</small>
          </button>
        </div>
      </div>

      <div
        class="flex-grow-1 bg-light p-4"
        style="height: calc(100vh - 56px); overflow-y: auto"
      >
        <div v-if="selectedOrder" class="container">
          <div class="card shadow-sm">
            <div
              class="card-header bg-white d-flex justify-content-between align-items-center"
            >
              <h4 class="mb-0">Detalhes do Pedido #{{ selectedOrder.id }}</h4>
              <div class="btn-group">
                <button
                  v-if="
                    selectedOrder.status !== 'completed' &&
                    selectedOrder.status !== 'cancelled'
                  "
                  class="btn btn-success"
                  @click="closeOrder(selectedOrder)"
                >
                  Concluir Pedido
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="row mb-4">
                <div class="col-md-6">
                  <h6 class="text-muted mb-1">Cliente</h6>
                  <p class="h5 mb-3">{{ selectedOrder.userName }}</p>

                  <h6 class="text-muted mb-1">Empresa</h6>
                  <p class="h5 mb-3">{{ selectedOrder.company }}</p>

                  <h6 class="text-muted mb-1">Categoria</h6>
                  <p class="h5 mb-3">{{ selectedOrder.category }}</p>

                  <h6 class="text-muted mb-1">Prioridade</h6>
                  <p class="h5 mb-3">
                    {{ getPriorityLabel(selectedOrder.priority) }}
                  </p>
                </div>
                <div class="col-md-6">
                  <h6 class="text-muted mb-1">Status</h6>
                  <select
                    class="form-select mb-3"
                    :value="selectedOrder.status"
                    @change="
                      updateOrderStatus(
                        selectedOrder,
                        ($event.target as HTMLSelectElement)
                          .value as ServiceOrder['status']
                      )
                    "
                  >
                    <option
                      v-for="status in statuses"
                      :key="status.value"
                      :value="status.value"
                    >
                      {{ status.label }}
                    </option>
                  </select>

                  <h6 class="text-muted mb-1">Técnico Responsável</h6>
                  <p class="h5 mb-3">
                    {{ getTechnicianName(selectedOrder.technician) }}
                  </p>
                  <select
                    class="form-select mb-3"
                    :value="selectedOrder.technician"
                    @change="
                      updateOrderTechnician(
                        selectedOrder,
                        Number(($event.target as HTMLSelectElement).value)
                      )
                    "
                  >
                    <option
                      v-for="tech in technicians"
                      :key="tech.id"
                      :value="tech.id"
                    >
                      {{ tech.name }}
                    </option>
                  </select>

                  <h6 class="text-muted mb-1">Data Agendada</h6>
                  <p class="h5 mb-3">
                    {{
                      new Date(selectedOrder.scheduledDate).toLocaleString(
                        "pt-BR"
                      )
                    }}
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <h6 class="text-muted mb-1">Descrição do Problema</h6>
                  <p class="lead">{{ selectedOrder.description }}</p>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-12">
                  <h6 class="text-muted mb-1">Data de Criação</h6>
                  <p class="text-muted">
                    {{
                      new Date(selectedOrder.createdAt).toLocaleString("pt-BR")
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center mt-5">
          <p class="text-muted">Selecione um pedido para ver os detalhes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
}

.list-group-item {
  border-left: none;
  border-right: none;
  padding: 1rem;
  cursor: pointer;
}

.list-group-item.active {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  color: #212529;
}

.badge {
  padding: 0.5em 0.75em;
}

.card {
  border: none;
  border-radius: 10px;
}

.card-header {
  border-bottom: 1px solid #eee;
  padding: 1.5rem;
}

.card-body {
  padding: 1.5rem;
}
</style>
