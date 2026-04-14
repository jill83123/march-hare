<template>
  <LoadingAnimation :active="state.isLoading" :lock-scroll="true"></LoadingAnimation>

  <main data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
    <section class="container pb-14 pt-28">
      <div class="flex flex-col justify-center lg:flex-row">
        <div class="md:pr-10 lg:w-5/12 xl:w-4/12">
          <RouterLink to="/shop" class="inline-block mb-4">
            <div class="flex items-center">
              <span class="mr-1 material-symbols-outlined"> keyboard_double_arrow_left </span>返回商品列表
            </div>
          </RouterLink>
          <img
            :src="currentImages"
            :alt="productDetails.title"
            class="object-cover w-full mb-4 rounded-lg aspect-square"
            :style="{ opacity: currentImageOpacity, transition: 'opacity 0.15s' }"
          />
          <ul class="flex flex-wrap gap-3">
            <li>
              <a href="#">
                <img
                  :src="productDetails.imageUrl"
                  :alt="productDetails.title + 1"
                  class="w-[106px] object-cover aspect-square rounded-lg"
                  :class="{ 'opacity-50': currentImages === productDetails.imageUrl }"
                  @click.prevent="changeCurrentImage(productDetails.imageUrl)"
                />
              </a>
            </li>
            <li v-for="(img, i) in productDetails.imagesUrl" :key="img">
              <a href="#">
                <img
                  :src="img"
                  :alt="productDetails.title + (i + 2)"
                  class="w-[106px] object-cover aspect-square rounded-lg"
                  :class="{ 'opacity-50': currentImages === img }"
                  @click.prevent="changeCurrentImage(img)"
                />
              </a>
            </li>
          </ul>
        </div>
        <!-- content -->
        <div class="pt-5 sm:pt-10 lg:w-5/12">
          <div class="flex mb-2">
            <div
              class="flex items-center w-11/12 text-3xl font-bold tracking-wide text-black sm:text-4xl font-noto-serif"
            >
              <!-- recommend -->
              <div class="inline-block mr-3" v-if="productDetails.is_recommend">
                <p
                  class="font-sans w-[32px] h-[32px] flex justify-center items-center text-white text-sm font-medium rounded-full bg-brown-300"
                  >推</p
                >
              </div>
              <h2 class="inline-block">{{ productDetails.title }}</h2>
            </div>
            <button
              class="border-2 rounded-full w-[40px] h-[40px] ml-auto inline-block border-brown-100"
              :class="favorite.some((item) => item.id === productDetails.id) ? 'border-danger' : 'border-brown-100'"
              title="加入收藏"
              @click.prevent="toggleFavorite(productDetails)"
              ><span
                class="align-middle text-danger material-symbols-outlined"
                style="
                  font-variation-settings:
                    'FILL' 1,
                    'opsz' 24;
                "
                v-if="favorite.some((item) => item.id === productDetails.id)"
              >
                favorite
              </span>
              <span class="align-middle text-brown-100 material-symbols-outlined" v-else> favorite </span></button
            >
          </div>
          <p class="mb-3 text-black-light">
            <span :class="{ 'line-through mr-2 text-gray-400': productDetails.origin_price !== productDetails.price }"
              >NT {{ productDetails.origin_price }} 元</span
            >
            <span class="font-bold text-success" v-if="productDetails.origin_price !== productDetails.price"
              >NT {{ productDetails.price }} 元</span
            >
            / {{ productDetails.unit }}
            <span
              class="self-end px-2 ml-2 text-xs text-white rounded-full font-montserrat bg-success"
              v-if="productDetails.origin_price !== productDetails.price"
              >SALE</span
            ></p
          >
          <div class="mb-4" v-html="productDetails.description"></div>
          <div>
            <button
              class="group relative pb-1 mb-1 flex w-full items-center rounded-none border-0 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
              type="button"
              data-te-collapse-init
              data-te-collapse-collapsed
              data-te-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <h3
                class="font-noto-serif font-medium text-xl relative inline-block after:-z-[1] after:-left-1 after:-right-1 mb-2 after:bg-warning after:absolute after:top-1/2 after:bottom-0"
                >詳細內容</h3
              >
              <span
                class="ml-2 h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            <div
              id="collapseTwo"
              class="!visible hidden mb-4 mt-2"
              data-te-collapse-item
              aria-labelledby="headingTwo"
              data-te-parent="#accordionExample"
            >
              <div
                v-html="productDetails.content"
                class="ingredients-list !visible"
                id="collapseOne"
                data-te-collapse-item
                data-te-collapse-show
              ></div>
            </div>
          </div>
          <div class="mb-6">
            <h3
              class="font-noto-serif font-medium text-xl relative inline-block after:-z-[1] after:-left-1 after:-right-1 mb-4 after:bg-warning after:absolute after:top-1/2 after:bottom-0"
              >購買數量</h3
            >

            <div class="flex items-center mb-2">
              <button class="pr-1" @click.prevent="updateBuyNum(-1)" :disabled="buyNum === 1">
                <span
                  class="text-2xl align-bottom text-brown-300 material-symbols-outlined"
                  :style="{ color: buyNum === 1 ? '#d1d5db' : '' }"
                  >remove</span
                >
              </button>
              <input
                type="number"
                min="1"
                class="outline-none focus:outline-none max-w-[60px] bg-transparent border text-center pt-[1px] pb-[2px]"
                v-model="buyNum"
                @change="updateBuyNum(buyNum)"
              />
              <span class="hidden pl-2 text-sm text-gray-400 sm:inline-block"> 個</span>
              <button @click.prevent="updateBuyNum(1)">
                <span class="pl-1 text-2xl align-bottom text-brown-300 material-symbols-outlined">add</span>
              </button>
            </div>
            <div class="flex min-[460px]:items-center max-[460px]:flex-col justify-between lg:items-start">
              <p class="text-sm lg:mb-0 lg:self-end max-[460px]:mb-3"
                >總計 <span class="mx-1 text-lg font-bold tracking-wider font-noto-serif">{{ cachePrice }}</span> 元
              </p>
              <div class="flex gap-4">
                <RouterLink
                  to="/checkout/cart"
                  type="button"
                  class="z-10 flex items-center px-8 py-2 text-sm font-medium leading-normal tracking-wider uppercase transition duration-150 ease-in-out border rounded-full border-brown-300 focus:outline-none focus:ring-1 hover:opacity-80 text-brown-300"
                  >前往結帳</RouterLink
                >
                <button
                  type="button"
                  class="relative z-10 flex items-center px-8 py-2 text-sm font-medium leading-normal tracking-wider text-white uppercase transition duration-150 ease-in-out rounded-full bg-brown-300 focus:outline-none focus:ring-0 hover:opacity-80 disabled:bg-gray-300"
                  @click.prevent="addToCart(productDetails, buyNum)"
                  :disabled="!productDetails.is_enabled"
                  >加入購物車
                  <span
                    v-if="!productDetails.is_enabled"
                    class="flex items-center gap-1 absolute bottom-[105%] right-0 justify-center left-0 text-danger"
                    ><span class="text-lg material-symbols-outlined"> error </span>目前無法購買</span
                  >
                </button>
              </div>
            </div>
          </div>
          <div class="px-5 py-3 mb-4 border-2 border-gray-300 border-dotted rounded-lg">
            <h4 class="mb-2">消費滿 NT $1,500，享有免運費優惠</h4>
            <div class="flex flex-col justify-between sm:flex-row">
              <p class="text-sm text-black-light"
                >[付款] 信用卡(一次付清)、貨到付款、ATM 轉帳<br />[運送] 黑貓低溫宅配、工作室自取</p
              >
              <RouterLink to="/faq" target="_blank" class="self-end text-sm">
                <span
                  class="hidden mr-1 text-xl align-middle rotate-45 xl:inline-block material-symbols-outlined text-info"
                >
                  link
                </span>
                <p class="inline-block font-bold leading-[22px] border-b border-info text-info">常見問題</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="sm:pt-4 pb-[72px] bg-neutral-50 bg-opacity-50">
      <div class="container">
        <h3
          data-aos="fade-up"
          data-aos-duration="800"
          class="mb-10 text-[40px] font-medium tracking-widest text-center font-maru text-brown-500"
          >更多商品⋯</h3
        >
        <swiper
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="200"
          :navigation="true"
          :slidesPerView="4"
          :loop="true"
          :modules="modules"
          :breakpoints="{
            0: { slidesPerView: 1 },

            500: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1550: { slidesPerView: 4 },
            1920: { slidesPerView: 4 },
          }"
          class="relative lg:px-20 mySwiper after:lg:absolute after:lg:bg-neutral-50 after:lg:top-0 after:lg:-ml-20 after:lg:z-[10] after:lg:bottom-0 after:lg:w-20 before:lg:absolute before:lg:bg-neutral-50 before:lg:top-0 before:lg:right-0 before:lg:z-[10] before:lg:bottom-0 before:lg:w-20"
        >
          <swiper-slide v-for="product in moreProduct" :key="product.id" class="h-auto">
            <div class="w-full h-full px-2 xl:px-3 productCard">
              <div class="relative flex flex-col h-full overflow-hidden border rounded-xl">
                <!-- image -->
                <div class="relative overflow-hidden card-img aspect-square">
                  <img class="relative object-cover w-full h-full" :src="product.imageUrl" :alt="product.title" />
                  <!-- favorite button -->
                  <button class="absolute top-0 right-0 z-10 p-4" @click.prevent="toggleFavorite(product)">
                    <span
                      class="text-3xl text-red-400 material-symbols-outlined"
                      style="
                        font-variation-settings:
                          'FILL' 1,
                          'opsz' 24;
                      "
                      v-if="favorite.some((item) => item.id === product.id)"
                    >
                      favorite
                    </span>
                    <span class="text-3xl text-red-400 material-symbols-outlined" v-else> favorite </span>
                  </button>
                  <!-- recommend -->
                  <div class="absolute top-0 left-0 z-10 p-4" v-if="product.is_recommend">
                    <p
                      class="w-[36px] h-[36px] flex justify-center items-center text-white text-sm font-medium rounded-full bg-brown-300"
                      >推</p
                    >
                  </div>
                  <div class="absolute -translate-y-1/4 -translate-x-1/2 z-[5] left-1/2 top-1/2 view-detail hidden">
                    <p
                      href="#"
                      class="flex items-center py-2 pl-8 pr-6 text-sm font-medium leading-normal tracking-wider text-white uppercase whitespace-nowrap z-5"
                      >查看商品資訊<span class="ml-1 material-symbols-outlined"> keyboard_double_arrow_right </span>
                    </p>
                  </div>
                </div>
                <!-- content -->
                <div class="p-5 min-h-[150px] flex flex-col justify-between grow">
                  <div>
                    <h3 class="mb-1 text-lg font-medium text-black lg:text-xl">{{ product.title }}</h3>
                    <div class="flex flex-wrap -ml-1 text-sm text-gray-400 gap-x-1">
                      <span
                        class="z-10 py-[1px] px-1 hover:bg-brown-100 hover:text-white"
                        @click.prevent="changeSort(product.category)"
                        ># {{ product.category }}</span
                      >
                      <span
                        class="z-10 py-[1px] px-1 hover:bg-brown-100 hover:text-white"
                        @click.prevent="tagSearch(tag)"
                        v-for="tag in product.tag"
                        :key="tag"
                        ># {{ tag }}</span
                      >
                    </div>
                  </div>
                  <div class="flex flex-col gap-1 sm:justify-between sm:items-center sm:flex-row">
                    <div class="flex flex-col">
                      <div class="flex items-center">
                        <span
                          class="mr-2 font-medium whitespace-nowrap md::text-xl text-black-light"
                          :class="{ 'text-success': product.price !== product.origin_price }"
                          >NT {{ $filters.currency(product.price) }}</span
                        >
                        <span
                          class="text-[10px] block px-2 text-white rounded-full md:hidden lg:block font-montserrat op bg-success"
                          v-if="product.price !== product.origin_price"
                          >SALE</span
                        >
                      </div>
                      <span
                        class="text-xs text-gray-500 line-through"
                        :class="{ hidden: product.price === product.origin_price }"
                      >
                        NT {{ $filters.currency(product.origin_price) }}
                      </span>
                    </div>
                    <button
                      type="button"
                      class="z-10 flex items-center self-end px-6 py-2 text-sm font-medium leading-normal tracking-wider text-white uppercase transition duration-150 ease-in-out rounded-full whitespace-nowrap w-fit btn-add-cart bg-brown-300 focus:outline-none focus:ring-0 active:bg-cerulean-700 hover:opacity-80"
                      @click.prevent="addToCart(product, 1)"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
                <RouterLink
                  :to="'/product/' + product.id"
                  class="after:z-[9] after:top-0 after:left-0 after:right-0 after:absolute after:inset-0"
                ></RouterLink>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </main>
</template>

<script>
import { Collapse, initTE } from 'tw-elements';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { mapState, mapActions } from 'pinia';
import cartStore from '../../stores/cartStore';
import favoriteStore from '../../stores/favoriteStore';
import productStore from '../../stores/productStore';

export default {
  data() {
    return {
      productDetails: {},
      currentImages: '',
      currentImageOpacity: 1,
      buyNum: 1,
      cachePrice: 0,
      state: {
        isLoading: false,
      },
      modules: [Navigation],
    };
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'cartTotalPrice', 'status', 'currentStep']),
    ...mapState(favoriteStore, ['favorite']),
    ...mapState(productStore, ['productList']),

    moreProduct() {
      const list = this.productList.filter(
        (product) => !(product.id === this.productDetails.id) && product.category === this.productDetails.category
      );
      const other = this.productList.filter(
        (product) => !(product.id === this.productDetails.id) && product.category !== this.productDetails.category
      );
      list.push(...other);
      return list;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.getProductDetails();
      },
    },
  },
  methods: {
    ...mapActions(cartStore, ['delCartItem', 'updateCart', 'getCartList', 'updateCurrentStep', 'addToCart']),
    ...mapActions(favoriteStore, ['toggleFavorite']),
    ...mapActions(productStore, ['getProducts']),

    getProductDetails() {
      this.state.isLoading = true;

      const { id } = this.$route.params;
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/product/${id}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.productDetails = res.data.product;
          this.currentImages = res.data.product.imageUrl;
          this.cachePrice = res.data.product.price;
          this.state.isLoading = false;
          document.title = `${res.data.product.title}｜三月兔－MarchHare Bakery`;
        }
      });
    },
    changeCurrentImage(img) {
      this.currentImageOpacity = 0;
      setTimeout(() => {
        this.currentImages = img;
        this.currentImageOpacity = 1;
      }, 150);
    },
    updateBuyNum(num) {
      if (num === 1 || num === -1) {
        this.buyNum += num;
      } else if (num <= 0) {
        this.buyNum = 1;
        this.cachePrice = this.productDetails.price;
      }
      this.cachePrice = this.productDetails.price;
      this.cachePrice *= this.buyNum;
    },
  },
  mounted() {
    initTE({ Collapse });
    this.getProductDetails();
    this.getCartList();
    this.getProducts();
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss">
.ingredients-list ul {
  list-style: disc;
  list-style-position: inside;
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}

.swiper-button {
  &-prev {
    width: 60px;
    height: 60px;
    left: var(--swiper-navigation-sides-offset, 10px);
    top: 50%;
    z-index: 100;
    background: url('../../assets/images/swiper-button-prev.png') no-repeat;
    @apply hidden lg:flex;
  }

  &-next {
    width: 60px;
    height: 60px;
    right: var(--swiper-navigation-sides-offset, 10px);
    top: 50%;
    z-index: 100;
    background: url('../../assets/images/swiper-button-next.png') no-repeat;
    @apply hidden lg:flex;
  }
}

.swiper-button-prev::after,
.swiper-button-next::after {
  content: '';
}

#collapseTwo ul {
  margin-left: 0.5rem;
}
</style>
