import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
    labels: [],
  };

  private color: d3.ScaleOrdinal<string, string>; // Explicitly type color

  constructor(private http: HttpClient) {
    this.color = d3.scaleOrdinal<string, string>() // Explicitly specify the types
      .domain(["Eat out", "Rent", "Grocery", "Transportation", "Entertainment", "Utilities", "Insurance"])
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:000/budget').subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
      this.createD3Chart('#d3-chart-container', 500, 500);
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  createD3Chart(containerId: string, width: number, height: number) {
    const container = d3.select(containerId);
    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().sort(null).value(function (d: any) {
      return d.value;
    });

    const arc = d3.arc().outerRadius(width / 2).innerRadius(0);

    const self = this; // Capture 'this' in a variable

    function randomData(): { label: string; value: number }[] {
      const labels = self.color.domain();
      return labels.map(function (label) {
        return { label: label, value: Math.random() };
      });
    }

    function updateChart() {
      const data: { label: string; value: number }[] = randomData();
      const pieData = data.map((d) => +d.value);

      const slice = svg.selectAll('.slices path.slice').data(pie(pieData) as any, function (d: any) {
        return d.data.label;
      });

      slice.enter().insert('path').style('fill', function (d: any) {
        return self.color(d.data.label);
      });

      slice
        .transition()
        .duration(1000)
        .attrTween('d', function (d: any) {
          (this as any)._current = (this as any)._current || d;
          const interpolate = d3.interpolate((this as any)._current, d);
          (this as any)._current = interpolate(0);
          return function (t: any) {
            return arc(interpolate(t)) as string;
          };
        });

      slice.exit().remove();
    }

    updateChart();

    d3.select(containerId + ' .randomize').on('click', function () {
      updateChart();
    });
  }
}