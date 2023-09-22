<template>
    <div>
        <div class="flex flex-wrap">
            <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true"
                :value="value.name" @input="update('name', $event)"
                label="Название препарата" placeholder="Название"></text-input> 
            <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4"
                :value="value.path" @input="update('path', $event)"
                label="Путь введения" placeholder="Например, сублингвальный"></text-input>            
        </div>
        <div class="flex flex-wrap">
            <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" type="date"
                :value="value.dateStart" @input="update('dateStart', $event)"
                label="Дата начала приема" placeholder="01.01.2023"></text-input> 
            <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" type="date"
                :value="value.dateEnd" @input="update('dateEnd', $event)"
                label="Дата окончания приема" placeholder="01.01.2023"></text-input>                              
        </div>
        <text-input class="mb-6 w-full"
            :value="value.appointment" @input="update('appointment', $event)"
            label="Показания для назначения" placeholder="Показания врача"></text-input>
    </div>
</template>

<script>
import TextInput from './TextInput.vue'
export default {
    components: { TextInput },
    props: [ 'value' ],
    methods: {
        update(key, value) {
            this.$emit("input", { ...this.value, [key]: value });
        }
    }
}
</script>

<style>

</style>