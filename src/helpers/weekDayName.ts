export const persianWeekDays = [
  { idx: 0, name: "Saturday", persianName: "شنبه", abbre: "ش", holiday: false },
  { idx: 1, name: "Sunday", persianName: "یکشنبه", abbre: "ی", holiday: false },
  { idx: 2, name: "Monday", persianName: "دوشنبه", abbre: "د", holiday: false },
  { idx: 3, name: "Tuesday", persianName: "سه شنبه", abbre: "س", holiday: false },
  { idx: 4, name: "Wednesday", persianName: "چهارشنبه", abbre: "چ", holiday: false },
  { idx: 5, name: "Thursday", persianName: "پنج شنبه", abbre: "پ", holiday: false },
  { idx: 6, name: "Friday", persianName: "جمعه", abbre: "ج", holiday: true },
]

export const getWeekDayName = (day: string) => {
  return persianWeekDays.sort((x) => x.idx).find((x) => x.name == day)
}
