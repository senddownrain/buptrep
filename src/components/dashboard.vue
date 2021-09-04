`<template>
  <div class="hello">
    <v-tabs v-model="tab">
      <v-tab>Текущие</v-tab>
      <v-tab>Предыдущие</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-checkbox
          v-model="thisWeekOnly"
          :label="`Только текущая неделя`"
        >
        </v-checkbox>
        <v-container>
          <v-row>
       
            <v-col>
              <v-card flat>
                <v-card-title> Данные о ребенке </v-card-title>
                <v-card-subtitle> По дате крещения </v-card-subtitle>
                <v-list>
                  <v-list-item-group color="primary">
                    <v-list-item v-for="(data, i) in filtereDataShot" :key="i">
                      <v-list-item-content @click="showData(data)">
                        <v-list-item-title>
                          {{ data.name }} - {{ data.buptDate }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>

     <v-col class="col-sm-12">
              <v-card flat>
                <v-card-title> Ответы на вопросы </v-card-title>
                <v-card-subtitle
                  >Сгруппировано по дате крещения</v-card-subtitle
                >
                <v-expansion-panels popout multiple>
                  <v-expansion-panel
                    v-for="(value, name) in filteredAnswersShot"
                    :key="name"
                  >
                    <v-expansion-panel-header>
                      {{ name }}
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <v-list>
                        <v-list-item-group color="primary">
                          <v-list-item v-for="(item, i) in value" :key="i">
                            <v-list-item-content @click="showItem(item)">
                              <v-list-item-title>
                                {{ item.name }} - {{ item.type }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>


<!-- 
            <v-col>
              <v-card flat>
                <v-card-title> Данные о ребенке </v-card-title>
                <v-card-subtitle> По дате крещения </v-card-subtitle>
                <v-expansion-panels popout multiple>
                  <v-expansion-panel
                    v-for="item in filtereDataShot"
                    :key="item.timeStamp"
                  >
                    <v-expansion-panel-header>
                      {{ item.name }} - {{ item.buptDate }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Рождение: {{ item.birthDate }} - {{ item.birthPlace }}
                      <br />
                      Крещение: {{ item.buptDate }} - {{ item.buptPlace }}
                      <br /><br />
                      <b>Родители:</b> <br />
                      {{ item.father }}<br />
                      {{ item.mother }}<br />
                      {{ item.married }}<br /><br />
                      <b>Крестные:</b> <br />
                      {{ item.bfather }}<br />
                      {{ item.bmother }}<br /><br />
                      Свидетельство: {{ item.stateDocs }}<br /><br />
                      {{ item.timeStamp }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>-->
          </v-row>
        </v-container>
      </v-tab-item> 


      <v-tab-item>
        <v-container>
          <v-row>
            


            <v-col>
              <v-card flat>
                <v-card-title> Данные о ребенке </v-card-title>
                <v-card-subtitle> По дате крещения </v-card-subtitle>
                <v-list>
                  <v-list-item-group color="primary">
                    <v-list-item v-for="(data, i) in filtereData" :key="i">
                      <v-list-item-content @click="showData(data)">
                        <v-list-item-title>
                          {{ data.name }} - {{ data.buptDate }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>

<v-col>
              <v-card flat>
                <v-card-title> Ответы на вопросы </v-card-title>
                <v-card-subtitle
                  >Сгруппировано по дате крещения</v-card-subtitle
                >
                <v-expansion-panels popout multiple>
                  <v-expansion-panel
                    v-for="(value, name) in filteredAnswers"
                    :key="name"
                  >
                    <v-expansion-panel-header>
                      {{ name }}
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <v-list>
                        <v-list-item-group color="primary">
                          <v-list-item v-for="(item, i) in value" :key="i">
                            <v-list-item-content @click="showItem(item)">
                              <v-list-item-title>
                                {{ item.name }} - {{ item.type }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
            
            <!-- <v-col>
              <v-card flat>
                <v-card-title> Данные о ребенке </v-card-title>
                <v-card-subtitle> По дате крещения </v-card-subtitle>
                <v-expansion-panels popout multiple>
                  <v-expansion-panel
                    v-for="item in filtereData"
                    :key="item.timeStamp"
                  >
                    <v-expansion-panel-header>
                      {{ item.name }} - {{ item.buptDate }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Рождение: {{ item.birthDate }} - {{ item.birthPlace }}
                      <br />
                      Крещение: {{ item.buptDate }} - {{ item.buptPlace }}
                      <br /><br />
                      <b>Родители:</b> <br />
                      {{ item.father }}<br />
                      {{ item.mother }}<br />
                      {{ item.married }}<br /><br />
                      <b>Крестные:</b> <br />
                      {{ item.bfather }}<br />
                      {{ item.bmother }}<br /><br />
                      Свидетельство: {{ item.stateDocs }}<br /><br />
                      {{ item.timeStamp }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col> -->


          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items> 


<!-- диалоги -->
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ currentItem.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- <v-card-title class="headline">
            {{currentItem.name}}
        </v-card-title> -->
        <answerDetails :person="currentItem" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dataDialog"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title
            >{{ currentData.name }} -
            {{ currentData.buptPlace }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dataDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col>
              Рождение: {{ [currentData.birthDate, "DD.MM.YYYY" ]  | moment('LL') }} -
              {{ currentData.birthPlace }}
              <br />
              Крещение: {{ [currentData.buptDate, "DD.MM.YYYY" ] | moment('LL') }} -
              {{ currentData.buptPlace }} <br /><br />
              <b>Родители:</b> <br />
              {{ currentData.father }}<br />
              {{ currentData.mother }}<br />
              {{ currentData.married }}<br /><br />
              <b>Крестные:</b> <br />
              {{ currentData.bfather }}<br />
              {{ currentData.bmother }}<br /><br />
              Свидетельство: {{ currentData.stateDocs }}<br /><br />
              {{ currentData.timeStamp }}
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dataDialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import answerDetails from "./answerDetails";
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";

const sheetUrl =
  "https://spreadsheets.google.com/feeds/cells/1RT08opfOwAJxBjvKnoI5yxRJscxuLyk5zB6CF8Eh0QM/oydcpt5/public/values?alt=json";
export default {
  name: "dashboard",
  data() {
    return {
      tab: null,
      thisWeekOnly: false,
      dialog: false,
      currentItem: {},
      dataDialog: false,
      currentData: {},
    };
  },
  computed: {
    ...mapGetters([
      "items",
      "sortedItems",
      "dataItems",
      "dataItemsShot",
      "sortedItemsShot",
      "currentAnswersItems",
      "currentDataItems",
    ]),
    filteredAnswers() {
      return !this.thisWeekOnly ? this.sortedItems : this.currentAnswersItems;
    },
    filtereData() {
      return !this.thisWeekOnly ? this.dataItems : this.currentDataItems;
    },
    filteredAnswersShot() {
      return !this.thisWeekOnly
        ? this.sortedItemsShot
        : this.currentAnswersItems;
    },
    filtereDataShot() {
      return !this.thisWeekOnly ? this.dataItemsShot : this.currentDataItems;
    },
  },
  props: {
    msg: String,
  },
  methods: {
    ...mapActions(["fetchAnswers", "fetchDataItems"]),
    showItem(item) {
      this.currentItem = item;
      this.dialog = true;
    },
    showData(data) {
      this.currentData = data;
     // console.log(this.currentData)
      this.dataDialog = true;
    },
  },
  components: {
    answerDetails,
  },
  mounted() {
    this.fetchAnswers();
    this.fetchDataItems();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
`