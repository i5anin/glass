<template>
  <div class="container p-4 border rounded">
    <h3 class="mb-3">Информация о компоненте</h3>
    <p><strong>Имя компонента:</strong> {{ componentName }}</p>
    <p><strong>API компонента:</strong> {{ apiStyle }}</p>

    <!-- Пропсы -->
    <CollapsibleSection
      v-if="componentProps.length"
      title="Пропсы"
    >
      <PropsList :propsList="componentProps" />
    </CollapsibleSection>

    <!-- Методы -->
    <CollapsibleSection
      v-if="hasMethods"
      title="Методы"
    >
      <MethodsList
        :ownMethods="componentMethods.ownMethods"
        :externalMethods="componentMethods.externalMethods"
      />
    </CollapsibleSection>

    <!-- События -->
    <CollapsibleSection
      v-if="componentEmits.length"
      title="События"
    >
      <EmitsList :emitsList="componentEmits" />
    </CollapsibleSection>

    <!-- Дочерние компоненты -->
    <CollapsibleSection
      v-if="componentChildren.length"
      title="Дочерние компоненты"
    >
      <ChildrenList :childrenList="componentChildren" />
    </CollapsibleSection>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CollapsibleSection from './components/CollapsibleSection.vue';
import PropsList from './components/PropsList.vue';
import MethodsList from './components/MethodsList.vue';
import EmitsList from './components/EmitsList.vue';
import ChildrenList from './components/ChildrenList.vue';

const props = defineProps({
  targetComponent: {
    type: Object,
    required: true,
  },
});

const componentName = computed(() => props.targetComponent?.name || 'Неизвестно');

const apiStyle = computed(() => {
  if (props.targetComponent?.setup) return 'Composition API';
  if (
    props.targetComponent?.data ||
    props.targetComponent?.methods ||
    props.targetComponent?.computed
  )
    return 'Options API';
  return 'Неизвестно';
});

const componentProps = computed(() => {
  const rawProps = props.targetComponent?.props || {};
  if (typeof rawProps !== 'object') return [];

  return Object.entries(rawProps).map(([key, value]) => {
    let type = 'unknown';
    if (value?.type) {
      if (Array.isArray(value.type)) {
        type = value.type.map((t) => t.name || 'unknown').join(' | ');
      } else {
        type = value.type.name || 'unknown';
      }
    } else if (typeof value === 'function') {
      type = value.name || 'unknown';
    }

    return {
      name: key,
      type,
      default: value?.default || null,
    };
  });
});

const componentMethods = computed(() => {
  let ownMethods = [];
  let externalMethods = [];

  if (props.targetComponent?.$options) {
    const setupResult = props.targetComponent;
    ownMethods = Object.keys(setupResult).filter(
      (key) => !key.startsWith('_')
    );
    if (setupResult.$options.methods) {
      externalMethods = Object.keys(setupResult.$options.methods).filter(
        (key) => !key.startsWith('_')
      );
    }
  } else if (props.targetComponent?.setup) {
    try {
      const setupResult = props.targetComponent.setup();
      ownMethods = Object.keys(setupResult).filter(
        (key) => !key.startsWith('_')
      );
    } catch (error) {
      // Обработка ошибки удалена по вашему запросу
    }
  }

  return { ownMethods, externalMethods };
});



const hasMethods = computed(() => {
  return (
    componentMethods.value.ownMethods.length > 0 ||
    componentMethods.value.externalMethods.length > 0
  );
});

const componentEmits = computed(() => {
  if (Array.isArray(props.targetComponent?.emits)) {
    return props.targetComponent.emits;
  } else if (typeof props.targetComponent?.emits === 'object') {
    return Object.keys(props.targetComponent.emits);
  } else {
    return [];
  }
});

const componentChildren = computed(() => {
  const rawComponents = props.targetComponent?.components || {};
  return Object.values(rawComponents);
});
</script>

<style>
.container {
  max-width: 800px;
}
</style>
