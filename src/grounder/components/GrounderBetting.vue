<template>
  <ul class="g-grounder-betting">
    <li v-for="n in 5" :key="n">
      <div class="g-bet-content">
        <div class="g-Match-message g-click-up">
          <img class="g-msg-icon" src="../assets/ic_gun.png"/>
          <p class="g-msg-name">
            <span>001</span>
            <span>阿根廷甲级</span>
            <span>联赛</span>
          </p>
          <p class="g-msg-time">90:00</p>
          <img src="../assets/ic_closeall.png" class="g-msg-lock" alt="" width="15" height="15">
        </div>
        <div class="g-Match-button">
          <div class="g-button-vs">
            <p>图库曼竞技图库曼竞技图库曼竞技图库曼竞技图库曼竞技图库曼竞技图库曼竞技图库曼竞技</p>
            <div>11-7</div>
            <p>图库曼竞技</p>
          </div>
          <ul v-show="0" class="g-button-body-rq">
            <li>
              <div>进球</div>
              <div>大</div>
              <div>小</div>
            </li>
            <li v-for="n of 4" :key="n">
              <div>3.5/4.0</div>
              <div class="down">2.01</div>
              <div class="active-select up">2.01</div>
            </li>
          </ul>
          <ul v-show="1" class="g-button-body-dxq">
            <li>
              <div><span>0.0/+0.5</span><span>3.59</span></div>
              <div><span>0.0/+0.5</span><span>3.59</span></div>
            </li>
            <li>
              <div class="lock"><span>0.0/+0.5</span><span>3.59</span></div>
              <div><span>0.0/+0.5</span><span class="down">3.59</span></div>
            </li>
            <li>
              <div class="active-select"><span>0.0/+0.5</span><span>3.59</span></div>
              <div><span>0.0/+0.5</span><span class="up">3.59</span></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="g-bet-analyze" v-show="0">
        <p>
          <span>历史交锋</span>
          <span>近4次交战,卡利阿美离家</span>
          <span style="color: #FF3333">1胜</span>
          <span style="color: #3393FF">1平</span>
          <span style="color: #1AC456">1负</span>
        </p>
        <p>
          <span>近期战绩</span>
          <span>主队</span><span>1胜</span><span>1平</span> <span>1负</span>
          <span></span>
          <span>客队</span> <span>1胜</span> <span>1平</span> <span>1负</span>
        </p>
        <p>
          <span>平均赔率</span>
          <span>2.848</span> <span>2.848</span> <span>2.848</span>
        </p>
        <div><img src="../../assets/ball.png" alt="">详细赛事分析</div>
      </div>
    </li>
  </ul>
</template>

<script>// 亚盘投注
export default {
  name: 'GrounderBetting'
}
</script>

<style scoped lang="scss">
  .g-grounder-betting {
    > li {
      border-bottom: 1px solid #494949;

      .g-bet-content {
        background-color: #313131;
        padding: 0 10px 10px 5px;
        /*height: 115px;*/
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .g-Match-message {
          width: 20%;
          text-align: center;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          align-content: center;

          .g-msg-icon {
            margin-top: 5px;
            width: 30px;
            height: 25px;
          }

          .g-msg-name {
            margin-top: 5px;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            align-content: center;
            color: #999999;
          }

          .g-msg-time {
            color: white;
            font-weight: 500;
            margin: 5px 0;
          }

          &::after {
            content: '';
            margin-top: 5px;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #999;
            transition: transform 0.5s;
          }

          &.g-click-up::after {
            transform: rotate(180deg);
          }
        }

        .g-Match-button {
          width: 80%;

          .g-button-vs {
            height: 25px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;

            > p {
              text-align: center;
              width: 40%;
              height: 15px;
              color: #CCCCCC;
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            > div {
              text-align: center;
              font-weight: bold;
              line-height: 15px;
              flex: 0 0 40px;
              background: linear-gradient(90deg, rgba(133, 131, 142, 1) 0%, rgba(133, 131, 142, 1) 100%);
              border-radius: 6px;
            }
          }

          .g-button-body-rq {
            width: 100%;
            text-align: center;

            > li {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;

              div:first-child {
                width: 20%;
              }

              div:nth-child(n+2) {
                width: 40%;
              }
            }

            > li:first-child {

              div:nth-child(1) {
                line-height: 17px;
                background-color: #494949;
                border-top-left-radius: 2px;
              }

              div:nth-child(2) {
                line-height: 17px;
                color: white;
                background-color: #FF3333;
              }

              div:nth-child(3) {
                line-height: 17px;
                color: white;
                background-color: #3393FF;
                border-top-right-radius: 2px;
              }
            }

            > li:nth-child(n+2) {
              font-weight: 500;

              div:first-child {
                background-color: #DDDDDD;
                color: #131313;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #3F3F3F;
              }

              div:nth-child(2) {
                border-right: 1px dashed #3F3F3F;
              }

              div:nth-child(n+2) {
                height: 30px;
                line-height: 30px;
                background-color: #494949;
                border-bottom: 1px solid #3F3F3F;
              }

              div.active-select {
                color: #131313;
                background-color: #FFC63A;
              }

              .up {
                color: #1AC456;

                &:after {
                  display: inline-block;
                  content: '';
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-bottom: 6px solid #1AC456;
                  margin: 0 0 2px 4px;
                }
              }

              .down {
                color: #FF3333;

                &:after {
                  display: inline-block;
                  content: '';
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-top: 6px solid #FF3333;
                  margin: 0 0 2px 4px;
                }
              }
            }

            > li:last-child {
              > div:first-child {
                border-bottom: 0;
                border-bottom-left-radius: 2px;
              }

              > div:nth-child(2) {
                border-bottom: 0;
              }

              > div:last-child {
                border-bottom: 0;
                border-bottom-right-radius: 2px;
              }
            }
          }

          .g-button-body-dxq {
            width: 100%;
            overflow: hidden;
            border-radius: 2px;

            > li {
              display: flex;
              flex-flow: row nowrap;

              div {
                background-color: #494949;
                height: 30px;
                line-height: 30px;
                width: 50%;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                font-weight: 500;

                span:first-child {
                  width: 65%;
                  overflow: hidden;
                  text-align: center;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  color: #999999;
                }

                span:last-child {
                  color: white;
                  width: 35%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

                span.up {
                  color: #1AC456;

                  &:after {
                    display: inline-block;
                    content: '';
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-bottom: 6px solid #1AC456;
                    margin: 0 0 2px 4px;
                  }
                }

                span.down {
                  color: #FF3333;

                  &:after {
                    display: inline-block;
                    content: '';
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid #FF3333;
                    margin: 0 0 2px 4px;
                  }
                }
              }

              div.active-select {
                background-color: #FFC63A;

                span {
                  color: #131313;
                }
              }

              div.lock {
                span {
                  display: none;
                }

                background: url("../assets/ic_selclose.png") no-repeat center center, url("../assets/ya_rang_bg.png") no-repeat left top;
                background-size: 10px 15px, 100% 100%;
              }

              div:last-child {
                border-left: 1px dashed #3F3F3F;
              }
            }

            > li:nth-child(n+ 2) {
              border-top: 1px solid #3F3F3F;
            }
          }
        }
      }

      .g-bet-analyze {
        background-color: #1C1C1C;

        > p {
          line-height: 22px;
          margin: 0 10px;

          span:nth-child(1) {
            color: #888;
            margin-right: 17px;
          }

          span:nth-child(n + 2) {
            margin-right: 5px;
          }
        }

        p:nth-child(n+2) {
          border-top: 1px dashed #777777;
        }

        > div {
          line-height: 22px;
          text-align: center;
          color: #FFC63A;

          img {
            width: 17px;
            height: 17px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }

  }
</style>
