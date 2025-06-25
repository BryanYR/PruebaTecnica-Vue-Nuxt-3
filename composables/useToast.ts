// composables/useToastNotify.ts
import { useToast, TYPE } from 'vue-toastification'

export function useToastNotify() {
  const toast = useToast()

  const success = (message: string, options = {}) => {
    toast(message, { type: TYPE.SUCCESS, ...options })
  }

  const error = (message: string, options = {}) => {
    toast(message, { type: TYPE.ERROR, ...options })
  }

  const warning = (message: string, options = {}) => {
    toast(message, { type: TYPE.WARNING, ...options })
  }

  const info = (message: string, options = {}) => {
    toast(message, { type: TYPE.INFO, ...options })
  }

  return {
    success,
    error,
    warning,
    info,
  }
}
