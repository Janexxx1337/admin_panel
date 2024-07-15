import { Ref, InjectionKey, inject } from 'vue';
import Notifications from '@/components/Layout/Notifications.vue';

const requireInjection = (key: string | Symbol, defaultValue?: any) => {
  const value = inject(key, defaultValue);
  if (value === undefined) {
    throw new Error(`Missing injection: ${key.toString()}`);
  }
  return value;
};

let notifications: Ref<InstanceType<typeof Notifications>>;

export const useNotifications = () => {
  notifications = notifications || requireInjection('MessageNotifications');

  return {
    notificationInfo: notifications.value.info.bind(notifications.value),
    notificationSuccess: notifications.value.success.bind(notifications.value),
    notificationAttention: notifications.value.attention.bind(notifications.value),
    notificationError: notifications.value.error.bind(notifications.value)

  };
};
