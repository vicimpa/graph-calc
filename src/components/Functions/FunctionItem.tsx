import * as math from "@/library/math";

import { Functions, TFunction } from "./Functions";
import { useSignal, useSignalEffect } from "@preact/signals-react";

import rsp from "@vicimpa/rsp";
import s from "./FunctionItem.module.sass";
import { useId } from "react";
import { useProvide } from "@/library/provide";

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
  const { params } = useProvide(Functions);
  const _id = useId();
  const cFunc = useSignal('return v');
  const error = useSignal('');
  const keys = [...Object.keys(math)];
  const values = [...Object.values(math)];

  useSignalEffect(() => {
    try {
      const f = new Function(
        ...keys,
        'v',
        'p',
        't',
        cFunc.value
      );

      const r = f(...values, 1, params, performance.now());

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
      <div className={s.head}>
        <p>#{id}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
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

      <label>
        Func <br />
        <pre>
          {`(v: number, p: Params, t: number) => \{\n`}
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