import { ref } from "vue";

export const useOption: () => {
  option: any;
  updateOption: (option: any) => void;
} = () => {
  const option = ref({
    series: [
      {
        type: "map",
        map: "customMap",
      },
    ],
  });

  const updateOption = (option_: any) => {
    option.value = option_
  };

  return {
    option,
    updateOption,
  };
};
