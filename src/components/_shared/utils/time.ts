import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
dayjs.extend(toObject);
export function generateTimeOptions(format: string): {
  hours: string[];
  minutes: string[];
  seconds: string[];
  meridiems: string[];
} {
  const hours: string[] = [];
  const minutes: string[] = [];
  const seconds: string[] = [];
  const meridiems: string[] = [];
  const is24Hour = format.includes('H');
  const hourFormat = is24Hour ? 'HH' : 'hh';
  const minuteFormat = format.includes('mm') ? 'mm' : 'm';
  const secondFormat = format.includes('ss') ? 'ss' : 's';

  for (let i = 0; i < 24; i++) {
    const hour = dayjs().hour(i).format(hourFormat);
    if (is24Hour || (i !== 0 && i !== 12)) {
      hours.push(hour);
    }
  }
  //12小时制从12开始
  if (!is24Hour) {
    hours.push('12'); // Add 12 AM/PM manually
  }

  for (let i = 0; i < 60; i++) {
    minutes.push(dayjs().minute(i).format(minuteFormat));
    seconds.push(dayjs().second(i).format(secondFormat));
  }
  if (!is24Hour) {
    if (format.includes('a')) {
      meridiems.push('am', 'pm');
    } else if (format.includes('A')) {
      meridiems.push('AM', 'PM');
    }
  }

  return {
    hours,
    minutes,
    seconds,
    meridiems,
  };
}
export function parseTimeStrByFormat(
  timeStr: string,
  format: string
): {
  hours: string;
  minutes: string;
  seconds: string;
  meridiems: string | undefined;
} {
  const parsedTime = dayjs(timeStr, format);

  const is24Hour = format.includes('H');
  const hourFormat = is24Hour ? 'HH' : 'hh';
  const minuteFormat = format.includes('mm') ? 'mm' : 'm';
  const secondFormat = format.includes('ss') ? 'ss' : 's';

  const hours = parsedTime.format(hourFormat);
  const minutes = parsedTime.format(minuteFormat);
  const seconds = parsedTime.format(secondFormat);
  let meridiems;
  if(!is24Hour){
    meridiems = format.includes('a') ? parsedTime.format('a') : parsedTime.format('A');
  }
  return {
    hours,
    minutes,
    seconds,
    meridiems,
  };
}

export function timeObjToStr(
  timeObj: {
    hours: string;
    minutes: string;
    seconds: string;
    meridiems?: string | undefined;
  },
  format: string
): string {
  let hour = +timeObj.hours;
  const meridiem = timeObj.meridiems?.toUpperCase();
  if (meridiem === 'PM' && hour !== 12) {
    hour += 12;
  } else if (meridiem === 'AM' && hour === 12) {
    hour = 0;
  }
  console.log(meridiem,timeObj)
  const time = dayjs()
    .hour(hour)
    .minute(+timeObj.minutes)
    .second(+timeObj.seconds);

  if (!time.isValid())return '';
  return time.format(format);
}
