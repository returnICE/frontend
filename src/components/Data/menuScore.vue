<script>
import { Line } from 'vue-chartjs'
import axios from 'axios'
export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: []
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              max: 5
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
    const color = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    axios.get('/api/sellers/data/menu', {}).then((res) => {
      var colorpoint = 0
      for (var s of res.data.data) {
        var score = []
        for (let i = 0; i < s.score.length; i++) {
          if (s.count[i] !== 0) {
            score.push(s.score[i] / s.count[i])
          } else {
            score.push(0)
          }
        }
        const temp = {
          label: s.menuName,
          backgroundColor: 'rgba(255,255,255,0)',
          pointBackgroundColor: 'white',
          borderWidth: 2,
          borderColor: color[colorpoint % 6],
          pointBorderColor: '#249ebf',
          lineTension: 0,
          data: score
        }
        this.datacollection.datasets.push(temp)
        colorpoint += 1
      }
      var label = []
      for (var n = 1; n <= 12; n++) {
        label.push(((new Date().getMonth() + n) % 12 + 1) + '월')
      }
      this.datacollection.labels = label
      this.renderChart(this.datacollection, this.options)
    })
  }
}
</script>
