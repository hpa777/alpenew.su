<template>
    <div class="wizard__item" v-if="page == currentPage">
        <slot></slot>
        <div class="items-center justify-end lg:flex" v-if="!hideButtons">
            <div v-if="showWarn" class="mr-auto text-xl font-normal mb-4"><span class="text-alpen_red">*</span> – Поля, обязательные для заполнения</div>
            <button class="form__btn mb-4" @click="changePage('prev')" v-if="page > 1 && canPrev !== false">Назад</button>
            <button class="form__btn mb-4 lg:ml-8" @click="changePage('next')" v-if="canSkip">Пропустить</button>
            <button class="form__btn mb-4 lg:ml-8" @click="changePage('next')" :disabled="!valid">Продолжить</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        valid: {
            type: Boolean,
            default: false,
        },
        page: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        canPrev: {
            type: Boolean,
            default: true,
        },
        canSkip: {
            type: Boolean,
            default: false,
        },
        showWarn: {
            type: Boolean,
            default: false
        },
        hideButtons: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        changePage(dir) {
            this.$emit('changePage', dir)
        },
    },
}
</script>

<style></style>
