import { Functions } from "../Functions";
import { VariableItem } from "../VariableItem";
import { computed } from "@preact/signals-react";

export default (f: Functions) => (
  computed(() => (
    <>
      {
        f.variables.value.map((item) => (
          <VariableItem
            key={item.id}
            {...item}
            onDelete={() => {
              const { variables } = f;
              const list = variables.peek();
              const index = list.indexOf(item);
              if (index !== -1) {
                variables.value = list.toSpliced(index, 1);
              }
            }} />
        ))
      }
    </>
  ))
);