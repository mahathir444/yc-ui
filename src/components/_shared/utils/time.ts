import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
dayjs.extend(toObject);
type options = { value: string; disabled: boolean }[];
export function generateTimeOptions(config: {
  format: string;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour?: number) => number[];
  disabledSeconds?: (
    selectedHour?: number,
    selectedMinute?: number
  ) => number[];
  hideDisabledOptions?: boolean;
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
  selectedHour?: string;
  selectedMinute?: string;
}) {
  const {
    format,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    step,
    selectedHour,
    selectedMinute,
  } = config;
  const hours: options = [];
  const minutes: options = [];
  const seconds: options = [];
  const meridiems: options = [];
  const is24Hour = format.includes('H');
  const hasHours = format.includes('H') || format.includes('h');
  const hasMinutes = format.includes('m');
  const hasSeconds = format.includes('s');
  const hourFormat = is24Hour ? 'HH' : 'hh';
  const minuteFormat = format.includes('mm') ? 'mm' : 'm';
  const secondFormat = format.includes('ss') ? 'ss' : 's';

  const stepHour = step?.hour ?? 1;
  const stepMinute = step?.minute ?? 1;
  const stepSecond = step?.second ?? 1;

  if (hasHours) {
    const disabledHourSet = new Set(disabledHours?.() ?? []);
    const start = is24Hour ? 0 : 0;
    const end = is24Hour ? 24 : 12;
    // // 12小时制从12到11，
    for (let i = start; i < end; i += stepHour) {
      let t = i;
      if (!is24Hour && i === 0) {
        t = 12;
      }
      const hour = dayjs().hour(t).format(hourFormat);
      const isDisabled = disabledHourSet.has(t);
      if (!isDisabled || !hideDisabledOptions) {
        hours.push({ value: hour, disabled: isDisabled });
      }
    }
  }

  if (hasMinutes) {
    const nowHour = parseInt(selectedHour ?? '0', 10);
    const disabledMinuteSet = new Set(disabledMinutes?.(nowHour) ?? []);
    for (let i = 0; i < 60; i += stepMinute) {
      const minute = dayjs().minute(i).format(minuteFormat);
      const isDisabled = disabledMinuteSet.has(i);
      if (!isDisabled || !hideDisabledOptions) {
        minutes.push({ value: minute, disabled: isDisabled });
      }
    }
  }

  if (hasSeconds) {
    const nowHour = parseInt(selectedHour ?? '0', 10);
    const nowMinute = parseInt(selectedMinute ?? '0', 10);
    const disabledSecondSet = new Set(
      disabledSeconds?.(nowHour, nowMinute) ?? []
    );
    for (let i = 0; i < 60; i += stepSecond) {
      const second = dayjs().second(i).format(secondFormat);
      const isDisabled = disabledSecondSet.has(i);
      if (!isDisabled || !hideDisabledOptions) {
        seconds.push({ value: second, disabled: isDisabled });
      }
    }
  }

  if (!is24Hour && hasHours) {
    if (format.includes('a')) {
      meridiems.push(
        { value: 'am', disabled: false },
        { value: 'pm', disabled: false }
      );
    } else if (format.includes('A')) {
      meridiems.push(
        { value: 'AM', disabled: false },
        { value: 'PM', disabled: false }
      );
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
  const parsedTime = dayjs(timeStr, format, true);

  const is24Hour = format.includes('H');
  const hourFormat = is24Hour ? 'HH' : 'hh';
  const minuteFormat = format.includes('mm') ? 'mm' : 'm';
  const secondFormat = format.includes('ss') ? 'ss' : 's';

  const hours = parsedTime.format(hourFormat);
  const minutes = parsedTime.format(minuteFormat);
  const seconds = parsedTime.format(secondFormat);
  let meridiems;
  if (!is24Hour) {
    meridiems = format.includes('a')
      ? parsedTime.format('a')
      : parsedTime.format('A');
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
    hours?: string;
    minutes?: string;
    seconds?: string;
    meridiems?: string | undefined;
  },
  format: string
): string {
  console.log('timeObj', timeObj);
  let hour = timeObj.hours ? parseInt(timeObj.hours, 10) : undefined;
  let minute = timeObj.minutes ? parseInt(timeObj.minutes, 10) : undefined;
  let second = timeObj.seconds ? parseInt(timeObj.seconds, 10) : undefined;

  if (hour !== undefined) {
    const meridiem = timeObj.meridiems?.toUpperCase();
    if (meridiem === 'PM' && hour !== 12) {
      hour += 12;
    } else if (meridiem === 'AM' && hour === 12) {
      hour = 0;
    }
  }

  const time = dayjs()
    .hour(hour ?? 0)
    .minute(minute ?? 0)
    .second(second ?? 0);

  // 检查是否有任何字段被设置
  if (
    (hour === undefined && minute === undefined && second === undefined) ||
    !time.isValid()
  ) {
    return '';
  }

  return time.format(format);
}
