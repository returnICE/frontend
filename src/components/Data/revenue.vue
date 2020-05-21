<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: '월별 매출',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#f87979',
            pointBorderColor: '#249ebf',
            data: [1743000, 1803000, 1750000, 1642000, 1742000, 1860000, 1610400, 1500000, 1242000]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
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
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}
</script>
