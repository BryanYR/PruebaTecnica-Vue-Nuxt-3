declare global {
  interface HTMLInputElement {
    _restrictConfig?: {
      regex?: RegExp;
      maxLength?: number;
    };
    _inputRestrict?: (e: Event) => void;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("input-restrict", {
    mounted(el: HTMLInputElement, binding) {
      const applyRestrictions = (regex: RegExp | undefined, maxLength: number | undefined) => {
        const handleInput = (e: Event) => {
          const target = e.target as HTMLInputElement;
          let val = target.value;
          let modified = false;

          // Aplicar regex por carácter
          if (regex instanceof RegExp) {
            const newVal = Array.from(val)
              .filter((char) => regex.test(char))
              .join("");

            if (newVal !== val) {
              val = newVal;
              modified = true;
            }
          }

          // Aplicar maxLength
          if (typeof maxLength === "number" && val.length > maxLength) {
            val = val.slice(0, maxLength);
            modified = true;
          }

          if (modified) {
            target.value = val;
            target.dispatchEvent(new Event("input", { bubbles: true }));
          }
        };

        el.addEventListener("input", handleInput);
        (el as any)._inputRestrict = handleInput;
      };

      // Guardar valores iniciales
      el._restrictConfig = {
        regex: binding.value?.regex,
        maxLength: binding.value?.maxLength,
      };

      applyRestrictions(binding.value?.regex, binding.value?.maxLength);
    },

    updated(el: HTMLInputElement, binding) {
      const newConfig = {
        regex: binding.value?.regex,
        maxLength: binding.value?.maxLength,
      };

      const oldConfig = el._restrictConfig || {};

      // Solo si cambian los valores, se vuelve a aplicar
      const changed =
        oldConfig.regex?.toString() !== newConfig.regex?.toString() || oldConfig.maxLength !== newConfig.maxLength;

      if (changed) {
        // Quitar el anterior
        if ((el as any)._inputRestrict) {
          el.removeEventListener("input", (el as any)._inputRestrict);
        }

        // Aplicar los nuevos
        const handleInput = (e: Event) => {
          const target = e.target as HTMLInputElement;
          let val = target.value;
          let modified = false;

          if (newConfig.regex instanceof RegExp) {
            const validChars = val.match(newConfig.regex);
            const newVal = validChars ? validChars.join("") : "";
            if (newVal !== val) {
              val = newVal;
              modified = true;
            }
          }

          if (typeof newConfig.maxLength === "number" && val.length > newConfig.maxLength) {
            val = val.slice(0, newConfig.maxLength);
            modified = true;
          }

          if (modified) {
            target.value = val;
            target.dispatchEvent(new Event("input", { bubbles: true }));
          }
        };

        el.addEventListener("input", handleInput);
        (el as any)._inputRestrict = handleInput;
        el._restrictConfig = newConfig;
      }
    },

    unmounted(el: HTMLInputElement) {
      if ((el as any)._inputRestrict) {
        el.removeEventListener("input", (el as any)._inputRestrict);
        delete (el as any)._inputRestrict;
        delete (el as any)._restrictConfig;
      }
    },
  });
});
