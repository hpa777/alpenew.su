<template>
    <div>
        <label class="form__label" v-if="label">{{ label }}<span class="text-alpen_red" v-if="required">*</span></label>
        <input class="form__input" ref="field"
            :type="type" 
            :placeholder="placeholder" 
            :class="{'error': invalid}" 
            :required="required"
            v-model="val"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)">
    </div>    
</template>

<script>
import Inputmask from "inputmask";

export default {
    props: {
        value: {
            type: String
        },
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String
        },
        label: {
            type: String
        },        
        validator: {
            type: Function
        },
        required: {
            type: Boolean,
            default: false
        },
        mask: {
            type: String
        }
    },    
    mounted() {
        if (this.mask) {
            var im = new Inputmask(this.mask);
            im.mask(this.$refs.field);
        }        
    },
    computed: {
        invalid() {
            if (!this.required && this.value === '') {
                return false;
            }
            if (this.validator) {
                return !this.validator(this.value);
            }
             
        },
        val: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    }
}
</script>

<style scoped lang="scss">
   
</style>