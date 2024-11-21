import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { categories } from "../data/data";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidV4 } from "uuid";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState = {
  id: uuidV4(),
  category: 1,
  activity: "",
  calories: 0,
};

const Form = ({ dispatch, state }: FormProps) => {
  const [formState, setFormState] = useState<Activity>(initialState);

  function handleChangeInputs(
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setFormState({
      ...formState,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value, // el "+" implicitamente lo transforma a number
    });
  }

  function isValidActivity() {
    const { activity, calories } = formState;
    return activity.trim() !== "" && calories > 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: formState } });
    setFormState({ ...initialState, id: uuidV4() });
  }

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.find(
        (stateActivity) => state.activeId === stateActivity.id
      );

      if (selectedActivity) {
        setFormState(selectedActivity);
      }
    }
  }, [state.activeId, state.activities]);

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3 ">
        <label htmlFor="category" className="font-bold">
          Category:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white "
          value={formState.category}
          onChange={handleChangeInputs}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 ">
        <label htmlFor="activity" className="font-bold">
          Activity:
        </label>
        <input
          id="activity"
          type="text"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Ej. food, orange juice, salad, exercise, wights, bike"
          value={formState.activity}
          onChange={handleChangeInputs}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 ">
        <label htmlFor="calories" className="font-bold">
          Calories:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Amount of calories in kcal"
          value={formState.calories}
          onChange={handleChangeInputs}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        value={formState.category === 1 ? "Save food" : "Save exercise"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;
