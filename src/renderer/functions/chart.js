import cheerio from 'cheerio'
import axios from 'axios'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

export async function getRealtimeChart() {
  const $ = cheerio.load(
    (await axios.get('https://www.melon.com/chart/index.htm')).data
  )
  const musics = []
  ;[50, 100].forEach(n => {
    $(`.lst${n}`).each((_, e) => {
      const li = $(e)
      const musicUid = Number($(e).attr('data-song-no'))
      const title = li.find('.ellipsis.rank01 span a').text()
      const artist = li.find('.ellipsis.rank02 > a').text()
      const music = {
        musicUid,
        title,
        artist,
        rank: _ + n - 49
      }

      musics.push(music)
    })
  })
  return musics
}

export const pad = (n, width) => {
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
}

export async function upload(collection) {
  const date = new Date()
  const now = `${pad(date.getFullYear(), 4)}${pad(date.getMonth() + 1, 2)}${pad(
    date.getDate(),
    2
  )}${pad(date.getHours(), 2)}`
  const chart = await getRealtimeChart()
  collection.doc(now).set({
    date: Number(now)
  })
  chart.forEach(music =>
    collection
      .doc(now)
      .collection('realtime')
      .doc(
        `${pad(String(music.rank), 3)}#${String(music.musicUid)}#${music.title}`
      )
      .set(music)
  )
}

export async function getRealtimeChartFromDB(store) {
  return new Promise((resolve, reject) => {
    const wholeRanks = {}
    store
      .collection('chart')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          wholeRanks[doc.id] = []
          store
            .collection(`chart/${doc.id}/realtime`)
            .get()
            .then(chartSnapshot => {
              chartSnapshot.forEach(
                ranks =>
                  (wholeRanks[doc.id][ranks.data().rank - 1] = ranks.data())
              )
              resolve(wholeRanks)
            })
        })
      })
  })
}

export async function dumpDB(dir, store) {
  const chartData = await getRealtimeChartFromDB(store)

  for (const day in chartData) {
    if (!existsSync(`./data/${day.slice(0, -2)}/`)) {
      mkdirSync(`./data/${day.slice(0, -2)}/`)
    }
    writeFileSync(
      `./data/${day.slice(0, -2)}/${day.slice(-2)}.json`,
      JSON.stringify(chartData[day])
    )
  }
}

export async function getRanksWithMusicUid(musicUid, store) {
  return new Promise(async resolve => {
    const chartCollection = await store.collection('chart').get()
    const wholeFilteredRanks = []
    chartCollection.docs.forEach(async (dailyDoc, ...args) => {
      const hourlyChart = dailyDoc.id
      const hourlyChartCollection = await store
        .collection(`chart/${hourlyChart}/realtime`)
        .where('musicUid', '==', Number(musicUid))
        .get()
      if (!hourlyChartCollection.docs[0]) {
        wholeFilteredRanks.push({
          rank: NaN,
          time: hourlyChart
        })
      } else {
        wholeFilteredRanks.push({
          ...hourlyChartCollection.docs[0].data(),
          time: hourlyChart
        })
      }

      if (args[0] === chartCollection.docs.length - 1) {
        console.log(wholeFilteredRanks)
        resolve([
          wholeFilteredRanks.map(k => k.time),
          wholeFilteredRanks.map(k => k.rank),
          wholeFilteredRanks
        ])
      }
    })
  })
}
