function handleTickInit(tick) {
  // set language
  var locale = {
    YEAR_PLURAL: "Años",
    YEAR_SINGULAR: "Año",
    MONTH_PLURAL: "Meses",
    MONTH_SINGULAR: "Mes",
    WEEK_PLURAL: "Semanas",
    WEEK_SINGULAR: "Semana",
    DAY_PLURAL: "Días",
    DAY_SINGULAR: "Día",
    HOUR_PLURAL: "Horas",
    HOUR_SINGULAR: "Hora",
    MINUTE_PLURAL: "Minutos",
    MINUTE_SINGULAR: "Minuto",
    SECOND_PLURAL: "Segundos",
    SECOND_SINGULAR: "Segundo",
    MILLISECOND_PLURAL: "Milisegundos",
    MILLISECOND_SINGULAR: "Milisegundo",
  };

  for (var key in locale) {
    if (!locale.hasOwnProperty(key)) {
      continue;
    }
    tick.setConstant(key, locale[key]);
  }

  tick.value = [0, 0, 0, 0, 0, 0];

  let timerId = setInterval(() => {
    let d = randomDate(new Date(2017), new Date());
    tick.value = Tick.helper.duration(d, new Date(), [
      "y",
      "M",
      "d",
      "h",
      "m",
      "s",
    ]);
  }, 125);

  // let's show the final value
  setTimeout(function () {
    clearInterval(timerId);
    // create counter
    Tick.count.up("2017-03-21T00:00:00", {
      format: ["y", "M", "d", "h", "m", "s"],
    }).onupdate = function (value) {
      tick.value = value;
    };
  }, 1500);
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
