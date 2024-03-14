import { toast } from '@zerodevx/svelte-toast'

export const toast_success = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': 'green',
    '--toastColor': 'white',
    '--toastProgressBackground': 'darkgreen'
  }
})

export const toast_error = (m: string) => toast.push(m, {
    theme: {
      '--toastBackground': 'red',
      '--toastColor': 'white',
      '--toastProgressBackground': 'darkred'
    }
  })

  export const toast_warning = (m: string) => toast.push(m, {
    theme: {
      '--toastBackground': 'orange',
      '--toastColor': 'white',
      '--toastProgressBackground': 'darkorange'
    }
  })