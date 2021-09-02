//const sheetUrl = "https://spreadsheets.google.com/feeds/cells/1RT08opfOwAJxBjvKnoI5yxRJscxuLyk5zB6CF8Eh0QM/oydcpt5/public/values?alt=json"
const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/1RT08opfOwAJxBjvKnoI5yxRJscxuLyk5zB6CF8Eh0QM/values/A1:N1000?key=AIzaSyCFcMfzG_Ej8_uvPQon30_f8xQMuXtLPF4"
import moment from 'moment'


export default {
    state: {
        entries: [],
        answers: [],
        sortedAnswers: {},
        dataItems: [],

        sortedAnswersShot: {},
        dataItemsShot: []
    },
    mutations: {
        updateAnswers(state, entries) {
            state.answers = parseAnswersData(entries)
            state.sortedAnswers = groupByKey(state.answers.reverse(), 'buptDate')
            state.sortedAnswersShot = groupByKey(state.answers.filter(a => moment().add(-1, 'days').isBefore(moment(a.buptDate, 'DD.MM.yyyy'))).reverse(), 'buptDate')

        },
        updateDataItems(state, entries) {
            state.dataItems = parseDataItems(entries)
            state.dataItemsShot = state.dataItems.filter(a => moment().add(-1, 'days').isBefore(moment(a.buptDate, 'DD.MM.yyyy')))
            // state.sortedAnswers = groupByKey(state.answers.reverse(), 'buptDate')
        },
        updateItems(state, entries) {
            state.entries = entries
        }
    },
    actions: {
        fetchAnswers(ctx, url = sheetUrl) {

            fetch(url)
                .then(async response => {
                    const data = await response.json();
                    //       console.log(data)
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        ctx.commit('setError', error)
                        return Promise.reject(error);
                    }

                    ctx.commit('updateAnswers', data.values)
                })
                .catch(error => {
                    ctx.commit('setError', error)
                });
        },
        fetchDataItems(ctx, url = dataUrl) {

            fetch(url)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        ctx.commit('setError', error)
                        return Promise.reject(error);
                    }

                    ctx.commit('updateDataItems', data.values)
                })
                .catch(error => {
                    ctx.commit('setError', error)

                });
        }
    },
    getters: {
        dataItemsShot: s => s.dataItemsShot,
        sortedItemsShot: s => s.sortedAnswersShot,
        items(state, getters) {
            return state.answers;
        },
        sortedItems(state, getters) {
            return state.sortedAnswers;
        },
        dataItems(state, getters) {
            return state.dataItems;
        },
        currentAnswersItems(state) {
            let [start, end] = getWeekDates();
            let filtered = state.answers.filter(x => {
                let d = parseDate(x.buptDate)
                let res = d > start && d <= end

                return res;
            });
            return groupByKey(filtered, 'buptDate')
        },
        currentDataItems(state) {
            let [start, end] = getWeekDates();
            return state.dataItems.filter(x => {
                let d = parseDate(x.buptDate)
                return d > start && d <= end;
            });
        }
    }
}




function parseAnswersData(entries) {

    var data = [];
    entries.shift()
    //console.log(entries)
    entries.forEach(function (arr) {
        if (arr.length !== 10)
            return;

        var obj = {};
        obj = {
            "timeStamp": arr[0],
            "name": arr[1],
            "type": arr[2],
            "contact": arr[3],
            "q1": arr[4],
            "q2": arr[5],
            "q3": arr[6],
            "q4": arr[7],
            "q5": arr[8],
            "buptDate": arr[9]
        }

        data.push(obj)
    });

    //  console.log(data)
    return data.sort((a, b) => parseDate(a.buptDate) - parseDate(b.buptDate));
}
//1aWikUkhi-8Bji6mn9I4cK_OwHL63wwS5lRy-XVwgul4
//https://sheets.googleapis.com/v4/spreadsheets/1aWikUkhi-8Bji6mn9I4cK_OwHL63wwS5lRy-XVwgul4/values/Sheet1!A1:N1000
//const dataUrl = "https://spreadsheets.google.com/feeds/cells/1aWikUkhi-8Bji6mn9I4cK_OwHL63wwS5lRy-XVwgul4/1/public/values?alt=json"
const dataUrl = "https://sheets.googleapis.com/v4/spreadsheets/1aWikUkhi-8Bji6mn9I4cK_OwHL63wwS5lRy-XVwgul4/values/A1:N1000?key=AIzaSyCFcMfzG_Ej8_uvPQon30_f8xQMuXtLPF4"

function parseDataItems(entries) {
    var data = [];
    entries.shift()

    entries.forEach(function (arr) {
        if (arr.length !== 12)
            return;

        var obj = {};
        obj = {
            "timeStamp": arr[0],
            "name": arr[1],
            "birthDate": arr[2],
            "birthPlace": arr[3],
            "buptDate": arr[4],
            "buptPlace": arr[5],
            "father": arr[6],
            "mother": arr[7],
            "married": arr[8],
            "bfather": arr[9],
            "bmother": arr[10],
            "stateDocs": arr[11]
        }

        data.push(obj)
    });

    return data.sort((a, b) => parseDate(a.buptDate) - parseDate(b.buptDate)).reverse()
}

function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
}

function parseDate(str) {
    var dateParts = str.split(".");
    if (dateParts.length != 3)
        return null;
    var year = dateParts[2];
    var month = dateParts[1];
    var day = dateParts[0];

    if (isNaN(day) || isNaN(month) || isNaN(year))
        return null;

    var result = new Date(year, (month - 1), day);
    if (result == null)
        return null;
    if (result.getDate() != day)
        return null;
    if (result.getMonth() != (month - 1))
        return null;
    if (result.getFullYear() != year)
        return null;

    return result;
}


function getWeekDates() {

    let now = new Date();
    let dayOfWeek = now.getDay(); //0-6
    let numDay = now.getDate();

    let start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);


    let end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);

    return [start, end];
}
