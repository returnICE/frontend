<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: '월별 구독자수',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'whsite',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [1, 2, 4, 4, 6, 4, 3, 2, 1]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAZero: true
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
