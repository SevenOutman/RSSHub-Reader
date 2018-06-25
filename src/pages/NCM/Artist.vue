<template>
  <div class="ncm-artist">
    <div class="result" v-if="result">
      <div class="result-header">
        <h2>{{ result.title }}
          <small><a :href="result.link" target="_blank" rel="noopener noreferrer">歌手详情>></a></small>
        </h2>
      </div>
      <div class="result-items">
        <a
          v-for="playlist of playlists"
          :key="playlist.guid"
          :href="playlist.link"
          target="_blank"
          rel="noopener noreferrer"
          class="result-item playlist-music"
        >
          <div class="music-cover" v-html="playlist.cover">
          </div>
          <div class="music-info">
            <div class="music-title">{{ playlist.title }}</div>
            <div class="result-item-desc music-album">{{ playlist.date }}</div>
          </div>
        </a>
      </div>
    </div>
    <cell-group title="查询歌手专辑" v-if="!$route.params.id">
      <mt-field label="歌手ID" placeholder="可在歌手详情页URL中找到" v-model="form.id"></mt-field>
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
  import { Indicator, Toast } from 'mint-ui'
  import moment from 'moment'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import feeds from 'rsshub.js/feeds'

  export default {
    name: 'Artist',
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
        return `/ncm/artist/${this.id}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
      playlists() {
        if (!this.result) return []
        return this.result.items.map(({guid, link, title, isoDate, content}) => {
          const [artist, album, date, cover] = content.split('<br>')
          return {
            guid,
            link,
            title,
            cover,
            date
          }
        })
      }
    },
    filters: {
      YMD(isoTime) {
        return moment(isoTime).format('YYYY-MM-DD')
      }
    },
    methods: {
      async fetchRSS() {
        Indicator.open()
        return feeds.ncm.artist({ id: this.id })
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
        title = this.result.title
        this.$store.commit('addFavorite', {
          type: 'ncm',
          desc: this.$route.meta.title,
          title,
          path: `/ncm/artist/${this.id}`,
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
  .ncm-artist {
    .result-item.playlist-music {
      padding: 0;
      display: flex;
      overflow: hidden;

      .music-cover {
        width: 64px;
        height: 64px;
        flex-shrink: 0;
        overflow: hidden;
        font-size: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          vertical-align: bottom;
          display: block;
          height: 100%;
        }
      }
      .music-info {
        flex-grow: 1;
        padding: 10px;
        overflow: hidden;
        .music-title, .music-album {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .music-album {
          margin: 0;
        }
      }
    }
  }
</style>
