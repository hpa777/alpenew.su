<template>
    <div class="h-full overflow-y-auto px-8 lg:px-20" ref="container" v-if="!success">
        <div class="mb-6 text-3xl font-semibold text-alpen_blue lg:mb-9 lg:text-[2.5rem]">Форма о нежелательном явлении</div>

        <wizard-step :valid="page1Valid" :page="1" :currentPage="currentPage" @changePage="changePage">
            <div class="items-end justify-between lg:flex">
                <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:text-3xl">{{ currentPage }}<span class="mr-4 text-alpen_gray">/6</span>Информация о пациенте</div>
                <div class="text-xl font-normal"><span class="text-alpen_red">*</span> – Поля, обязательные для заполнения</div>
            </div>

            <div class="my-6 lg:mt-14 xl:-mb-20">
                <div class="flex flex-wrap">
                    <div class="mb-6 w-full lg:w-1/3 lg:pr-4">
                        <div class="form__label">Сообщение<span class="text-alpen_red">*</span></div>
                        <div class="flex space-x-2">
                            <label class="w-1/2">
                                <input class="peer sr-only" type="radio" name="group1" value="Первичное" v-model="model.message" />
                                <div class="form__radio peer-checked:bg-alpen_red">Первичное</div>
                            </label>
                            <label class="w-1/2">
                                <input class="peer sr-only" type="radio" name="group1" value="Вторичное" v-model="model.message" />
                                <div class="form__radio peer-checked:bg-alpen_red">Вторичное</div>
                            </label>
                        </div>
                    </div>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="ФИО" :required="true" v-model="model.fullname" placeholder="Иванов Иван Иванович"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" label="Возраст" :required="true" v-model="model.age" placeholder="Например, 50 лет"></text-input>
                </div>

                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Вес, кг" v-model="model.weight" placeholder="Например, 70 кг"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Рост, см" v-model="model.height" placeholder="Например, 165 см"></text-input>
                    <div class="mb-6 flex w-full items-end space-x-2 lg:w-[8.4rem]">
                        <label class="w-1/2">
                            <input class="peer sr-only" type="radio" name="group2" value="муж" v-model="model.sex" />
                            <div class="form__radio peer-checked:bg-alpen_red">муж</div>
                        </label>
                        <label class="w-1/2">
                            <input class="peer sr-only" type="radio" name="group2" value="жен" v-model="model.sex" />
                            <div class="form__radio peer-checked:bg-alpen_red">жен</div>
                        </label>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Адрес проживания" v-model="model.address" placeholder="Москва, Ивановская, д 5"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" type="tel" label="Номер телефона" v-model="model.phone" placeholder="+7 (999) 999-99-99"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" type="email" :required="true" label="E-mail" v-model="model.email" placeholder="example@mail.ru"></text-input>
                </div>

                <div class="w-full xl:w-1/2 xl:pr-8">
                    <label class="form__label">Вид лечения</label>
                    <div class="flex flex-wrap">
                        <label class="mb-4 w-full lg:w-1/3 lg:pr-2">
                            <input class="peer sr-only" type="radio" name="group3" value="Амбулаторное" v-model="model.typeTreatment" />
                            <div class="form__radio peer-checked:bg-alpen_red">Амбулаторное</div>
                        </label>
                        <label class="mb-4 w-full lg:w-1/3 lg:pr-2">
                            <input class="peer sr-only" type="radio" name="group3" value="Стационарное" v-model="model.typeTreatment" />
                            <div class="form__radio peer-checked:bg-alpen_red">Стационарное</div>
                        </label>
                        <label class="w-full lg:w-1/3">
                            <input class="peer sr-only" type="radio" name="group3" value="Самолечение" v-model="model.typeTreatment" />
                            <div class="form__radio peer-checked:bg-alpen_red">Самолечение</div>
                        </label>
                    </div>
                </div>
            </div>
        </wizard-step>

        <wizard-step :valid="true" :page="2" :canSkip="true" :currentPage="currentPage" @changePage="changePage">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:text-3xl">{{ currentPage }}<span class="mr-4 text-alpen_gray">/6</span>Информация о назначившем лечение</div>
            <div class="my-6 lg:mt-14 xl:mb-44">
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Название лечебного учреждения" v-model="model.nameMedicalInstitution" placeholder="Больница №1"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Адрес учреждения" v-model="model.addressMedicalInstitution" placeholder="Москва, Ивановская, д 5"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" label="ФИО врача" v-model="model.doctorName" placeholder="Иванов Иван Иванович"></text-input>
                </div>
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" type="tel" label="Номер телефона" v-model="model.phoneMedicalInstitution" placeholder="+7 (999) 999-99-99"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" type="email" label="E-mail" v-model="model.emailMedicalInstitution" placeholder="example@mail.ru"></text-input>
                </div>
            </div>
        </wizard-step>

        <wizard-step :valid="page3Valid" :page="3" :currentPage="currentPage" @changePage="changePage" :showWarn="true">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:flex lg:text-3xl">
                <span class="mr-4">{{ currentPage }}<span class="text-alpen_gray">/6</span></span>
                <span>Лекарственный препарат, предположительно вызвавший негативные симптомы</span>
            </div>
            <div class="my-6 lg:mt-14 xl:mb-2">
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" label="Название препарата" v-model="model.drugName" placeholder="Название"></text-input>
                    <text-input class="mb-6 w-full lg:w-2/3" :required="true" label="Показания для назначения" v-model="model.appointment" placeholder="Показания врача"></text-input>
                </div>
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Путь введения" v-model="model.path" placeholder="Например, сублингвальный"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" label="Суточная доза" v-model="model.dailyDose" placeholder="Суточная доза"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3" label="Серия препарата" v-model="model.drugSeries" placeholder="См. на упакавке"></text-input>
                </div>

                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" type="date" label="Дата начала приёма" v-model="model.drugDateStart" placeholder="01.01.2023"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" type="date" label="Дата прекращения приёма" v-model="model.drugDateEnd" placeholder="01.01.2023"></text-input>
                </div>
            </div>
        </wizard-step>

        <wizard-step :valid="page4Valid" :page="4" :currentPage="currentPage" @changePage="changePage" :showWarn="true">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:flex lg:text-3xl">
                <span class="mr-4">{{ currentPage }}<span class="text-alpen_gray">/6</span></span>
                <span>Негативные симптомы, предположительно связанные с приёмом</span>
            </div>
            <div class="my-6 lg:mt-14 xl:mb-44">
                <text-input class="mb-6 w-full" :required="true" label="Перечислите симптомы" v-model="model.symptoms" placeholder="Опишите нежелательное явление или неэффективность препарата"></text-input>
                <div class="flex flex-wrap">
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" type="date" v-model="model.eventDateStart" label="Дата начала явления" placeholder="01.01.2023"></text-input>
                    <text-input class="mb-6 w-full lg:w-1/3 lg:pr-4" :required="true" type="date" v-model="model.eventDateEnd" label="Дата окончания явления" placeholder="01.01.2023"></text-input>
                    <div class="mb-6 w-full lg:w-1/3">
                        <label class="form__label">Исход нежелательного явления</label>
                        <select class="form__input" v-model="model.eventResult">
                            <option hidden>Выберите из списка</option>
                            <option>Полное выздоровление</option>
                            <option>Неполное выздоровление</option>
                            <option>Выздоровление с осложнением</option>
                            <option>Без улучшения</option>
                        </select>
                    </div>
                </div>
            </div>
        </wizard-step>

        <wizard-step :valid="page5Valid" :page="5" :currentPage="currentPage" @changePage="changePage" :showWarn="true" :canSkip="true">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:flex lg:text-3xl">
                <span class="mr-4">{{ currentPage }}<span class="text-alpen_gray">/6</span></span>
                <span>Сопутствующая терапия в течение последних 3х месяцев</span>
            </div>
            <p class="mt-3 pl-16 text-xl">Включая препараты и БАДы, которые Вы принимаете самостоятельно</p>
            <div class="my-6 lg:mt-14">
                <drug-input v-for="(item, key) in model.concomitantTherapy" :key="key" v-model="model.concomitantTherapy[key]"></drug-input>
                <div class="flex items-center">
                    <button class="form__btn px-6 py-2" @click="addConcomitantTherapy">&plus;</button>
                    <span class="ml-3 text-xl">Добавить прерапарат</span>
                </div>
            </div>
        </wizard-step>

        <wizard-step :page="6" :currentPage="currentPage" :hideButtons="true">
            <div class="mb-4 text-2xl font-medium text-alpen_blue lg:mb-0 lg:flex lg:text-3xl">
                <span class="mr-4">{{ currentPage }}<span class="text-alpen_gray">/6</span></span>
                <span>Перечислите сопутствующие заболевания</span>
            </div>
            <div class="my-6 lg:mt-14 xl:mb-44">
                <text-input class="mb-6 w-full" label="Ваши сопутствующие заболевания" v-model="model.comorbidities" placeholder="Название заболевания"></text-input>
                <text-input class="mb-6 w-full" label="Аллергические реакции на прием лекарств" v-model="model.allergicReactions" placeholder="Название препарата"></text-input>
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
                <button class="form__btn mb-4 lg:ml-8" :disabled="!agree" @click="submit">Отправить</button>
            </div>
        </wizard-step>
    </div>
    <div class="flex h-full" v-else>        
        <div class="m-auto text-center">
            <h2 class="font-semibold text-alpen_blue text-4xl mb-8">Спасибо!</h2>
            <p class="text-xl mb-8">Форма успешно отправлена.</p>
            <button class="form__btn w-48" @click="close($event)">Ok</button>
        </div>
    </div>
</template>

<script>
import TextInput from './TextInput'
import WizardStep from './WizardStep.vue'
import DrugInput from './DrugInput.vue'
import { VALID_EMAIL } from './validators'
import MailApi from '../services/MailApi';
export default {
    components: { WizardStep, TextInput, DrugInput },
    data: () => ({
        currentPage: 1,
        agree: true,
        success: false,
        model: {
            template: 'adverse_form_mail',
            message: '',
            fullname: '',
            age: '',
            weight: '',
            height: '',
            sex: '',
            address: '',
            phone: '',
            email: '',
            typeTreatment: '',

            nameMedicalInstitution: '',
            addressMedicalInstitution: '',
            doctorName: '',
            phoneMedicalInstitution: '',
            emailMedicalInstitution: '',

            drugName: '',
            appointment: '',
            path: '',
            dailyDose: '',
            drugSeries: '',
            drugDateStart: '',
            drugDateEnd: '',

            symptoms: '',
            eventDateStart: '',
            eventDateEnd: '',
            eventResult: '',

            concomitantTherapy: [
                {
                    name: '',
                    path: '',
                    dateStart: '',
                    dateEnd: '',
                    appointment: '',
                },
            ],

            comorbidities: '',
            allergicReactions: ''
        },
    }),
    computed: {
        page1Valid() {
            return this.model.message !== '' && this.model.fullname !== '' && this.model.age !== '' && VALID_EMAIL(this.model.email)
        },
        page3Valid() {
            return this.model.drugName !== '' && this.model.appointment !== '' && this.model.drugDateStart !== '' && this.model.drugDateEnd !== ''
        },
        page4Valid() {
            return this.model.symptoms !== '' && this.model.eventDateStart !== '' && this.model.eventDateEnd !== ''
        },
        page5Valid() {
            return this.model.concomitantTherapy.every((item) => (item.name == '' && item.dateStart == '' && item.dateEnd == '') || (item.name !== '' && item.dateStart !== '' && item.dateEnd !== ''))
        },
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
        addConcomitantTherapy() {
            this.model.concomitantTherapy.push({
                name: '',
                path: '',
                dateStart: '',
                dateEnd: '',
                appointment: '',
            })
            this.$nextTick(() => {
                this.$refs.container.scrollTo(0, this.$refs.container.scrollHeight)
            })
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
