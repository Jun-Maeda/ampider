<!--<template>-->
<!--  <div>-->
<!--    <h1>APIから取得したデータ</h1>-->
<!--    <table>-->
<!--      <thead>-->
<!--        <tr>-->
<!--          <th>従業員</th>-->
<!--          <th>安否</th>-->
<!--          <th>家族の安否</th>-->
<!--          <th>出社可否</th>-->
<!--          <th>家屋の状態</th>-->
<!--          <th>回答手段</th>-->
<!--          <th>備考</th>-->
          <!-- 他の列のヘッダーをここに追加 -->
<!--        </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--        <tr v-for="item in data" :key="item.EmployeeNo">-->
<!--          <td>{{ item.EmployeeNo["S"] }}</td>-->
<!--          <td>{{ item.Safety["S"] }}</td>-->
<!--          <td>{{ item.FamilySafety["S"] }}</td>-->
<!--          <td>{{ item.AttendanceState["S"] }}</td>-->
<!--          <td>{{ item.HouseState["S"] }}</td>-->
<!--          <td>{{ item.SendBy["S"] }}</td>-->
<!--          <td>{{ item.Notice["S"] }}</td>-->
          <!-- 他の列のデータをここに追加 -->
<!--        </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </div>-->
<!--</template>-->


<template>
<div class="screen">
    <div class="">
        <div class="">
            <div class="">
                <div class="">

                    <div class="view-2">
                        <div class="view-3">
                            <div class="frame">
                                <div class="text-wrapper">No.</div>
                            </div>
                            <div class="div-wrapper">
                                <div class="text-wrapper-2">氏名</div>
                            </div>
                            <div class="frame-2">
                                <div class="text-wrapper-3">社員番号</div>
                            </div>
                            <div class="frame-3">
                                <div class="text-wrapper-3">安否</div>
                            </div>
                            <div class="frame-4">
                                <div class="text-wrapper-3">回答時刻</div>
                            </div>
                            <div class="frame-5">
                                <div class="text-wrapper-3">出社可否</div>
                            </div>
                            <div class="frame-6">
                                <div class="text-wrapper-3">家族の安否</div>
                            </div>
                            <div class="frame-7">
                                <div class="text-wrapper">家屋の状態</div>
                            </div>
                            <div class="frame-8">
                                <div class="text-wrapper-4">ステップ</div>
                            </div>
                            <div class="frame-9">
                                <div class="text-wrapper-4">特記事項</div>
                            </div>
                        </div>
                        <div class="element">
                            <div class="frame-10">
                                <div class="text-wrapper-5">1</div>
                            </div>
                            <div class="frame-11">
                                <div class="text-wrapper-6">北 峻輝</div>
                            </div>
                            <div class="frame-12">
                                <div class="text-wrapper-7">54297863</div>
                            </div>
                            <div class="frame-13">
                                <div class="text-wrapper-7">安全</div>
                            </div>
                            <div class="frame-14">
                                <div class="text-wrapper-7">2023/10/13 9:53</div>
                            </div>
                            <div class="frame-15">
                                <div class="text-wrapper-7">出社済み</div>
                            </div>
                            <div class="frame-16">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-17">
                                <div class="text-wrapper-7">無事</div>
                            </div>
                            <div class="frame-18">
                                <p class="p">
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-19">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                        <div class="element-2">
                            <div class="frame-20">
                                <div class="text-wrapper-5">2</div>
                            </div>
                            <div class="frame-21">
                                <div class="text-wrapper-6">西井 志保</div>
                            </div>
                            <div class="frame-22">
                                <div class="text-wrapper-7">78543629</div>
                            </div>
                            <div class="frame-23">
                                <div class="text-wrapper-7">安全</div>
                            </div>
                            <div class="frame-24">
                                <div class="text-wrapper-7">2023/10/13 9:56</div>
                            </div>
                            <div class="frame-25">
                                <div class="text-wrapper-7">出社済み</div>
                            </div>
                            <div class="frame-26">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-27">
                                <div class="text-wrapper-7">無事</div>
                            </div>
                            <div class="frame-28">
                                <p class="p">
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-29">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                        <div class="element-2">
                            <div class="frame-10">
                                <div class="text-wrapper-5">3</div>
                            </div>
                            <div class="frame-11">
                                <div class="text-wrapper-6">長 由美子</div>
                            </div>
                            <div class="frame-12">
                                <div class="text-wrapper-7">54362798</div>
                            </div>
                            <div class="frame-13">
                                <div class="text-wrapper-7">安全</div>
                            </div>
                            <div class="frame-14">
                                <div class="text-wrapper-7">2023/10/13 9:47</div>
                            </div>
                            <div class="frame-15">
                                <div class="text-wrapper-7">出社済み</div>
                            </div>
                            <div class="frame-16">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-17">
                                <div class="text-wrapper-7">未確認</div>
                            </div>
                            <div class="frame-18">
                                <p class="p">
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-19">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                        <div class="element">
                            <div class="frame-20">
                                <div class="text-wrapper-5">4</div>
                            </div>
                            <div class="frame-21">
                                <div class="text-wrapper-6">三輪 真由</div>
                            </div>
                            <div class="frame-22">
                                <div class="text-wrapper-7">67845239</div>
                            </div>
                            <div class="frame-23">
                                <div class="text-wrapper-7">軽傷</div>
                            </div>
                            <div class="frame-24">
                                <div class="text-wrapper-7">2023/10/13 10:46</div>
                            </div>
                            <div class="frame-25">
                                <div class="text-wrapper-7">休日</div>
                            </div>
                            <div class="frame-26">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-27">
                                <div class="text-wrapper-7">無事</div>
                            </div>
                            <div class="frame-28">
                                <p class="p">
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-29">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                        <div class="element">
                            <div class="frame-10">
                                <div class="text-wrapper-5">5</div>
                            </div>
                            <div class="frame-11">
                                <div class="text-wrapper-6">須藤 栄治</div>
                            </div>
                            <div class="frame-12">
                                <div class="text-wrapper-7">98674325</div>
                            </div>
                            <div class="frame-13">
                                <div class="text-wrapper-7">安全</div>
                            </div>
                            <div class="frame-14">
                                <div class="text-wrapper-7">2023/10/13 9:51</div>
                            </div>
                            <div class="frame-15">
                                <div class="text-wrapper-7">休日</div>
                            </div>
                            <div class="frame-16">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-17">
                                <div class="text-wrapper-7">無事</div>
                            </div>
                            <div class="frame-18">
                                <p class="p">
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-19">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                        <div class="element-2">
                            <div class="frame-20">
                                <div class="text-wrapper-5">6</div>
                            </div>
                            <div class="frame-21">
                                <div class="text-wrapper-6">矢野 由利子</div>
                            </div>
                            <div class="frame-22">
                                <div class="text-wrapper-7">45236987</div>
                            </div>
                            <div class="frame-23">
                                <div class="text-wrapper-7">安全</div>
                            </div>
                            <div class="frame-24">
                                <div class="text-wrapper-7">2023/10/13 10:23</div>
                            </div>
                            <div class="frame-25">
                                <div class="text-wrapper-7">3時間以上</div>
                            </div>
                            <div class="frame-26">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-27">
                                <div class="text-wrapper-7">未確認</div>
                            </div>
                            <div class="frame-28">
                                <p class="p">
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-29">
                                <div class="text-wrapper-10">車のタイヤがパンクしてしまいました。</div>
                            </div>
                        </div>
                        <div class="element-2">
                            <div class="frame-10">
                                <div class="text-wrapper-5">7</div>
                            </div>
                            <div class="frame-11">
                                <div class="text-wrapper-6">西井 繁夫</div>
                            </div>
                            <div class="frame-12">
                                <div class="text-wrapper-7">54362798</div>
                            </div>
                            <div class="frame-13">
                                <div class="text-wrapper-7">重症</div>
                            </div>
                            <div class="frame-14">
                                <div class="text-wrapper-7">2023/10/13 11:38</div>
                            </div>
                            <div class="frame-15">
                                <div class="text-wrapper-7">不可</div>
                            </div>
                            <div class="frame-16">
                                <div class="text-wrapper-7">負傷者あり</div>
                            </div>
                            <div class="frame-17">
                                <div class="text-wrapper-7">半壊</div>
                            </div>
                            <div class="frame-18">
                                <p class="p">
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="span">●</span>
                                </p>
                            </div>
                            <div class="frame-19">
                                <div class="text-wrapper-10">家屋破損により足にけがをしています。</div>
                            </div>
                        </div>
                        <div class="element">
                            <div class="frame-20">
                                <div class="text-wrapper-5">8</div>
                            </div>
                            <div class="frame-21">
                                <div class="text-wrapper-6">森野 正彦</div>
                            </div>
                            <div class="frame-22">
                                <div class="text-wrapper-7">78543629</div>
                            </div>
                            <div class="frame-23">
                                <div class="text-wrapper-7">安全</div>
                            </div>
                            <div class="frame-24">
                                <div class="text-wrapper-7">2023/10/13 10:23</div>
                            </div>
                            <div class="frame-25">
                                <div class="text-wrapper-7">出社済み</div>
                            </div>
                            <div class="frame-26">
                                <div class="text-wrapper-7">全員無事</div>
                            </div>
                            <div class="frame-27">
                                <div class="text-wrapper-7">無事</div>
                            </div>
                            <div class="frame-28">
                                <p class="p">
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="span">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-9">●</span>
                                </p>
                            </div>
                            <div class="frame-29">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                        <div class="element-3">
                            <div class="frame-30">
                                <div class="text-wrapper-5">9</div>
                            </div>
                            <div class="frame-31">
                                <div class="text-wrapper-6">塩田 千咲</div>
                            </div>
                            <div class="frame-32">
                                <div class="text-wrapper-7">29865347</div>
                            </div>
                            <div class="frame-33">
                                <div class="text-wrapper-7">未回答</div>
                            </div>
                            <div class="frame-34">
                                <div class="text-wrapper-7">未回答</div>
                            </div>
                            <div class="frame-35">
                                <div class="text-wrapper-7">未回答</div>
                            </div>
                            <div class="frame-36">
                                <div class="text-wrapper-7">未回答</div>
                            </div>
                            <div class="frame-37">
                                <div class="text-wrapper-7">未回答</div>
                            </div>
                            <div class="frame-38">
                                <p class="div-2">
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-11">●</span>
                                    <span class="text-wrapper-8">&nbsp;</span>
                                    <span class="text-wrapper-11">●</span>
                                </p>
                            </div>
                            <div class="frame-39">
                                <div class="text-wrapper-10"></div>
                            </div>
                        </div>
                    </div>
                    <div class="view-4">
                        <div class="bar-chart-wrapper">
                            <div class="bar-chart">
                                <div class="text-wrapper-12">5</div>
                                <div class="text-wrapper-13">0</div>
                                <div class="overlap-group-2">
                                    <img class="line" src="img/line-9.svg" />
                                    <img class="img" src="img/line-7.svg" />
                                    <img class="line-2" src="img/line-8.svg" />
                                    <img class="line-3" src="img/line-5.svg" />
                                    <img class="line-4" src="img/line-2.svg" />
                                    <img class="line-5" src="img/line.svg" />
                                    <img class="line-6" src="img/line-3.svg" />
                                    <div class="group">
                                        <div class="text-wrapper-14">1</div>
                                        <div class="element-4"></div>
                                        <div class="text-wrapper-15">2</div>
                                        <div class="element-5"></div>
                                        <div class="text-wrapper-16">1</div>
                                        <div class="element-6"></div>
                                        <div class="text-wrapper-17">1</div>
                                        <div class="element-7"></div>
                                        <div class="text-wrapper-18">4</div>
                                        <div class="element-8"></div>
                                    </div>
                                    <div class="text-wrapper-19">未回答</div>
                                    <div class="text-wrapper-20">休日</div>
                                    <div class="text-wrapper-21">出社不可</div>
                                    <div class="text-wrapper-22">出社可能</div>
                                    <div class="text-wrapper-23">出社済み</div>
                                </div>
                            </div>
                        </div>
                        <div class="text-wrapper-24">出社可否</div>
                    </div>
                    <div class="view-5">
                        <div class="view-6">
                            <div class="bar-chart-2">
                                <div class="text-wrapper-25">5</div>
                                <div class="text-wrapper-26">0</div>
                                <div class="overlap-group-3">
                                    <img class="line-7" src="img/line-12.svg" />
                                    <img class="line-8" src="img/line-14.svg" />
                                    <img class="line-9" src="img/line-13.svg" />
                                    <img class="line-10" src="img/line-4.svg" />
                                    <img class="line-11" src="img/line-6.svg" />
                                    <img class="line-12" src="img/line-10.svg" />
                                    <img class="line-13" src="img/line-11.svg" />
                                    <div class="group-2">
                                        <div class="text-wrapper-27">1</div>
                                        <div class="element-9"></div>
                                        <div class="text-wrapper-28">1</div>
                                        <div class="element-10"></div>
                                        <div class="text-wrapper-29">1</div>
                                        <img class="element-11" src="@/images/image.svg" />
                                        <div class="text-wrapper-30">6</div>
                                        <img class="element-12" src="@/images/6-67.svg" />
                                    </div>
                                </div>
                                <div class="text-wrapper-31">軽傷</div>
                                <div class="text-wrapper-32">重症</div>
                                <div class="text-wrapper-33">未回答</div>
                                <div class="text-wrapper-34">安全</div>
                            </div>
                        </div>
                        <div class="text-wrapper-35">従業員安否状況</div>
                    </div>
                    <div class="view-wrapper">
                        <div class="view-7">
                            <div class="text-wrapper-36">1(11%)</div>
                            <div class="overlap-group-4">
                                <div class="text-wrapper-37">未回答</div>
                                <img class="ellipse" src="img/ellipse.svg" />
                            </div>
                            <div class="text-wrapper-38">8(89%)</div>
                            <div class="overlap-2">
                                <div class="text-wrapper-39">回答済</div>
                                <div class="ellipse-2"></div>
                            </div>
                            <div class="element-wrapper"><img class="element-13" src="@/images/1-11.svg" /></div>
                            <div class="text-wrapper-40">回答率</div>
                        </div>
                    </div>
                    <div class="view-8">
                        <div class="overlap-3">
                            <div class="text-wrapper-41">▼</div>
                        </div>
                        <div class="overlap-4">
                            <div class="text-wrapper-42">2023/10/13 9:50　富山　震度5</div>
                        </div>
                    </div>

                    <div class="text-wrapper-43">過去データ一覧を表示 →</div>
                    <div class="text-wrapper-44">全体を表示</div>
                    <div class="text-wrapper-45">《</div>
                </div>
            </div>
            <div class="line-14"></div>
            <div class="view-9">
                <div class="text-wrapper-46">管理</div>
            </div>
        </div>
    </div>

</div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    // APIからデータを取得
    // axios.get('https://bkpna7hz5b.execute-api.ap-northeast-1.amazonaws.com/dev/getAnswer?EmployeeNo=employee1&DisasterNo=disaster1')
    
    axios.get('https://bkpna7hz5b.execute-api.ap-northeast-1.amazonaws.com/dev/ampider-answer-list?DisasterNo=99999')
      .then(response => {
        this.data = response.data['Items'];
        // console.log(Object.keys(this.data))
        console.log(this.data['Items'])
        // console.log(JSON.stringify([this.data]))/
      })
      .catch(error => {
        console.error('APIからデータを取得できませんでした', error);
      });
  },
};
</script>