<template>
  <div id="log">
    <div v-if="this.isLoading === false" class="loading color-custom">
      <b-spinner class="my-5" style="width: 10rem; height: 10rem; border: 1em solid currentColor; border-right-color: transparent;" label="Large Spinner"></b-spinner>
      <h2>로딩 중 ...</h2>
      <h5>Let Eat, Go</h5>
    </div>
    <div v-if="this.isLoading === true">
      <div class="col-10 mt-3 p-2 mx-auto rounded border shadow" style>
        <b-tabs content-class="mt-3" fill>
          <b-tab title="로그" active>
            <vue-good-table
              class="my-table"
              :columns="columns"
              :rows="rows"
              styleClass="vgt-table striped"
            />
          </b-tab>
          <b-tab title="정산">
            <div v-for="contract in contracts" v-bind:key="contract.sellerId">
              <b-card no-body class="overflow-hidden my-2 ">
                <b-row no-gutters>
                  <b-col
                    md="4"
                    class="d-block"
                    style="height: 150px;  display: flex !important; justify-content: center; align-items: center;"
                  >
                    <b-card-img
                      :src="contract.Seller.imgURL"
                      alt="Image"
                      class="rounded-0"
                    ></b-card-img>
                  </b-col>
                  <b-col md="8">
                    <b-card-body class="pt-0 px-0">
                      <b-card-title class="p-0 py-2 bg-light">
                        {{contract.Seller.name}}
                      </b-card-title>
                      <b-card-text class="bg-white pt-2">
                        <div class="row col-12">
                          <div class="col-6 h5">
                            이번달 이용금액
                          </div>
                          <div class="col-6 h5">
                            {{contractsBill.get(contract.Seller.name)}}
                          </div>
                        </div>
                        <div>
                          <button class="bill-btn">정산하기</button>
                        </div>
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { Line } from 'vue-chartjs'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import axios from 'axios'
import moment from 'moment'
export default {
  extends: Line,
  name: 'Log',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      isLoading: false,
      columns: [
        {
          label: '사용자',
          field: 'customerName',
          filterOptions: {
            filterable: true,
            enabled: true
          }
        },
        {
          label: '사용 일자',
          field: 'eatenDate',
          filterOptions: {
            placeholder: '기간 설정',
            filterDropdownItems: ['일', '주', '월', '정산일 기준'],
            filterable: true,
            enabled: true,
            filterFn: this.filterFn
          }
        },
        {
          label: '이용 음식점',
          field: 'sellerName',
          filterOptions: {
            filterDropdownItems: ['asd', 'vss'],
            filterable: true,
            enabled: true
          }
        },
        {
          label: '이용 메뉴',
          field: 'menu'
        },
        {
          label: '메뉴 가격',
          field: 'price'
        }
      ],
      rows: [],
      paymentDay: new Date(),
      nowDay: new Date(),
      contracts: [],
      contractsBill: new Map()
    }
  },
  methods: {
    filterFn: function (data, filterOpt) {
      var result = false
      var day = new Date(data)
      var a, b, d
      switch (filterOpt) {
        case '일':
          result =
            day.getFullYear() === this.nowDay.getFullYear() &&
            day.getMonth() === this.nowDay.getMonth() &&
            day.getDate() === this.nowDay.getDate()
          break
        case '주':
          a = moment(day)
          b = moment(this.nowDay)
          result = b.startOf('day').diff(a.startOf('day'), 'days') < 7
          break
        case '월':
          a = moment(day)
          b = moment(this.nowDay)
          result = b.startOf('day').diff(a.startOf('day'), 'days') < 31
          break
        case '정산일 기준':
          a = moment(day)
          d = moment(this.paymentDay)
          result =
            d.add('0', 'M')
              .startOf('day')
              .diff(a.startOf('day'), 'days') > 0
          break
        default:
          break
      }
      return result
    }
  },
  beforeCreate () {
    axios.get('./api/enterprises/accept', {}).then(res => {
      this.paymentDay = new Date(res.data.contract[0].paymentDay)
      var temp = res.data.contract.filter(c => c.approval === 1)
      var arr = temp.map(a => a.Seller.name)
      this.columns[2].filterOptions.filterDropdownItems = arr
      this.contracts = res.data.contract

      for (var ar of arr) {
        this.contractsBill.set(ar, 0)
      }
      for (let i = 0; i < res.data.data.length; i++) {
        this.rows.push({
          customerName: res.data.data[i].Customer.name,
          sellerName: res.data.data[i].Menu.Seller.name,
          eatenDate:
            res.data.data[i].eatenDate.substring(0, 10) +
            ' ' +
            res.data.data[i].eatenDate.substring(11, 19),
          menu: res.data.data[i].Menu.menuName,
          price: res.data.data[i].Menu.price
        })

        var a = moment(res.data.data[i].eatenDate)
        var d = moment(this.paymentDay)
        if (d.add('0', 'M').startOf('day').diff(a.startOf('day'), 'days') > 0) {
          this.contractsBill.set(res.data.data[i].Menu.Seller.name, this.contractsBill.get(res.data.data[i].Menu.Seller.name) + res.data.data[i].Menu.price)
        }
      }
      this.isLoading = true
    })
  }
}
</script>
<style scoped>
.bill-btn {
  border: none;
  color: #FFF;
  padding: 5px 8px;
  border-radius: 3px;
}

.bill-btn {
  background-color: #2E3559;
}

.color-custom{
  color: #2E3559;
}
</style>
