const sheetUrl = "https://spreadsheets.google.com/feeds/cells/1RT08opfOwAJxBjvKnoI5yxRJscxuLyk5zB6CF8Eh0QM/oydcpt5/public/values?alt=json"

export default {
    state: {
        entries: [],
        answers: [],
        sortedAnswers: {},
        dataItems: []
    },
    mutations: {
        updateAnswers(state, entries){
            state.answers = parseAnswersData(entries)
            state.sortedAnswers = groupByKey(state.answers.reverse(), 'buptDate')
        },
        updateDataItems(state, entries){
            state.dataItems = parseDataItems(entries)
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

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        ctx.commit('setError', error)
                        return Promise.reject(error);
                    }

                    ctx.commit('updateAnswers', data.feed.entry)
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

                    ctx.commit('updateDataItems', data.feed.entry)
                })
                .catch(error => {
                    ctx.commit('setError', error)

                });
        }
    },
    getters: {
        items(state, getters) {
            return state.answers;
        },
        sortedItems(state, getters) {
            return state.sortedAnswers;
        },
        dataItems(state, getters) {
            return state.dataItems;
        },
        currentAnswersItems(state){
            let [start, end] = getWeekDates();
            let filtered = state.answers.filter(x => {
                let d = parseDate(x.buptDate)
                let res = d > start && d <= end
                
                return res;
            });
            return groupByKey(filtered, 'buptDate')
        },
        currentDataItems(state){
            let [start, end] = getWeekDates();
            return state.dataItems.filter(x => {
                let d = parseDate(x.buptDate)
                return d > start && d <= end;
            });
        }
    }
}




function parseAnswersData(entries) {
    var data = new Map();

    entries.forEach(function (value) {
        var subval = value.gs$cell;

        if (subval.row == 1)
            return;

        var obj = {};
        if (data.has(subval.row)) {
            obj = data.get(subval.row);
        } else {
            obj = {
                "timeStamp": "",
                "name": "",
                "type": "",
                "contact": "",
                "q1": "",
                "q2": "",
                "q3": "",
                "q4": "",
                "q5": "",
                "buptDate": ""
            }
        }

        switch (Number.parseInt(subval.col)) {
            case 1:
                obj.timeStamp = subval.$t;
                break;
            case 2:
                obj.name = subval.$t;
                break;
            case 3:
                obj.type = subval.$t;
                break;
            case 4:
                obj.contact = subval.$t;
                break;
            case 5:
                obj.q1 = subval.$t;
                break;
            case 6:
                obj.q2 = subval.$t;
                break;
            case 7:
                obj.q3 = subval.$t;
                break;
            case 8:
                obj.q4 = subval.$t;
                break;
            case 9:
                obj.q5 = subval.$t;
                break;
            case 10:
                obj.buptDate = subval.$t;
                break;
        }

        data.set(subval.row, obj);
    });

    return Array.from(data.values())
}
//1aWikUkhi-8Bji6mn9I4cK_OwHL63wwS5lRy-XVwgul4
const dataUrl = "https://spreadsheets.google.com/feeds/cells/1aWikUkhi-8Bji6mn9I4cK_OwHL63wwS5lRy-XVwgul4/1/public/values?alt=json"
function parseDataItems(entries) {
    var data = new Map();

    entries.forEach(function (value) {
        var subval = value.gs$cell;

        if (subval.row == 1)
            return;

        var obj = {};
        if (data.has(subval.row)) {
            obj = data.get(subval.row);
        } else {
            obj = {
                "timeStamp": "",
                "name": "",
                "birthDate": "",
                "birthPlace": "",
                "buptDate": "",
                "buptPlace": "",
                "father": "",
                "mother": "",
                "married": "",
                "bfather": "",
                "bmother": "",
                "stateDocs": ""  
            }
        }

        switch (Number.parseInt(subval.col)) {
            case 1:
                obj.timeStamp = subval.$t;
                break;
            case 2:
                obj.name = subval.$t;
                break;
            case 3:
                obj.birthDate = subval.$t;
                break;
            case 4:
                obj.birthPlace = subval.$t;
                break;
            case 5:
                obj.buptDate = subval.$t;
                break;
            case 6:
                obj.buptPlace = subval.$t;
                break;
            case 7:
                obj.father = subval.$t;
                break;
            case 8:
                obj.mother = subval.$t;
                break;
            case 9:
                obj.married = subval.$t;
                break;
            case 10:
                obj.bfather = subval.$t;
                break;
            case 11:
                obj.bmother = subval.$t;
                break;
            case 12:
                obj.stateDocs = subval.$t;
                break;
        }

        data.set(subval.row, obj);
    });

    return Array.from(data.values()).sort((a,b) => parseDate(a.buptDate) - parseDate(b.buptDate)).reverse()
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
  