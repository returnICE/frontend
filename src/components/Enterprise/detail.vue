<template>
  <div class="col-12 pt-3 h-100 h-100 text-left overflow-auto " style="font-size: 15px">
    <div class="h2 text-truncate">{{ seller.name }}</div>
    <b-tabs content-class="ma-0" fill>
      <b-tab title="정보" active>
        <div class="tab-info-wrap">
          <div class="row ma-0">
          <div class="col-2 ma-0 tab-info-th ">타입</div>
          <div class="col-10 ">{{ seller.type }}</div>
        </div>
        <div class="row ma-0">
          <div class="col-2 ma-0 tab-info-th ">주소</div>
          <div class="col-10 ">{{ seller.address }}</div>
        </div>
        <div class="row ma-0">
          <div class="col-2 ma-0 tab-info-th ">번호</div>
          <div class="col-10 ">{{ seller.phone }}</div>
        </div>
        <div class="row ma-0">
          <div class="col-2 ma-0 tab-info-th ">사진</div>
          <img class="col-10 " :src="seller.imgURL" />
        </div>
        <div class="row ma-0">
          <div class="col-2 ma-0 tab-info-th ">정보</div>
          <div v-if="seller.info" class="col-10">{{ seller.info }}</div>
          <div v-else class="col-10">됒 사장님 매장소개를 등록해주세요!</div>
        </div>
        </div>
        <!-- <div>{{ seller.contractable }}</div> -->
      </b-tab>
      <b-tab title="메뉴">
        <vue-good-table
          :rows="rows"
          :columns="columns"
          styleClass="vgt-table condensed  "
        ></vue-good-table>
      </b-tab>
      <b-tab title="계약">
        <div class="col-12">
          <!-- <div class="col-8 margin-auto">
            <step-prog :steps="mystep" active-color="blue" :current-step="currentStep" icon-class="bi bi-check"></step-prog>
          </div>-->
          <ol class="prog">
            <li :class="{'is-complete':step[0]}" data-step="1">계약 가능</li>
            <li :class="{'is-complete':step[1]}" data-step="2">검토중</li>
            <li :class="{'is-complete':step[2]}" class="prog__last" data-step="3">계약 완료</li>
          </ol>
          <h4 class="text-center mt-3">{{entName}} 의 한도</h4>
          <div class="row mt-5">
            <div class="col-5 border-right h5">하루 최대 금액</div>
            <div class="col-7">{{ amountPerDay }}</div>
          </div>
          <div class="row my-3">
            <div class="col-5 border-right h5">한달 최대 금액</div>
            <div class="col-7">{{ amountPerMonth }}</div>
          </div>
          <div>
            <div class="row">
              <div class="col-6 mt-4 text-center">
                <button type="button" @click="sendContract" :disabled="inputName!==entName || !step[0]" :class="{'btn-info':step[0]}" class="btn btn-circle btn-lg">
                  <svg
                    class="bi bi-briefcase-fill"
                    width="3em"
                    height="3em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5v1.384l-7.614 2.03a1.5 1.5 0 0 1-.772 0L0 5.884V4.5zm5-2A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V3h-1v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3H5v-.5z"
                    />
                  </svg>
                </button>
                <div v-if="step[0]" class="mt-2 h5">계약서 전송</div>
                <div v-else class="mt-2 h5">계약 거절...</div>
              </div>
              <div class="col-6">
                <div class="col-12 text-center">계약서 전송을 원하시면 회사 이름을 입력해주세요</div>
                <input type="text" :placeholder='"입력) "+entName' v-model="inputName" class="form-control">
              </div>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>

    <div></div>
  </div>
</template>
<script>
import axios from 'axios'
import { VueGoodTable } from 'vue-good-table'
export default {
  components: {
    VueGoodTable
  },
  props: ['seller'],
  data: function () {
    return {
      columns: [
        { field: 'menuName', label: '이름' },
        { field: 'avgScore', label: '평점' },
        { field: 'price', label: '가격' }
      ],
      rows: [],
      contract: -1,
      length: 3,
      amountPerDay: 0,
      amountPerMonth: 0,
      entName: '',
      currentStep: 0,
      inputName: '',
      step: [false, false, false]
    }
  },
  created () {
    axios.get(`api/users/menu/${this.seller.sellerId}`).then(res => {
      if (res.data.success) {
        this.rows = res.data.menuItem
      }
    })
    axios.get('api/enterprises/myinfo').then(res => {
      if (res.data.success) {
        this.amountPerDay = res.data.data.amountPerDay
        this.amountPerMonth = res.data.data.amountPerMonth
        this.entName = res.data.data.name
      }
    })
    if (this.seller.contractable) {
      axios
        .get(`api/enterprises/contract/${this.seller.sellerId}`)
        .then(res => {
          if (res.data.success) {
            switch (res.data.contract.approval) {
              case -1:
                this.step = [true, false, false]
                break
              case 0:
                this.step = [true, true, false]
                break
              case 1:
                this.step = [true, true, true]
                break
              default:
                this.step = [false, false, false]
                break
            }
          }
        })
    }
  },
  methods: {
    imageUpload: function (file, res) {
      this.imgURL = res.location
    },
    sendContract: function (params) {
      axios
        .post('api/enterprises/contract', {
          sellerId: this.seller.sellerId
        })
        .then(res => {
          if (res.data.success) {
            alert('전송되었습니다')
            this.$router.go()
          }
        })
    },
    modifySellerInfo: function () {
      axios
        .put('api/sellers/myinfo', {
          info: this.info,
          imgURL: this.imgURL,
          contractable: this.contractable
        })
        .then(res => {
          console.log(res)
          if (res.data.success) {
            alert('변경되었습니다 !')
            this.$router.go()
          }
        })
    }
  }
}
</script>
<style scoped>
.tab-info-wrap {
  width: 100%;
  border: 1px solid #DDD;
  border-top: 0;
}

.tab-info-th {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  padding: 5px 0;
}

.prog {
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  table-layout: fixed;
  width: 100%;
  color: #849397;
}
.prog > li {
  position: relative;
  display: table-cell;
  text-align: center;
  font-size: 0.8em;
}
.prog > li:before {
  content: attr(data-step);
  display: block;
  margin: 0 auto;
  background: #dfe3e4;
  width: 3em;
  height: 3em;
  text-align: center;
  margin-bottom: 0.25em;
  line-height: 3em;
  border-radius: 100%;
  position: relative;
  z-index: 1000;
}
.prog > li:after {
  content: "";
  position: absolute;
  display: block;
  background: #dfe3e4;
  width: 100%;
  height: 0.5em;
  top: 1.25em;
  left: 50%;
  margin-left: 1.5em \9;
  z-index: 10;
}
.prog > li:last-child:after {
  display: none;
}
.prog > li.is-complete {
  color: #2ecc71;
}
.prog > li.is-complete:before,
.prog > li.is-complete:after {
  color: #fff;
  background: #2ecc71;
}
.prog > li.is-active {
  color: #3498db;
}
.prog > li.is-active:before {
  color: #fff;
  background: #3498db;
}
/** * Needed for IE8 */
.prog__last:after {
  display: none !important;
}
/** * Size Extensions */
.prog--medium {
  font-size: 1.5em;
}
.prog--large {
  font-size: 2em;
}
.btn-circle {
  width: 70px;
  height: 70px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 35px;
}
</style>
