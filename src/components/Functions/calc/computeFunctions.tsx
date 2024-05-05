import { FunctionItem } from "../FunctionItem";
import { Functions } from "../Functions";
import { computed } from "@preact/signals-react";

export default (f: Functions) => (
  computed(() => (
    <>
      {
        f.functions.value.map((item) => (
          <FunctionItem
            key={item.id}
            {...item}
            onDelete={() => {
              const { functions } = f;
              const list = functions.peek();
              const index = list.indexOf(item);
              if (index !== -1) {
                functions.value = list.toSpliced(index, 1);
              }
            }} />
        ))
      }
    </>
  ))
);