export function adjustTimeZone(_date: Date) {
    if (_date)
      _date.setHours(_date.getHours() - _date.getTimezoneOffset() / 60);
    return _date;
  }