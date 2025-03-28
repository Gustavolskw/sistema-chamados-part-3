<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Sistema de Serviços</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/pedidos/novo">Novo Pedido</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pedidos/gerenciar">Gerenciar Pedidos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pedidos/historico">Histórico</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}

body {
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.nav-link.router-link-active {
  font-weight: bold;
  color: white !important;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85) !important;
}

.nav-link:hover {
  color: white !important;
}
</style>