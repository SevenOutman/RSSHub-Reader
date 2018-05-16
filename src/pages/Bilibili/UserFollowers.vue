<template>
  <div class="bilibili-user-followers">
    <template v-if="result">
      <div class="container">
        <h2>{{ result.title }}</h2>
      </div>
      <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      <cell-group class="user-followers">
        <mt-cell :href="follower.link" is-link target="_blank" rel="noopener noreferrer" class="user-follower"
           v-for="follower of result.items" :key="follower.guid" :title="follower.content.split('<br>', 3)[0]" :label="follower.content.split('<br>', 3)[1]">
        </mt-cell>
      </cell-group>
    </template>
    <cell-group title="查询UP主粉丝" v-if="!$route.params.uid">
      <mt-field label="用户ID" placeholder="可在UP主主页中找到" v-model="form.uid"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!uid">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!uid" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!uid" @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'

  export default {
    name: 'UserFollowers',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          uid: this.$route.query.uid || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      uid() {
        return this.$route.params.uid || this.form.uid
      },
      rssPath() {
        return `/bilibili/user/followers/${this.uid}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      async fetchRSS() {
        Indicator.open()
        return axios(this.rssPath)
          .catch(() => Indicator.close())
          .then(async ({ data }) => {
            this.result = await parse(data)
            Indicator.close()
          })
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        title = this.result.title.replace(' 的 bilibili 粉丝', '')
        this.$store.commit('addFavorite', {
          type: 'bilibili',
          desc: 'UP主粉丝',
          title,
          path: `/bilibili/user-followers/${this.uid}`,
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
      if (this.$route.params.uid) {
        this.fetchRSS()
      }
    },
  }
</script>

<style lang="less">
  .bilibili-user-followers {
    .user-followers {
      margin-bottom: 15px;
    }
  }
</style>
