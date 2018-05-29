<template>
  <div class="jike-user">
    <template v-if="result">
      <div class="container">
        <h2>{{ result.title }} <small><a :href="result.link" target="_blank" rel="noopener noreferrer" >前往用户主页>></a></small></h2>
        <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      </div>
      <div class="user-activities container">
        <a :href="activity.link" target="_blank" rel="noopener noreferrer" class="user-activity"
           v-for="activity of result.items" :key="activity.guid">
          <div class="activity-time">{{ activity.isoDate | time }}</div>
          <div class="activity-content"
               v-html="activity.content"></div>
        </a>
      </div>
    </template>
    <cell-group title="查询用户动态" v-if="!$route.params.id">
      <mt-field label="用户ID" placeholder="可在用户页URL中找到" v-model="form.id"></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!id">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!id" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!id" @click="removeFromFavorites">取消收藏</mt-button>
    </button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'

  const today = new Date()

  export default {
    name: 'User',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          id: this.$route.query.id || '',
        },

        result: null,
        popupVisible: false,
      }
    },
    computed: {
      id() {
        return this.$route.params.id || this.form.id
      },
      rssPath() {
        return `/jike/user/${this.id}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    filters: {
      time(isoTime) {
        let date = new Date(isoTime)
        if (date.getFullYear() === today.getFullYear()) {
          return isoTime.substr(5, 5)
        }
        return isoTime.substr(0, 10)
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
        title = this.result.title.replace('的即刻动态', '')
        this.$store.commit('addFavorite', {
          type: 'jike',
          desc: '用户动态',
          title,
          path: `/jike/user/${this.id}`,
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
      if (this.$route.params.id) {
        this.fetchRSS()
      }
    },
  }
</script>

<style lang="less">
  .jike-user {
    .user-activities {
      padding: 10px;
      margin-bottom: 15px;
      background-color: rgb(244, 245, 247);

      .user-activity {
        padding: 10px;
        background-color: #fff;
        border-radius: 4px;
        display: block;
        &:not(:last-child) {
          margin-bottom: 10px;
        }

        .activity-time {
          opacity: 0.5;
          font-size: 14px;
          margin-bottom: 1em;
        }

        .activity-content {
          & > img {
            display: block;
            max-width: 100%;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
