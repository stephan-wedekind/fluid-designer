import { createApp, reactive } from 'vue';

const eventBus = reactive({});
const app = createApp({});

app.config.globalProperties.$bus = eventBus;

export default app;