import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const consumedCalories = useMemo(
    () =>
      activities.reduce((total, activity) => {
        return activity.category === 1 ? total + activity.calories : total;
      }, 0),
    [activities]
  );

  const burnedCalories = useMemo(
    () =>
      activities.reduce((total, activity) => {
        return activity.category === 2 ? total + activity.calories : total;
      }, 0),
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Summary of calories
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={consumedCalories} text="Consumed" />
        <CalorieDisplay calories={burnedCalories} text="Burned" />
        <CalorieDisplay
          calories={consumedCalories - burnedCalories}
          text="Difference"
        />
      </div>
    </>
  );
};

export default CalorieTracker;
