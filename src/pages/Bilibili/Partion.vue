<template>
  <div class="bilibili-partion">
    <div class="container" v-if="result">
      <h2>{{ result.title }}</h2>
      <div class="user-videos">
        <a :href="video.link" target="_blank" rel="noopener noreferrer" class="user-video"
           v-for="video of result.items" :key="video.guid">
          <div class="video-cover"
               v-html="video.content.match(/<img .+?>/)[0]"></div>
          <div class="video-info">{{video.title}}</div>
        </a>
      </div>
    </div>
    <cell-group title="查询分区视频" v-if="!$route.params.tid">
      <mt-field label="分区" placeholder="点击选择" v-model="partionName"
                @focus.native.prevent
                @click.native.prevent.stop="popupVisible = true" disable-clear></mt-field>
    </cell-group>
    <button-group>
      <mt-button type="default" size="large" @click="fetchRSS" :disabled="!tid">立即查询</mt-button>
      <mt-button type="primary" size="large" v-if="!isFavorite" :disabled="!tid" @click="addToFavorites">加入收藏
      </mt-button>
      <mt-button type="danger" size="large" v-else :disabled="!tid" @click="removeFromFavorites">取消收藏</mt-button>
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
  import axios from 'axios'
  import { Indicator, Toast } from 'mint-ui'
  import CellGroup from '@/components/weui/cell-group'
  import ButtonGroup from '@/components/button-group'
  import parse from '@/utils/parseRss'

  const partions = [
    {
      name: '动画',
      children: [
        { name: 'MAD·AMV', id: 24 },
        { name: 'MMD·3D', id: 25 },
        { name: '短片·手书·配音', id: 47 },
        { name: '综合', id: 27 }
      ]
    },
    {
      name: '番剧',
      children: [
        { name: '连载动画', id: 33 },
        { name: '完结动画', id: 32 },
        { name: '资讯', id: 51 },
        { name: '官方延伸', id: 152 }
      ]
    },
    {
      name: '国创',
      children: [
        { name: '国产动画', id: 153 },
        { name: '国产原创相关', id: 168 },
        { name: '布袋戏', id: 169 },
        { name: '资讯', id: 170 }
      ]
    },
    {
      name: '音乐',
      children: [
        { name: '原创音乐', id: 28 },
        { name: '翻唱', id: 31 },
        { name: 'VOCALOID·UTAU', id: 30 },
        { name: '演奏', id: 59 },
        { name: '三次元音乐', id: 29 },
        { name: 'OP/ED/OST', id: 54 },
        { name: '音乐选集', id: 130 }
      ]
    },
    {
      name: '舞蹈',
      children: [
        { name: '宅舞', id: 20 },
        { name: '三次元舞蹈', id: 154 },
        { name: '舞蹈教程', id: 156 }
      ]
    },
    {
      name: '游戏',
      children: [
        { name: '单机游戏', id: 17 },
        { name: '电子竞技', id: 171 },
        { name: '手机游戏', id: 172 },
        { name: '网络游戏', id: 65 },
        { name: '桌游棋牌', id: 173 },
        { name: 'GMV', id: 121 },
        { name: '音游', id: 136 },
        { name: 'Mugen', id: 19 }
      ]
    },
    {
      name: '科技',
      children: [
        { name: '趣味科普人文', id: 124 },
        { name: '野生技术协会', id: 122 },
        { name: '演讲·公开课', id: 39 },
        { name: '星海', id: 96 },
        { name: '数码', id: 95 },
        { name: '机械', id: 98 },
        { name: '汽车', id: 176 }
      ]
    },
    {
      name: '生活',
      children: [
        { name: '搞笑', id: 138 },
        { name: '日常', id: 21 },
        { name: '美食圈', id: 76 },
        { name: '动物圈', id: 75 },
        { name: '手工', id: 161 },
        { name: '绘画', id: 162 },
        { name: 'ASMR', id: 175 },
        { name: '运动', id: 163 },
        { name: '其他', id: 174 }
      ]
    },
    {
      name: '鬼畜',
      children: [
        { name: '鬼畜调教', id: 22 },
        { name: '音MAD', id: 26 },
        { name: '人力VOCALOID', id: 126 },
        { name: '教程演示', id: 127 }
      ]
    },
    {
      name: '时尚',
      children: [
        { name: '美妆', id: 157 },
        { name: '服饰', id: 158 },
        { name: '健身', id: 164 },
        { name: '资讯', id: 159 }
      ]
    },
    {
      name: '广告',
      children: [
        { name: '广告', id: 166 }
      ]
    },
    {
      name: '娱乐',
      children: [
        { name: '综艺', id: 71 },
        { name: '明星', id: 137 },
        { name: 'Korea相关', id: 131 }
      ]
    },
    {
      name: '影视',
      children: [
        { name: '影视杂谈', id: 182 },
        { name: '影视剪辑', id: 183 },
        { name: '短片', id: 85 },
        { name: '预告·资讯', id: 184 },
        { name: '特摄', id: 86 }
      ]
    }
  ]

  export default {
    name: 'Partion',
    components: { ButtonGroup, CellGroup },
    data() {
      return {
        form: {
          tid: this.$route.query.tid || '',
        },

        result: null,
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: partions,
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: partions[0].children,
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    },
    computed: {
      flattenedPartions() {
        return partions.reduce((acc, { name: parentName, children }) => (
          [
            ...acc,
            ...children.map(({ name, id }) => ({ fullname: `${parentName}-${name}`, id }))
          ]
        ), [])
      },
      partionName: {
        get() {
          const partion = this.flattenedPartions.find(({ id }) => id === this.tid)
          return partion && partion.fullname
        },
        set() {

        }
      },
      tid() {
        return this.$route.params.tid || this.form.tid
      },
      rssPath() {
        return `/bilibili/partion/${this.tid}`
      },
      isFavorite() {
        return !!this.$store.state.favorites.find(({ rss }) => rss === this.rssPath)
      },
    },
    methods: {
      onValuesChange(picker, values) {
        this.form.tid = values[1].id
        picker.setSlotValues(1, values[0].children)
      },
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
        title = this.partionName
        this.$store.commit('addFavorite', {
          type: 'bilibili',
          desc: '分区视频',
          title,
          path: `/bilibili/partion/${this.tid}`,
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
      if (this.$route.params.tid) {
        this.fetchRSS()
      }
    },
  }
</script>

<style lang="less">
  .bilibili-partion {
    .user-videos {
      margin-bottom: 15px;

      .user-video {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #eee;

        .video-cover {
          flex-shrink: 0;
          height: 60px;
          border-radius: 4px;
          margin-right: 10px;
          overflow: hidden;

          img {
            display: block;
            height: 100%;
          }
        }
        .video-info {
          flex-grow: 1;
          font-size: 14px;
        }
      }
    }
  }
</style>
