import { TVariable } from "./Functions";
import rsp from "@vicimpa/rsp";
import s from "./VariableItem.module.sass";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

type TVariableItemProps = {
  onDelete?: () => void;
} & TVariable;

export const VariableItem = ({ name, min, max, signal: sig, default: defaultValue, onDelete }: TVariableItemProps) => {
  useSignals();

  return (
    <div className={s.item}>
      <div className={s.head}>
        <p>Name: {name}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
      {sig.value ? (
        <>
          <label>
            Value: {sig.value} <br />
            <rsp.input
              type="range"
              min={min}
              max={max}
              step="any"
              onChange={e => {
                sig.value!.value = +e.currentTarget.value;
              }}
              defaultValue={defaultValue} />
          </label>
          <button
            onClick={() => {
              sig.value = undefined;
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <label>
            Name <br />
            <rsp.input bind-value={name} />
          </label>
          <label>
            Min <br />
            <rsp.input
              type="number"
              defaultValue={min}
              onChange={(e) => min.value = +e.currentTarget.value}
            />
          </label>
          <label>
            Max <br />
            <rsp.input
              type="number"
              defaultValue={max}
              onChange={(e) => max.value = +e.currentTarget.value}
            />
          </label>
          <label>
            Default <br />
            <rsp.input
              type="number"
              defaultValue={defaultValue}
              onChange={(e) => defaultValue.value = +e.currentTarget.value}
            />
          </label>
          <button
            onClick={() => {
              sig.value = signal(defaultValue.peek() ?? 0);
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};;