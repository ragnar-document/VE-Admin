<template>
  <div>
    <el-main>
      <div class="card-list">
        <div class="card-item">
          <div class="card-item-img"></div>
          <div class="card-item-data">
            <h1>请假人数</h1>
            <span>12312</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-img"></div>
          <div class="card-item-data">
            <h1>请假人数</h1>
            <span>12312</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-img"></div>
          <div class="card-item-data">
            <h1>请假人数</h1>
            <span>12312</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-img"></div>
          <div class="card-item-data">
            <h1>请假人数</h1>
            <span>12312</span>
          </div>
        </div>
      </div>
      <div class="random">
        <trend-chart
          :datasets="datasets"
          :grid="grid"
          :labels="labels"
          :min="0"
          :interactive="true"
          class="random-chart"
        ></trend-chart>
        <div
          id="pop"
          role="tooltip"
          ref="tooltip"
          class="tooltip"
          :class="{ 'is-active': tooltipData }"
        >
          <div class="tooltip-container" v-if="tooltipData">
            <strong>{{ labels.xLabels[tooltipData.index] }}</strong>
            <div class="tooltip-data">
              <div class="tooltip-data-item tooltip-data-item--1">
                {{ tooltipData.data[0] }}
              </div>
              <div class="tooltip-data-item tooltip-data-item--2">
                {{ tooltipData.data[1] }}
              </div>
              <div class="tooltip-data-item tooltip-data-item--3">
                {{ tooltipData.data[2] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datasets: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          smooth: true,
          showPoints: true,
          fill: true,
          className: "curve1"
        },
        {
          data: [150, 300, 350, 100, 350, 100, 15],
          smooth: true,
          showPoints: true,
          className: "curve2"
        },
        {
          data: [50, 150, 200, 50, 120, 250, 200],
          smooth: true,
          showPoints: true,
          className: "curve3"
        }
      ],
      grid: {
        verticalLines: true,
        horizontalLines: true
      },
      labels: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: val => Math.round(val * 100) / 100
      },
      tooltipData: null,
      popper: null,
      popperIsActive: false
    };
  },
  components: {}
};
</script>

<style lang="less">
.card-list {
  display: flex;
  justify-content: space-between;
  height: 80px;
  .card-item {
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    width: 20%;
    height: 100%;
    background-color: #7fdfd4;
    .card-item-img {
      height: 60px;
      width: 60px;
      background-color: #fbac91;
      h1 {
      }
      span {
        font-weight: 200px;
      }
    }
  }
}

.random {
  width: 100%;
  margin-top: 40px;
  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }
  }
  .labels {
    stroke: rgba(0, 0, 0, 0.05);
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve1 {
    .stroke {
      stroke: #fbac91;
      stroke-width: 2;
    }
    .fill {
      fill: #fbac91;
      opacity: 0.05;
    }
    .point {
      fill: #fbac91;
      stroke: #fbac91;
    }
  }
  .curve2 {
    .stroke {
      stroke: #fbe1b6;
      stroke-width: 2;
    }
    .point {
      fill: #fbe1b6;
      stroke: #fbe1b6;
    }
  }
  .curve3 {
    .stroke {
      stroke: #7fdfd4;
      stroke-width: 2;
    }
    .point {
      fill: #7fdfd4;
      stroke: #7fdfd4;
    }
  }

  .tooltip {
    &:not(.is-active) {
      display: none;
    }
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--1:before {
          background: #fbac91;
        }
        &--2:before {
          background: #fbe1b6;
        }
        &--3:before {
          background: #7fdfd4;
        }
      }
    }
  }
}
</style>
