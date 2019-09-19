<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['labels', 'chartdata'],
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: '순위',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 3,
            pointBorderColor: '#249EBF',
            data: this.chartdata,
            fill: false
          }
        ]
      },
      {
        scales: {
          yAxes: [
            {
              ticks: {
                reverse: true,
                stepSize: 1
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    )
  }
}
</script>