<script setup>
import { ref, computed } from 'vue'
import PreviewComponent from '/src/components/PreviewComponent.vue'
import { useFormat } from '/src/composables/useFormat.js'
import { useDownload } from '/src/composables/useDownload.js';

const { capitalize, toPlural } = useFormat();
const { downloadFile } = useDownload();

const modelName = ref('user')

const capitalizeModel = computed(() => {
    return capitalize(modelName.value);
})

const exportedName = computed(() => {
    return "use" + capitalizeModel.value + "Store"
})

const useName = computed(() => {
    return "use" + capitalizeModel.value
})

const nameStore = computed(() => {
    return modelName.value.toLowerCase() + "Store"
})

const capitalizePluralModel = computed(() => {
    return capitalize(pluralModelName.value);
})

const pluralModelName = computed(() => {
    return toPlural(modelName.value.toLowerCase())
})

const storeContent = computed(() => {
    return `import { defineStore } from "pinia";

export const ${exportedName.value} = defineStore("${pluralModelName.value}", {
    state: () => ({
        ${pluralModelName.value}: [],
    }),
    getters: {
        find: (state) => {
            return (id) => state.${pluralModelName.value}.find((item) => item.id === id);
        },
    },
    actions: {
        set${capitalizePluralModel.value}(${pluralModelName.value}) {
            this.${pluralModelName.value} = ${pluralModelName.value};
        },
    },
});`
})

const composableContent = computed(() => {
    return `import axios from "axios";
import { ${exportedName.value} } from "/src/stores/${nameStore.value}.js";

export function ${useName.value}() {
    const ${nameStore.value} = ${exportedName.value}();

    async function get${capitalizePluralModel.value}() {
        try {
            const response = await axios.get("${pluralModelName.value}");
            ${nameStore.value}.set${capitalizePluralModel.value}(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function add${capitalizeModel.value}(data) {
        try {
            await axios.post("${pluralModelName.value}", data);
            // On successful action
        } catch (error) {
            console.log(error.message);
        }
    }

    async function update${capitalizeModel.value}(data, id) {
        try {
            await axios.put("${pluralModelName.value}/" + id, data);
            // On successful action
        } catch (error) {
            console.log(error.message);
        }
    }

    async function delete${capitalizeModel.value}(id) {
        try {
            await axios.delete("${pluralModelName.value}/" + id);
            // On successful action
        } catch (error) {
            console.log(error.message);
        }
    }

    return { get${capitalizePluralModel.value}, add${capitalizeModel.value}, update${capitalizeModel.value}, delete${capitalizeModel.value}  };
}`
})

function downloadFiles() {
    downloadFile(`${nameStore.value}.js`, storeContent.value)
    downloadFile(`${useName.value}.js`, composableContent.value, )
}

</script>

<template>
    <div class="w-full flex my-8">
        <div class="w-full space-y-6 mx-8">

            <section class="shadow rounded-xl bg-white p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="">
                        <div class="text-gray-500 text-xl mb-3">Composable Generator for Vue 3</div>
                        <div class="mb-3">
                            <label class="text-gray-500 text-xs">Singular model name</label>
                            <input v-model="modelName" type="text" class="input-primary" placeholder="Model">
                        </div>
                        <button @click="downloadFiles()" class="btn-primary">Download Files</button>
                    </div>
                    <!-- PREVIEW FILE -->
                    <div class="col-span-2 w-full">
                        <PreviewComponent :content="storeContent" :fileName="`/src/stores/${nameStore}.js`" />
                        <PreviewComponent :content="composableContent" :fileName="`/src/composables/${useName}.js`" />
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>
