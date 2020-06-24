<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'
export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: '월별 구독자수',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'whsite',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: []
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 5,
              max: 45
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
      this.datacollection.datasets[0].data = res.data.resultData.resultsubNumData
      this.renderChart(this.datacollection, this.options)
    })
  }
}
</script>
