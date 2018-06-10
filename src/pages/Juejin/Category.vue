<template>
  <div>
    <div class="result" v-if="result">
      <div class="result-header">
        <h2>{{ result.title }}</h2>
      </div>
      <div class="result-items">
        <a
          class="result-item"
          target="_blank"
          rel="noopener noreferrer"
          v-for="post of result.items"
          :key="post.guid"
          :href="post.link"
        >
          <div class="result-item-time">{{ post.isoDate | time }}</div>
          <div class="result-item-title" v-html="post.title"></div>
          <div class="result-item-content" v-html="post.content"></div>
        </a>
      </div>
    </div>
    <cell-group title="查询分类" v-if="!$route.params.category">
      <mt-field label="分类" placeholder="选择分类" v-model="categoryName"
                readonly
                @focus.native.prevent
                @click.native.prevent.stop="popupVisible = true" disable-clear></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" @click="addToFavorites">加入收藏</mt-button>
      <mt-button type="danger" size="large" v-else @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width:100%"
    >
      <mt-picker :slots="slots" @change="onValuesChange" value-key="name"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import feeds from 'rsshub.js/feeds'

  const categories = [
    { name: '前端', id: 'frontend' },
    { name: 'Android', id: 'android' },
    { name: 'iOS', id: 'ios' },
    { name: '后端', id: 'backend' },
    { name: '设计', id: 'design' },
    { name: '产品', id: 'product' },
    { name: '工具资源', id: 'freebie' },
    { name: '阅读', id: 'article' },
    { name: '人工智能', id: 'ai' }
  ]

  export default {
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          category: this.$route.params.category || '',
        },

        result: null,
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: categories
          }
        ]
      }
    },
    computed: {
      categoryName: {
        get() {
          const category = categories.find(({ id }) => id === this.category)
          return category && category.name
        },
        set() {

        }
      },
      category() {
        return this.$route.params.category || this.form.category
      },
      rssPath() {
        return `/juejin/category`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      onValuesChange(picker, values) {
        this.form.category = values[0].id
      },
      async fetchRSS() {
        Indicator.open()
        return feeds.juejin.category({ category: this.category })
          .rss2()
          .catch(() => Indicator.close())
          .then(async (data) => {
            this.result = data
            Indicator.close()
          })
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        this.$store.commit('addFavorite', {
          type: 'juejin',
          desc: this.$route.meta.title,
          title: this.result.title.replace('掘金', ''),
          path: `/juejin/category/${this.category}`,
          rss: this.rssPath,
          autoUpdate: true,
        })
        Toast({
          message: '收藏好了~',
          duration: 1500,
        })
      },
      removeFromFavorites() {
        this.$store.commit('removeFavorite', this.rssPath)
        Toast({
          message: '已取消收藏',
          duration: 1500,
        })
      },
    },
    created() {
      if (this.$route.params.category) {
        this.fetchRSS()
      }
    },
  }
</script>

