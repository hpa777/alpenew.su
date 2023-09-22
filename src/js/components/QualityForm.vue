<template>
    <div class="h-full overflow-y-auto px-8 lg:px-20" ref="container" v-if="!success">
        <div class="mb-6 text-3xl font-semibold text-alpen_blue lg:mb-9 lg:text-[2.5rem]">Анкета о качестве наших препаратов</div>

        <wizard-step :valid="page1Valid" :page="1" :currentPage="currentPage" @changePage="changePage" :showWarn="true">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:text-3xl">{{ currentPage }}<span class="mr-4 text-alpen_gray">/3</span>Информация по препарату</div>
            <div class="my-6 lg:mt-14 xl:mb-2">
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Название препарата" v-model="model.drugName" placeholder="Название"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Форма выпуска" v-model="model.releaseForm" placeholder="Например, таблетки"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" label="Номер серии" v-model="model.seriesNumber" placeholder="См. на упаковке" :required="true"></text-input>
                </div>
                <div class="flex flex-wrap">
                    <div class="mb-6 w-full lg:w-1/3 lg:pr-4">
                        <label class="form__label">Срок годности</label>
                        <div class="flex items-center">
                            <input class="form__input" type="date" v-model="model.expirationDateStart" />
                            <span class="px-1 text-xl">&minus;</span>
                            <input class="form__input" type="date" v-model="model.expirationDateEnd" />
                        </div>
                    </div>
                    <div class="mb-6 w-full lg:w-2/3">
                        <div class="form__label">Соответствует ли внешний вид препарата инструкции</div>
                        <div class="flex space-x-2 lg:w-96">
                            <label class="w-1/2">
                                <input class="peer sr-only" type="radio" name="group1" value="Да" v-model="model.appearance" />
                                <div class="form__radio peer-checked:bg-alpen_red">Да</div>
                            </label>
                            <label class="w-1/2">
                                <input class="peer sr-only" type="radio" name="group1" value="Нет" v-model="model.appearance" />
                                <div class="form__radio peer-checked:bg-alpen_red">Нет</div>
                            </label>
                        </div>
                    </div>
                </div>
                <text-input class="mb-6 w-full" label="Описание несоотвествия" v-model="model.description" placeholder="Опишите своими словами, что не так"></text-input>
            </div>
        </wizard-step>

        <wizard-step :valid="page2Valid" :page="2" :currentPage="currentPage" @changePage="changePage" :showWarn="true">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:text-3xl">{{ currentPage }}<span class="mr-4 text-alpen_gray">/3</span>Источник информации</div>
            <div class="my-6 lg:mt-14 xl:mb-2">
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Фамилия" v-model="model.firstName" placeholder="Иванов" :required="true"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Имя" v-model="model.lastName" placeholder="Иван" :required="true"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" label="Отчество" v-model="model.surname" placeholder="Иванович"></text-input>
                </div>
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Адрес" v-model="model.address" placeholder="Москва, Ивановская, д 5"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" type="tel" :required="true" label="Номер телефона" v-model="model.phone" placeholder="+7 (999) 999-99-99"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" type="email" :required="true" label="E-mail" v-model="model.email" placeholder="example@mail.ru"></text-input>
                </div>
                <text-input class="mb-6 w-full" label="Где приобретен препарат" v-model="model.wherePurchased" placeholder="Адрес, название организации" :required="true"></text-input>
            </div>
        </wizard-step>

        <wizard-step :page="3" :currentPage="currentPage" :hideButtons="true">
            <div class="items-end justify-between lg:flex">
                <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:text-3xl">{{ currentPage }}<span class="mr-4 text-alpen_gray">/3</span>Контактная информация</div>
                <div class="text-xl font-normal"><span class="text-alpen_red">*</span> – Поля, обязательные для заполнения</div>
            </div>
            <div class="my-6 lg:mt-14 xl:mb-2">
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Дата сообщения" v-model="model.messageDate" type="date"></text-input>
                    <text-input class="mb-6 w-full lg:w-2/3" label="Учетная запись" v-model="model.account"></text-input>
                </div>
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Фамилия" v-model="model.contactFirstName" placeholder="Иванов"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Имя" v-model="model.contactLastName" placeholder="Иван"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" label="Отчество" v-model="model.contactSurname" placeholder="Иванович"></text-input>
                </div>
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Адрес" v-model="model.contactAddress" placeholder="Москва, Ивановская, д 5"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" type="tel" :required="true" label="Номер телефона" v-model="model.contactPhone" placeholder="+7 (999) 999-99-99"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" type="email" :required="true" label="E-mail" v-model="model.contactEmail" placeholder="example@mail.ru"></text-input>
                </div>
                <text-input class="mb-6 w-full" label="Комментарии" v-model="model.comments"></text-input>
            </div>
            <div class="items-center justify-end lg:flex">
                <div class="mb-4 mr-auto flex items-center text-xl font-normal">
                    <label class="flex h-14 w-14 cursor-pointer rounded-md border border-alpen_gray">
                        <input type="checkbox" class="peer sr-only" v-model="agree" />
                        <div class="m-auto h-10 w-10 rounded-md peer-checked:bg-alpen_red"></div>
                    </label>
                    <span class="ml-4">Согласие на <a class="underline hover:no-underline" href="">обработку персональных данных</a></span>
                </div>
                <button class="form__btn mb-4" @click="changePage('prev')">Назад</button>
                <button class="form__btn mb-4 lg:ml-8" :disabled="page3Valid" @click="submit">Отправить</button>
            </div>
        </wizard-step>
    </div>
    <div class="flex h-full" v-else>        
        <div class="m-auto text-center">
            <h2 class="font-semibold text-alpen_blue text-4xl mb-8">Спасибо!</h2>
            <p class="text-xl mb-8">Анкета успешно отправлена.</p>
            <button class="form__btn w-48" @click="close($event)">Ok</button>
        </div>
    </div>
</template>

<script>
import TextInput from './TextInput';
import WizardStep from './WizardStep.vue';
import { VALID_EMAIL } from './validators';
import MailApi from '../services/MailApi';
export default {
    components: { WizardStep, TextInput },
    data: () => ({
        currentPage: 1,
        agree: true,
        success: false,
        model: {
            template: 'quality_form_mail',
            drugName: '',
            releaseForm: '',
            seriesNumber: '',
            expirationDateStart: '',
            expirationDateEnd: '',
            appearance: '',
            description: '',

            lastName: '',
            firstName: '',
            surname: '',
            address: '',
            phone: '',
            email: '',
            wherePurchased: '',

            messageDate: '',
            account: '',
            contactLastName: '',
            contactFirstName: '',
            contactSurname: '',
            contactAddress: '',
            contactPhone: '',
            contactEmail: '',
            comments: '',
        },
    }),
    computed: {
        page1Valid() {
            return this.model.seriesNumber !== ''
        },
        page2Valid() {
            return this.model.lastName !== '' && this.model.firstName !== '' && this.model.phone !== '' && VALID_EMAIL(this.model.email) && this.model.wherePurchased !== ''
        },
        page3Valid() {
            return this.model.contactPhone == '' || !VALID_EMAIL(this.model.contactEmail) || !this.agree;
        }
    },
    methods: {
        changePage(dir) {
            if (dir === 'next') {
                this.currentPage++
            } else {
                this.currentPage--
            }
            this.$refs.container.scrollTo(0, 0)
        },
        submit() {
            this.success = true;            
            MailApi.sendMail(this.model);
        },
        close(e) {
            e.currentTarget.closest('.form').classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    },
}
</script>

<style></style>
