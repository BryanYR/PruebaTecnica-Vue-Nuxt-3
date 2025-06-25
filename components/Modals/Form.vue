<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/yup'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const rulesName = {
  regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  maxLength: 50,
}

const toast = useToastNotify()
const loadingSubmit = ref(false)

const { handleSubmit, values, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      names: yup
        .string()
        .required('Los nombres son requeridos')
        .matches(
          /^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ ]*$/,
          'Solo se permiten letras y espacios, y no puede comenzar con espacios'
        )
        .test('no-empty-spaces', 'No puede contener solo espacios', (value) => {
          return value?.trim().length > 0
        }),
      email: yup
        .string()
        .required('El correo electrónico es requerido')
        .email('Correo electrónico inválido'),
      observations: yup.string(),
    })
  ),
})

const RegisterForm = async () => {
  loadingSubmit.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success('Registro exitoso')
    resetForm()
  } catch (error) {
    console.error(error)
    toast.error('Error al registrarse')
  } finally {
    loadingSubmit.value = false
  }
}

const onSubmit = (event: Event) => {
  handleSubmit(async () => {
    await RegisterForm()
  })(event)
}
</script>
<template>
  <form class="flex flex-col gap-4 my-6" @submit="onSubmit">
    <div>
      <Field name="names" v-slot="{ field }">
        <input
          v-bind="field"
          type="text"
          v-input-restrict="rulesName"
          placeholder="Nombres"
          :disabled="loadingSubmit"
          class="w-full px-4 py-2 border rounded"
        />
      </Field>
      <ErrorMessage name="names" class="text-sm text-red-500 mt-1" />
    </div>
    <div>
      <Field name="email" v-slot="{ field }">
        <input
          v-bind="field"
          type="email"
          :disabled="loadingSubmit"
          placeholder="Correo electrónico"
          class="w-full px-4 py-2 border rounded"
        />
      </Field>
      <ErrorMessage name="email" class="text-sm text-red-500 mt-1" />
    </div>
    <div>
      <Field name="observations" v-slot="{ field }">
        <textarea
          v-bind="field"
          rows="6"
          placeholder="Comentario (opcional)"
          class="w-full px-4 py-2 border rounded"
        />
      </Field>
      <ErrorMessage name="observations" class="text-sm text-red-500 mt-1" />
    </div>
    <button
      :disabled="!meta.valid || loadingSubmit"
      class="mx-auto disabled:bg-gray-400 bg-primary py-2 px-8 text-white rounded-xl transition-colors ease-in-out duration-300 hover:bg-primary/85"
    >
      {{ loadingSubmit ? 'Registrando...' : 'Registrarse' }}
    </button>
  </form>
</template>
