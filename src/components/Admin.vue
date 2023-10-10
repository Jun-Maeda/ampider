<template>
  <div>
    <h1>APIから取得したデータ</h1>
    <table>
      <thead>
        <tr>
          <th>従業員</th>
          <th>安否</th>
          <th>家族の安否</th>
          <th>出社可否</th>
          <th>家屋の状態</th>
          <th>回答手段</th>
          <th>備考</th>
          <!-- 他の列のヘッダーをここに追加 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.EmployeeNo">
          <td>{{ item.EmployeeNo["S"] }}</td>
          <td>{{ item.Safety["S"] }}</td>
          <td>{{ item.FamilySafety["S"] }}</td>
          <td>{{ item.AttendanceState["S"] }}</td>
          <td>{{ item.HouseState["S"] }}</td>
          <td>{{ item.SendBy["S"] }}</td>
          <td>{{ item.Notice["S"] }}</td>
          <!-- 他の列のデータをここに追加 -->
        </tr>
      </tbody>
    </table>
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