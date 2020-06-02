<script>
import { Line } from 'vue-chartjs'
import axios from 'axios'
export default {
  extends: Line,
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
      }
    }
  },
  beforeCreate () {
    axios.get('/api/sellers/data/revenue', {}).then((res) => {
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
      // this.datacollection.datasets[0].data = res.data.resultData.resultPayData
      this.renderChart(this.datacollection, this.options)
    })
  }
}
</script>
