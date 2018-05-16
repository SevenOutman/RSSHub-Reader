<template>
  <div class="bilibili-user-activity">
    <template v-if="result">
      <div class="container">
        <h2>{{ result.title }}</h2>
        <!--<p>{{result.description.replace(' - 使用 RSSHub(https://github.com/DIYgod/RSSHub) 构建', '')}}</p>-->
      </div>
      <div class="user-activities container">
        <a :href="activity.link" target="_blank" rel="noopener noreferrer" class="user-activity"
           v-for="activity of result.items" :key="activity.guid">
          <div class="activity-time">{{ activity.isoDate | time }}</div>
          <div class="activity-content"
               v-html="formatContent(activity.content)"></div>
          <div class="activity-desc">{{activity.title}}</div>
        </a>
      </div>
    </template>
    <cell-group title="查询UP主动态" v-if="!$route.params.uid">
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

  const today = new Date()

  export default {
    name: 'UserActivity',
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
        return `/bilibili/user/dynamic/${this.uid}`
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
      formatContent(content) {
        return content
      },
      async addToFavorites() {
        let title
        if (!this.result) {
          await this.fetchRSS()
        }
        title = this.result.title.replace(' 的 bilibili 动态', '')
        this.$store.commit('addFavorite', {
          type: 'bilibili',
          desc: 'UP主动态',
          title,
          path: `/bilibili/user-video/${this.uid}`,
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
  .bilibili-user-activity {
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
          img {
            display: block;
            max-width: 100%;
            border-radius: 4px;
          }
        }
        .activity-desc {
          font-size: 14px;
          margin-top: 1em;
        }
      }
    }
  }
</style>
