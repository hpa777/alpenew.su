import Vue from 'vue'

function requireAll(r) {
    r.keys().forEach(r)
}
requireAll(require.context('../img/icons/', true, /\.svg$/))

Vue.component('index-slider', require('./components/IndexSlider.vue').default)
Vue.component('product-filter', require('./components/ProductFilter.vue').default)
Vue.component('horizontal-slider', require('./components/HorizontalSlider.vue').default)
Vue.component('adverse-form', require('./components/AdverseForm.vue').default)
Vue.component('quality-form', require('./components/QualityForm.vue').default)
new Vue({
    el: '#vue-app',
})


document.addEventListener('DOMContentLoaded', function () {
	let isTablet = window.matchMedia("(max-width: 768px)");
	//mobile menu
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        document.getElementById('main-menu').classList.remove('hidden')
    })
    document.getElementById('mobile-menu-close-btn').addEventListener('click', () => {
        document.getElementById('main-menu').classList.add('hidden')
    })    
    document.querySelectorAll('.main-menu__item>a').forEach(el => el.addEventListener('click', e => {
        if (isTablet.matches && !e.currentTarget.classList.contains('active')) {
            e.preventDefault()
            e.currentTarget.classList.add('active')
        }
    }))
    //forms
    document.querySelectorAll('.form__close').forEach(el => el.addEventListener('click', e => {
        e.currentTarget.closest('.form').classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }))
    document.querySelectorAll('[data-formid]').forEach(el => el.addEventListener('click', e => {
        document.getElementById(e.currentTarget.dataset.formid).classList.add('flex');
        document.body.classList.add('overflow-hidden');        
    }))
})
