import * as math from "@/library/math";

import { useSignal, useSignalEffect } from "@preact/signals-react";

import { TFunction } from "./Functions";
import rsp from "@vicimpa/rsp";
import s from "./FunctionItem.module.sass";

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
  const saved = useSignal(true);
  const cType = useSignal(type.peek());
  const cColor = useSignal(color.peek());
  const cFunc = useSignal(`return v`);
  const error = useSignal('');

  useSignalEffect(() => {
    cType.value;
    cColor.value;
    cFunc.value;
    error.value = '';

    return () => {
      saved.value = false;
    };
  });

  function save() {
    const keys = [...Object.keys(math)];
    const values = [...Object.values(math)];

    const f = new Function(
      ...keys,
      'v',
      cFunc.value
    );

    try {
      const r = f(...values, 1);
      if (typeof r !== 'number') {
        throw new Error('No return number');
      }

      func.value = f.bind(null, ...values);
      type.value = cType.value;
      color.value = cColor.value;
      saved.value = true;
    } catch (e) {
      error.value = `${e}`;
    }
  }

  return (
    <div className={s.item}>
      <div className={s.head}>
        <label>#{id}</label>
        <label>
          Type<br />
          <rsp.select bind-value={cType} onChange={console.log}>
            <option value="x">x</option>
            <option value="y">y</option>
          </rsp.select>
        </label>

        <label>
          Color <br />
          <rsp.input type="color" bind-value={cColor} />
        </label>
      </div>

      <label>
        Func <br />
        <pre>
          {`(v: number) => \{\n`}
          <rsp.textarea bind-value={cFunc} />
          {`}`}
        </pre>
      </label>
      <rsp.button disabled={saved} onClick={save}>Save</rsp.button>
      <button onClick={onDelete}>Delete</button>
      <rsp.pre data-error={error}>{error}</rsp.pre>
    </div>
  );
};