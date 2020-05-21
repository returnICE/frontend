<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [
          {
            label: '메뉴 1',
            backgroundColor: 'rgba(255,255,255,0)',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#f87979',
            pointBorderColor: '#249ebf',
            lineTension: 0,
            data: [1, 3, 2, 4, 1, 2, 5, 2, 4, 5, 2, 4]
          },
          {
            label: '메뉴 2',
            backgroundColor: 'rgba(255,255,255,0)',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'red',
            pointBorderColor: '#249ebf',
            lineTension: 0,
            data: [4, 2, 3, 4, 2, 3, 5, 1, 2, 3, 4, 5]
          },
          {
            label: '메뉴 3',
            backgroundColor: 'rgba(255,255,255,0)',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'blue',
            pointBorderColor: '#249ebf',
            lineTension: 0,
            data: [5, 5, 5, 5, 2, 3, 4, 2, 3, 1, 2, 2]
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
