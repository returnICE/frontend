<template>
  <div id="log">
    <div v-if="this.isLoading === false" class="loading">
      <img src="../../assets/loading.gif" />
    </div>
    <div v-if="this.isLoading === true">
      <div class="col-10 mt-3 p-2 mx-auto rounded border shadow " style="" >
        <b-tabs content-class="mt-3" fill>
          <b-tab title="로그" active>
            <vue-good-table
              class="my-table"
              :columns="columns"
              :rows="rows"
              styleClass="vgt-table striped"
            />
          </b-tab>
          <b-tab title="음식점별" active>
            <div>횟수</div>
          </b-tab>
          <b-tab title="일자별" active>
            <div>횟수</div>
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
export default {
  extends: Line,
  name: 'Log',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: '월별 매출',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#f87979',
            pointBorderColor: '#249ebf',
            data: [120000, 124000, 125000, 130000, 128000, 130000, 127000, 131000, 133000, 133000, 136000, 140000]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              stepSize: 10000,
              max: 150000,
              min: 110000
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },
      isLoading: false,
      columns: [
        {
          label: '사용자 아이디',
          field: 'customerId'
        },
        {
          label: '사용 일자',
          field: 'eatenDate',
          filterDropdownItems: ['Blue', 'Red', 'Yellow'],
          filterable: true,
          enabled: true,
          filterFn: this.filterFn
        },
        {
          label: '이용 음식점',
          field: 'sellerName'
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
      rows: []
    }
  },
  methods: {
    filterFn: function (data) {
      console.log(data)
      var x = parseInt(data)
      return data >= x - 5 && data <= x + 5
    }
  },
  beforeCreate () {
    axios.get('./api/enterprises/accept', {}).then(res => {
      for (let i = 0; i < res.data.data.length; i++) {
        this.rows.push({
          customerId: res.data.data[i].Customer.name,
          sellerName: res.data.data[i].Menu.Seller.name,
          eatenDate:
            res.data.data[i].eatenDate.substring(0, 10) +
            ' ' +
            res.data.data[i].eatenDate.substring(11, 19),
          menu: res.data.data[i].Menu.menuName,
          price: res.data.data[i].Menu.price
        })
      }
      this.isLoading = true
      var date = new Date()
      var labels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < 12; i++) {
        let temp = date.getMonth() - i + 1
        if (temp <= 0) {
          temp += 12
        }
        labels[11 - i] = temp + '월'
      }
      this.datacollection.labels = labels
      this.datacollection.datasets[0].data = res.data.data.Menu.price
      this.renderChart(this.datacollection, this.options)
    })
  }
}
</script>
<style scoped>
</style>
