<!-- 現在使用していません -->
<template>
  <v-container>
    <div class="screen">
      <div>
        <div class="row my-3">
          <p class="col-2">災害番号選択:</p>
          <select class="col-3">
            <option>99999</option>
          </select>
        </div>
        <div>
          <img src="@/images/admin.jpg" />
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>名前</th>
              <th>安否</th>
              <th>家族の安否</th>
              <th>出社可否</th>
              <th>家屋の状態</th>
              <th>回答手段</th>
              <th>回答時刻</th>
              <th>特記事項</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.EmployeeNo">
              <td>{{ item.EmployeeNo['S'] }}</td>
              <td>{{ item.Safety['S'] }}</td>
              <td>{{ item.FamilySafety['S'] }}</td>
              <td>{{ item.AttendanceState['S'] }}</td>
              <td>{{ item.HouseState['S'] }}</td>
              <td>{{ item.SendBy['S'] }}</td>
              <td>{{ item.LastUpdateTime['S'] }}</td>
              <td>{{ item.Notice['S'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-container>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      data: [],
    }
  },
  created() {
    // APIからデータを取得
    // axios.get('https://bkpna7hz5b.execute-api.ap-northeast-1.amazonaws.com/dev/getAnswer?EmployeeNo=employee1&DisasterNo=disaster1')

    this.axios
      .get('https://bkpna7hz5b.execute-api.ap-northeast-1.amazonaws.com/dev/ampider-answer-list?DisasterNo=99999')
      .then((response) => {
        this.data = response.data['Items']
        // console.log(Object.keys(this.data))
        console.log(this.data['Items'])
        // console.log(JSON.stringify([this.data]))/
      })
      .catch((error) => {
        console.error('APIからデータを取得できませんでした', error)
      })
  },
}
</script>
