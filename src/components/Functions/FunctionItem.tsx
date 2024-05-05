import * as math from "@/library/math";

import { useSignal, useSignalEffect } from "@preact/signals-react";

import { TFunction } from "./Functions";
import rsp from "@vicimpa/rsp";
import s from "./FunctionItem.module.sass";
import { useId } from "react";

export type FunctionItemProps = {
  onDelete?: () => void;
} & TFunction;


export const FunctionItem = (
  {
    id,
    color,
    func,
    type,
    onDelete
  }: FunctionItemProps
) => {
  const _id = useId();
  const cFunc = useSignal(`return v`);
  const error = useSignal('');
  const keys = [...Object.keys(math)];
  const values = [...Object.values(math)];

  useSignalEffect(() => {
    const f = new Function(
      ...keys,
      'v',
      cFunc.value
    );

    try {
      const r = f(...values, 1);

      if (typeof r !== 'number')
        throw new Error('No return number');

      func.value = f.bind(null, ...values);
      error.value = ``;
    } catch (e) {
      error.value = `${e}`;
    }
  });

  return (
    <div className={s.item}>
      <p>#{id}</p>
      <div className={s.head}>
        <label>
          Type<br />
          <rsp.select bind-value={type} onChange={console.log}>
            <option value="x">x</option>
            <option value="y">y</option>
          </rsp.select>
        </label>

        <label>
          Color <br />
          <rsp.input type="color" bind-value={color} />
        </label>
        <button onClick={onDelete}>Delete</button>
      </div>

      <label>
        Func <br />
        <pre>
          {`(v: number) => \{\n`}
          <rsp.textarea autoComplete="on" bind-value={cFunc} />
          {`}`}
        </pre>
        <datalist id={_id}>
          {keys.map((key) => <option key={key} value={key} />)}
        </datalist>
      </label>
      <rsp.p className={s.error}>{error}</rsp.p>
    </div>
  );
};