<template>
    <div class="text-gray-500 text-base mb-2 cursor-pointer" @click="downloadThisFile()">
        {{ fileName }}
    </div>
    <div class="file border-4 border-dashed border-transparent w-full bg-gray-800 rounded-xl md:rounded-br-none p-4 mb-4">
        <textarea class="text-sm w-full bg-gray-800 text-white font-mono focus:outline-none"
        :rows="countLines" autocomplete="off" v-model="text" autocorrect="off" autocapitalize="off" spellcheck="false" readonly></textarea>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDownload } from "/src/composables/useDownload.js"

const props = defineProps({
	fileName: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

const text = computed(() => {
	return props.content;
})

const { downloadFile } = useDownload();

function downloadThisFile() {
    const fileName = props.fileName.split('/')[3]
    downloadFile(fileName, props.content)
}

const countLines = computed(() => {
    return text.value.split(/\r\n|\r|\n/).length;
})

</script>
