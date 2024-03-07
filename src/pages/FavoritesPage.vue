<script setup>
import CardList from '../components/CardsList.vue'
import FiltersSearch from '@/components/FiltersSearch.vue'
import PaginationsVue from '@/components/PaginationsVue.vue'

// import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'
import NotOrders from '@/components/NotOrders.vue'
import { computed, onMounted, reactive, watch } from 'vue'

const rootStore = useCounterStore()
const { likeCardsUser, statusPage, filters } = storeToRefs(rootStore)

const paginationsFavorites = reactive({
  current_page: 1,
  per_page: 8,
  beforePage: 0,
  afterPage: 7
})

const total_pages = computed(() =>
  Math.ceil(likeCardsUser.value.length / paginationsFavorites.per_page)
)

function clickNumPage(num) {
  paginationsFavorites.current_page = num
  paginationsFavorites.beforePage = paginationsFavorites.per_page * (num - 1)
  paginationsFavorites.afterPage = paginationsFavorites.per_page * num - 1
}

watch(total_pages, () => {
  clickNumPage(total_pages.value)
})

//фильтрация по названию
watch(
  () => filters.value.searchName,
  () => {
    likeCardsUser.value = JSON.parse(localStorage.getItem('likeCards'))
    likeCardsUser.value = likeCardsUser.value.filter(
      (i) => i.name.toLowerCase().indexOf(filters.value.searchName.toLowerCase()) >= 0
    )
    clickNumPage(1)
  }
)

//сортировка по цене
watch(
  () => filters.value.optionsCard,
  () => {
    switch (filters.value.optionsCard) {
      case 'name':
        likeCardsUser.value.sort((a, b) => a.name.localeCompare(b.name))
        break

      case 'price':
        likeCardsUser.value.sort((a, b) => a.price - b.price)

        break

      case '-price':
        likeCardsUser.value.sort((a, b) => b.price - a.price)
        break

      default:
        break
    }
  }
)

onMounted(() => {
  filters.value.searchName = ''
  filters.value.optionsCard = 'name'
})
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between mt-8 mb-8">
    <h2 class="text-xl sm:text-3xl font-bold mb-6 md:mb-0">Закладки</h2>
    <FiltersSearch />
  </div>

  <CardList
    v-if="likeCardsUser.length > 0"
    :cards="
      likeCardsUser.filter(
        (el, index) =>
          index >= paginationsFavorites.beforePage && index <= paginationsFavorites.afterPage
      )
    "
    @onClickLikeCard="rootStore.addLikeCard"
    @onClickAddBasket="rootStore.addCardBasket"
  />
  <NotOrders v-else :statusPage="statusPage.statusFavorites" />

  <PaginationsVue
    :clickNumPage="clickNumPage"
    :total_pages="total_pages"
    :current_page="paginationsFavorites.current_page"
  />
  <!-- ----- -->
</template>
