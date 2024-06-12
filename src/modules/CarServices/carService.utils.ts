import { TSlotAppointment } from '../Slots/slots.interface';
import { ICarService } from './carService.interface';

export const createIntervalsArray = (
  payload: TSlotAppointment,
  serviceData: ICarService,
): TSlotAppointment[] => {
  const intervals: TSlotAppointment[] = [];

  const { startTime, endTime, date, service } = payload;

  let start = new Date(`${date}T${startTime}:00`);
  const end = new Date(`${date}T${endTime}:00`);

  while (start < end) {
    const intervalStartTime = start.toTimeString().substring(0, 5);
    const nextEnd = new Date(start);
    nextEnd.setMinutes(start.getMinutes() + serviceData?.duration);

    const intervalEndTime =
      nextEnd < end ? nextEnd.toTimeString().substring(0, 5) : endTime;

    intervals.push({
      service,
      date,
      startTime: intervalStartTime,
      endTime: intervalEndTime,
      isBooked: 'available',
    });

    start = nextEnd;
  }

  return intervals;
};
