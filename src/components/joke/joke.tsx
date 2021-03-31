import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import { v4 as uuidV4 } from "uuid";

import moment from "moment";
import { getMilosAudio } from "../../utils";

interface TimesProps {
  id: string;
  dateTime: string;
  showed: boolean;
}

const randomMax = 50;
const date = "2021-04-01";
const defaultTimes = ["10:00", "13:00", "15:30"];

const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getDateTimesFromCache = () => {
  const joke = localStorage.getItem("joke");
  return joke && JSON.parse(joke);
};

const getDateTimes = () => {
  const times = defaultTimes;
  return times.map((time, id) => {
    const randomMinutes = randomInteger(0, randomMax);
    return {
      id,
      dateTime: moment(`${date} ${time}`)
        .add(randomMinutes, "minutes")
        .toISOString(),
      showed: false,
    };
  });
};

export const Joke = ({ src }: { src: string }) => {
  const [show, setShow] = useState(false);
  const [reloadKey, setReloadKey] = useState(uuidV4());
  const audio = useMemo(() => getMilosAudio(), []);
  const name = "joke";

  const showRicardo = useCallback((time: TimesProps) => {
    setShow(true);
    const times = getDateTimesFromCache() || [];
    const updated = times.map((o: any) => {
      if (o.id === time.id) {
        return { ...o, showed: true };
      }

      return o;
    });

    localStorage.setItem(name, JSON.stringify(updated));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setReloadKey(uuidV4());
    }, 2000);

    const times = getDateTimesFromCache() || [];
    if (times.length) {
      const activeTime = times
        .filter((o: any) => !o.showed)
        .find((o: any) => moment(o.dateTime).isSameOrBefore());

      if (activeTime) {
        showRicardo(activeTime);
      }
    }
  }, [reloadKey]);

  useEffect(() => {
    const joke = getDateTimesFromCache();

    if (!joke) {
      localStorage.setItem(name, JSON.stringify(getDateTimes()));
    }
  }, []);

  useEffect(() => {
    if (show) {
      audio.play();
    }
  }, [show]);

  const handleClick = useCallback(() => {
    setShow(false);
    audio.pause();
    audio.currentTime = 0;
  }, [audio]);

  if (!show) {
    return null;
  }

  return (
    <Tooltip color="blue" title="Расстроить Рикардо">
      <div // eslint-disable-line
        onClick={handleClick}
        style={{
          position: "absolute",
          cursor: "pointer",
          bottom: randomInteger(0, window.innerHeight - 150),
          left: randomInteger(0, window.innerWidth - 150),
        }}
      >
        <img src={src} alt="dancing-ricardo" />
      </div>
    </Tooltip>
  );
};
