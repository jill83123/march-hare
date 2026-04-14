<template>
  <LoadingAnimation :active="isLoading" :lock-scroll="true"></LoadingAnimation>

  <main data-aos="fade-up" data-aos-duration="800" class="mt-24 sm:mt-[126px] min-h-[calc(100vh_-_330px)]">
    <div class="container font-medium text-black-light">
      <div class="flex flex-col justify-center lg:gap-20 lg:flex-row">
        <article class="lg:mb-16 lg:w-8/12 xl:w-6/12">
          <div class="flex flex-wrap items-center gap-1 mb-1 text-sm">
            <span class="mr-1 text-base material-symbols-outlined" style="font-variation-settings: 'FILL' 1">
              home </span
            ><RouterLink to="/" class="leading-[18px] hover:border-b hover:border-gray-500">首頁</RouterLink>
            <span class="material-symbols-outlined"> chevron_right </span>
            <RouterLink to="/blog" class="leading-[18px] hover:border-b hover:border-gray-500">部落格</RouterLink>
            <span class="material-symbols-outlined"> chevron_right </span>
            <span class="text-brown-500">{{ articleDetails.title }}</span>
          </div>

          <ul class="flex gap-1 mb-5 text-xs text-gray-400">
            <li>＃{{ articleDetails.category }}</li>
            <li v-for="tag in articleDetails.tag" :key="tag">＃{{ tag }}</li>
          </ul>

          <div class="flex items-center mb-1 text-sm tracking-widest text-gray-500">
            <span class="mr-1 text-base material-symbols-outlined"> schedule </span>
            <time>{{ $filters.onlyDate(articleDetails.create_at) }}</time>
          </div>

          <h2 class="mb-6 text-2xl font-semibold text-black sm:text-3xl font-noto-serif">{{ articleDetails.title }}</h2>

          <img
            :src="articleDetails.image"
            :alt="articleDetails.title"
            class="sm:float-right sm:w-[300px] sm:ml-6 mb-6"
          />

          <div
            v-html="articleDetails.content"
            class="article-content min-h-[330px] mb-2 tracking-wide border-b-2 border-dashed lg:mb-7 text-black-light pb-10 lg:pb-7 border-brown-100"
          ></div>

          <RouterLink to="/blog" class="hidden text-brown-500 lg:inline-block"
            ><span class="pb-1 mr-1 align-middle material-symbols-outlined"> undo </span>返回列表</RouterLink
          >
        </article>

        <aside class="lg:w-4/12 xl:w-3/12 lg:mb-16">
          <h3
            class="pb-2 text-lg font-semibold tracking-widest text-center border-b-2 border-dashed text-brown-500 border-brown-100"
            >近期文章</h3
          >
          <ul class="flex flex-col gap-5 mt-6 mb-12 lg:mb-0">
            <li v-for="item in asideList" :key="item.id">
              <RouterLink :to="`/blog/article/${item.id}`" class="flex gap-2">
                <img :src="item.image" :alt="item.title" class="w-[100px] object-cover" />
                <div>
                  <h4>{{ item.title }}</h4>
                  <div class="flex items-center mb-1 text-xs tracking-widest text-gray-400">
                    <span class="mr-1 text-sm material-symbols-outlined"> schedule </span>
                    <time>{{ $filters.onlyDate(item.create_at) }}</time>
                  </div>
                </div>
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import articleStore from '../../stores/articleStore';

export default {
  data() {
    return {
      articleDetails: {},
      isLoading: false,
    };
  },
  computed: {
    ...mapState(articleStore, ['articleList', 'asideList']),
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.getArticle();
      },
    },
  },
  methods: {
    ...mapActions(articleStore, ['getArticles']),

    getArticle() {
      this.isLoading = true;

      const { id } = this.$route.params;
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/article/${id}`;

      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.articleDetails = response.data.article;
          document.title = `${response.data.article.title}｜三月兔－MarchHare Bakery`;
        }
        this.isLoading = false;
      });
    },
  },
  mounted() {
    this.getArticle();
    this.getArticles();
  },
};
</script>

<style>
.article-content a {
  @apply text-info;
}

.article-content ul {
  list-style: disc;
  list-style-position: inside;
}

.article-content ol {
  list-style: decimal;
  list-style-position: inside;
}
</style>
