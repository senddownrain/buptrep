<template>
  <v-container>
    <v-row>
      <v-col>
        {{ person.type }}<br />
        Контакт: {{ person.contact }}<br />
        Дата крещения: {{ person.buptDate }}<br />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <p>Q1: Как Вы понимаете, что такое крещение? Зачем оно нужно?
              <br/>
              <b> {{ person.q1 }} </b>
          </p>
              <p>Q2: Что означают жесты и символы во время крещения: вода, белая
              одежда, свеча?<br/><b>{{ person.q2 }}</b></p>
              <p>Q3: Как Вы понимаете, что такое благодать?<br/><b>{{ person.q3 }}</b></p>
              <p>Q4: Что Вы можете делать, чтобы "заправляться" благодатью и в этом
              помогать ребенку/крестнику? <br/><b>{{ person.q4 }}</b></p>
           <p>Q5: Как вы собираетесь реализовывать это обещание: напишите 5
              пунктов.
            <br/><b>{{ person.q5 }}</b></p>
      </v-col>
    </v-row>
    <br />

   Отправлено: {{ person.timeStamp }} <br />
  </v-container>
</template>

<script>
export default {
  name: "answerDetails",
  props: {
    person: Object,
  },
};
</script>